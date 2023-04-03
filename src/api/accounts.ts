import api from "../services/api";
import Rate from "../interfaces/Rate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "../hooks/common";
import { Account } from "../types/Models";
import moment, { DurationInputArg2 } from "moment";
import { AccountRaw, PaymentRaw } from "../types/ModelsRaw";
import { Currency, RepeatUnit } from "../types/Enums";
import { useCurrencyConverter } from "../hooks/currencyConverter";
import { CreateAccountData, UpdateAccountData } from "../types/AccountData";

export const ACCOUNTS_QUERY = "ACCOUNTS_QUERY";

export function useAccountsQuery() {
  const { convert, isLoading } = useCurrencyConverter();

  return useQuery<Account[], AxiosError<BackendErrorResponse>>(
    ACCOUNTS_QUERY,
    async () => {
      const res = await api.get("accounts");

      const groupsEnds: {
        [key: string]: string | null;
      } = {};

      res.data
        .flatMap((a: AccountRaw) => {
          return [...(a.payments_to || []), ...(a.payments_from || [])];
        })
        .forEach((p: PaymentRaw) => {
          const repeatEndsOn = p.repeat_ends_on
            ? moment(p.repeat_ends_on)
            : null;

          // If repeatEndsOn is null, it means group doesn't have end date
          if (repeatEndsOn === null) {
            groupsEnds[p.group] = null;
          } else {
            // If not defined yet
            if (groupsEnds[p.group] === undefined) {
              groupsEnds[p.group] = repeatEndsOn.format("YYYY-MM-DD");
            }

            // If not null, otherwise it means payment doesn't have end date
            if (groupsEnds[p.group] !== null) {
              groupsEnds[p.group] = moment(groupsEnds[p.group]).isBefore(
                repeatEndsOn
              )
                ? repeatEndsOn.format("YYYY-MM-DD")
                : groupsEnds[p.group];
            }
          }
        });

      return res.data.map((account: AccountRaw) => {
        return {
          ...account,
          balance_converted: convert(
            account.balance,
            account.currency,
            Currency.UAH
          ),
          balance_savings: account.jars?.reduce(
            (acc, jar) => acc + jar.balance,
            0
          ),
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
              amount:
                payment.account_from_id === account.id
                  ? -(payment.amount || 0)
                  : payment.amount || 0,
            }))
            .map((payment) => ({
              ...payment,
              amount_original: payment.amount,
            }))
            .map((payment) => ({
              ...payment,
              amount_converted: convert(
                payment.amount,
                payment.currency,
                account.currency
              ),
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
            }))
            .map((payment) => ({
              ...payment,
              group_repeat_ends_on: groupsEnds[payment.group]
                ? moment(groupsEnds[payment.group])
                : null,
            })),
        };
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !isLoading,
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

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<
    AccountRaw,
    AxiosError<BackendErrorResponse>,
    CreateAccountData
  >(async (data: CreateAccountData) => await api.post("accounts", data), {
    onSuccess: () => {
      queryClient.invalidateQueries(ACCOUNTS_QUERY);
    },
  });
}

export function useDeleteAccount(accountId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<BackendErrorResponse>, null>(
    async () => await api.delete(`accounts/${accountId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(ACCOUNTS_QUERY);
      },
    }
  );
}
