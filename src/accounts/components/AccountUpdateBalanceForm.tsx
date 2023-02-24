import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { updateAccount } from "../../api/accounts";
import Button from "../../common/components/ui/buttons/Button";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import Account from "../../interfaces/Account";

export default function AccountUpdateBalanceForm({
  account,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  onUpdated: () => void;
}>) {
  const [balance, setBalance] = useState<number>(account.balance);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAccount(account.id, { ...account, balance });
    onUpdated();
  };

  return (
    <form onSubmit={submit}>
      <div className="tw-flex">
        <input
          className="tw-border tw-rounded tw-px-3 tw-w-24"
          type="number"
          placeholder="Balance"
          value={balance / 10000}
          onChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ): void => {
            setBalance(Number(e.target.value) * 10000);
          }}
          aria-describedby="update-balance-button"
        />
        <PrimaryButton type="submit" id="update-balance-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="tw-w-4 tw-h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </PrimaryButton>
      </div>
    </form>
  );
}
