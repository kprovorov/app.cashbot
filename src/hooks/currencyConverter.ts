import { useRates } from "../api/rates";
import { Currency } from "../types/Enums";

export function useCurrencyConverter() {
  const { data: rates, isLoading } = useRates();

  return {
    rates,
    isLoading,
    convert: (amount: number, from: Currency, to: Currency) => {
      if (rates) {
        const rate = (amount > 0 ? rates[from][to] : rates[to][from]) || 1;

        return (
          Math.round((amount > 0 ? amount / rate : amount * rate) * 1000000) /
          1000000
        );
      }

      return 1;
    },
  };
}
