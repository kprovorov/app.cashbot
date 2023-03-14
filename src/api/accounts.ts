import api from "../services/api";
import Rate from "../interfaces/Rate";
import UpdatePaymentData from "../interfaces/UpdatePaymentData";
import UpdateAccountData from "../interfaces/UpdateAccountData";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import { Account } from "../types/Models";
import moment from "moment";
import { AccountRaw } from "../types/ModelsRaw";

export const ACCOUNTS_QUERY = "ACCOUNTS_QUERY";

export function useAccounts() {
  return useQuery<Account[], AxiosError<BackendErrorResponse>>(
    ACCOUNTS_QUERY,
    async () => {
      const res = await api.get("api/accounts");

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
            .map((payment) => {
              if (payment.repeat_unit === "none") {
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

                date.add(payment.repeat_interval, payment.repeat_unit);
              }

              return res;
            })
            .flat()
            .sort((a, b) => a.date.unix() - b.date.unix())
            .map((payment) => ({
              ...payment,
              amount_converted:
                payment.account_from_id === account.id
                  ? -(payment.amount_from_converted || 0)
                  : payment.amount_to_converted || 0,
            }))
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
      await api.put(`api/accounts/${accountId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}

export async function getRate(from: string, to: string): Promise<Rate> {
  const { data } = await api.get("api/rates", {
    params: {
      from,
      to,
    },
  });

  return data;
}
