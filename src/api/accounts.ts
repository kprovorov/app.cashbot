import api from "../services/api";
import Rate from "../interfaces/Rate";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";
import UpdateAccountData from "../interfaces/UpdateAccountData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import { Account } from "../types/Models";
import moment, { DurationInputArg2 } from "moment";
import { AccountRaw } from "../types/ModelsRaw";
import { RepeatUnit } from "../types/Enums";

export const ACCOUNTS_QUERY = "ACCOUNTS_QUERY";

export function useAccounts() {
  return useQuery<Account[], AxiosError<BackendErrorResponse>>(
    ACCOUNTS_QUERY,
    async () => {
      const res = await api.get("accounts");

      return res.data.map((account: AccountRaw) => {
        return {
          ...account,
          payments: [
            ...(account.payments_to || []),
            ...(account.payments_from || []),
          ]
            .map((payment) => ({
              ...payment,
              date: moment(payment.date),
            }))
            .flatMap((payment) => {
              if (payment.repeat_unit === RepeatUnit.NONE) {
                return [payment];
              }

              const res = [];

              let date = payment.date;

              const dateTill = payment.repeat_ends_on
                ? moment(payment.repeat_ends_on)
                : moment().add(1, "year");

              while (date.isSameOrBefore(dateTill)) {
                res.push({
                  ...payment,
                  date: date.clone(),
                });

                date.add(
                  payment.repeat_interval,
                  payment.repeat_unit.toLowerCase() as DurationInputArg2
                );
              }

              return res;
            })
            .sort((a, b) => a.date.unix() - b.date.unix())
            .map((payment) => ({
              ...payment,
              amount_converted:
                payment.account_from_id === account.id
                  ? -(payment.amount_from_converted || 0)
                  : payment.amount_to_converted || 0,
            }))
            .map((payment) => {
              let amount = payment.amount;
              let amount_converted = payment.amount_converted;
              const today = moment().startOf("day");

              if (payment.budget && payment.date.isBefore(today)) {
                const paymentEndsOn = moment(payment.date).add(
                  payment.repeat_interval,
                  payment.repeat_unit.toLowerCase() as DurationInputArg2
                );
                const totalDays = payment.date.diff(paymentEndsOn, "days");
                const daysLeft = today.diff(paymentEndsOn, "days");

                console.log({
                  today,
                  paymentEndsOn,
                  totalDays,
                  daysLeft,
                });

                amount = paymentEndsOn.isBefore(today)
                  ? 0
                  : (payment.amount / totalDays) * daysLeft;
                amount_converted = paymentEndsOn.isBefore(today)
                  ? 0
                  : (payment.amount_converted / totalDays) * daysLeft;
              }

              return {
                ...payment,
                amount,
                amount_converted,
              };
            })
            .map((payment, index, array) => ({
              ...payment,
              balance: array
                .slice(0, index + 1)
                .reduce(
                  (acc, payment) => acc + payment.amount_converted,
                  account.balance
                ),
            })),
        };
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
}

export function useUpdateAccount(accountId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, UpdateAccountData>(
    async (data: UpdateAccountData) =>
      await api.put(`accounts/${accountId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export async function getRate(from: string, to: string): Promise<Rate> {
  const { data } = await api.get("rates", {
    params: {
      from,
      to,
    },
  });

  return data;
}
