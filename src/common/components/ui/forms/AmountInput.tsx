import { currencyFormat } from "../../../../services/formatters";
import { Currency } from "../../../../types/Enums";
import Input from "./Input";

export default function AmountInput({
  value,
  currency,
  onChange,
  $invalid = false,
}: {
  value: number;
  currency: Currency;
  onChange: (value: number) => void;
  $invalid?: boolean;
}) {
  return (
    <Input
      type="text"
      className="text-center text-5xl border-none font-semibold focus:outline-none focus:ring-0 bg-transparent"
      value={currencyFormat(value, currency)}
      onChange={(e) => {
        onChange(Number(e.target.value.replace(/\D/g, "")) * 100);
      }}
      $invalid={$invalid}
      autoComplete="off"
    />
  );
}
