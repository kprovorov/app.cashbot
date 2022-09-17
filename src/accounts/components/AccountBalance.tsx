import React, { PropsWithChildren, useState } from "react";
import AccountUpdateBalanceForm from "./AccountUpdateBalanceForm";
import { currencyFormat } from "../../services/formatters";
import Account from "../../interfaces/Account";

export default function AccountBalance({
  account,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  onUpdated: () => void;
}>) {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <div>
      {editing ? (
        <AccountUpdateBalanceForm
          account={account}
          onUpdated={() => {
            setEditing(false);
            onUpdated();
          }}
        />
      ) : (
        <div onClick={() => setEditing(true)}>
          {currencyFormat(account.balance, account.currency)}
        </div>
      )}
    </div>
  );
}
