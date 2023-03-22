import { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { BackendErrorResponse } from "../hooks/common";
import monobank from "../services/monobank";
import { Currency } from "../types/Enums";

export const RATES_QUERY = "RATES_QUERY";

export type MonobankRate = {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
};

const supportedCurrencies = [840, 978, 980];

type RatesDictionary = {
  [key in Currency]: {
    [key in Currency]?: number;
  };
};

function getRateIsoCodeFromNumeric(currencyCode: number): Currency | null {
  switch (currencyCode) {
    case 840:
      return Currency.USD;
    case 978:
      return Currency.EUR;
    case 980:
      return Currency.UAH;
    default:
      return null;
  }
}

export function useRates() {
  return useQuery<RatesDictionary, AxiosError<BackendErrorResponse>>(
    RATES_QUERY,
    async (): Promise<RatesDictionary> => {
      const res = await monobank.get<MonobankRate[]>("bank/currency");

      const rates: RatesDictionary = {
        [Currency.UAH]: {
          [Currency.USD]: 0,
          [Currency.EUR]: 0,
        },
        [Currency.USD]: {
          [Currency.UAH]: 0,
          [Currency.EUR]: 0,
        },
        [Currency.EUR]: {
          [Currency.UAH]: 0,
          [Currency.USD]: 0,
        },
      };

      res.data
        .filter(
          (rate) =>
            supportedCurrencies.includes(rate.currencyCodeA) &&
            supportedCurrencies.includes(rate.currencyCodeB)
        )
        .forEach((rate) => {
          const currencyIsoCodeA = getRateIsoCodeFromNumeric(
            rate.currencyCodeA
          );

          const currencyIsoCodeB = getRateIsoCodeFromNumeric(
            rate.currencyCodeB
          );

          if (currencyIsoCodeA && currencyIsoCodeB) {
            rates[currencyIsoCodeA][currencyIsoCodeB] =
              Math.round((1 / rate.rateBuy) * 1000000) / 1000000;
            rates[currencyIsoCodeB][currencyIsoCodeA] =
              Math.round(rate.rateSell * 1000000) / 1000000;
          }
        });

      return rates;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
}
