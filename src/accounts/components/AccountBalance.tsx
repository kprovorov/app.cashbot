import React, {
  FormEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useUpdateAccount } from "../../api/accounts";
import Input from "../../common/components/ui/forms/Input";
import { currencyFormat } from "../../services/formatters";
import { Account } from "../../types/Models";

export default function AccountBalance({
  account,
}: PropsWithChildren<{
  account: Account;
}>) {
  const [balance, setBalance] = useState<number>(account.balance);

  const { mutate } = useUpdateAccount(account.id);

  const update = async () => {
    if (balance !== account.balance) {
      mutate({ ...account, balance });
    }
  };

  useEffect(() => {
    setBalance(account.balance);
  }, [account.balance]);

  const reset = () => {
    setBalance(account.balance);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await update();
  };

  return (
    <form onSubmit={submit}>
      <Input
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key === "Escape") {
            reset();
          }
        }}
        className="border-transparent bg-transparent w-24 text-right"
        type="text"
        placeholder="Balance"
        value={currencyFormat(balance, account.currency)}
        onChange={(e): void => {
          setBalance(Number(e.target.value.replace(/\D/g, "")) * 100);
        }}
        onBlur={update}
      />
    </form>
  );
}
