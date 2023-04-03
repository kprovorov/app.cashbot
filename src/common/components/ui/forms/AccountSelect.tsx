import { useAccountsQuery } from "../../../../api/accounts";
import Input from "./Input";

export default function AccountSelect({
  value,
  onChange,
  $invalid = false,
}: {
  value: number;
  onChange: (value: number) => void;
  $invalid?: boolean;
}) {
  const { data: accounts } = useAccountsQuery();

  return (
    <Input
      $as="select"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      $invalid={$invalid}
    >
      <option value={0}>Please select...</option>
      {accounts?.map((account) => (
        <option key={account.id} value={account.id}>
          {account.name} ({account.currency})
        </option>
      ))}
    </Input>
  );
}
