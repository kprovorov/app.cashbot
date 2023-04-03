import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import { Currency } from "../../../../types/Enums";
import Button from "../buttons/Button";

export default function CurrencySwitch({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (value: Currency) => void;
}) {
  return (
    <Button
      $size="sm"
      type="button"
      className="hover:bg-gray-lightest"
      onClick={() => {
        const currencies = Object.values(Currency);

        const index = currencies.indexOf(value);

        onChange(currencies[index + 1 >= currencies.length ? 0 : index + 1]);
      }}
    >
      {value}
      <ArrowsRightLeftIcon className="w-5 h-5" />
    </Button>
  );
}
