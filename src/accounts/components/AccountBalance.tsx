import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import { updateAccount } from "../../api/accounts";
import Input from "../../common/components/ui/forms/Input";
import Account from "../../interfaces/Account";
import { currencyFormat } from "../../services/formatters";

export default function AccountBalance({
  account,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  onUpdated: () => void;
}>) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [balance, setBalance] = useState<number>(account.balance);

  const update = async () => {
    if (balance !== account.balance) {
      await updateAccount(account.id, { ...account, balance });
      onUpdated();
    }
  };

  const reset = () => {
    setBalance(account.balance);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await update();
  };

  return (
    <form onSubmit={submit} ref={formRef}>
      <Input
        ref={inputRef}
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
          setBalance(Number(e.target.value.replace(/\D/g, "")) * 10000);
        }}
        onBlur={update}
      />
    </form>
  );
}
