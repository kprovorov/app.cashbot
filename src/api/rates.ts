import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { BackendErrorResponse } from "../hooks/common";
import api from "../services/api";
import { Currency } from "../types/Enums";

export const RATES_QUERY = "RATES_QUERY";

type Rates = {
  [key in Currency]: {
    [key in Currency]?: number;
  };
};

export function useRates() {
  return useQuery<Rates, AxiosError<BackendErrorResponse>>(
    RATES_QUERY,
    async (): Promise<Rates> => {
      const res = await api.get<Rates>("rates");

      return res.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
}
