import React, { PropsWithChildren } from "react";
import { Card } from "react-bootstrap";
import Account from "../../interfaces/Account";
import PaymentsList from "../../payments/components/PaymentsList";
import AccountBalance from "./AccountBalance";

export default function AccountCard({
  account,
  accounts,
  onDeleted,
  onUpdated,
  showHiddenPayments = false,
}: PropsWithChildren<{
  account: Account;
  accounts: Account[];
  onDeleted: () => void;
  onUpdated: () => void;
  showHiddenPayments?: boolean;
}>) {
  return (
    <Card className="mt-4">
      <div className="p-3 d-flex justify-content-between fw-bold border-bottom">
        <div className="w-50 text-uppercase">{account.name}</div>
        <div className="w-50 d-flex justify-content-end">
          <AccountBalance account={account} onUpdated={onUpdated} />
        </div>
      </div>
      <PaymentsList
        account={account}
        accounts={accounts}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
        showHidden={showHiddenPayments}
      />
    </Card>
  );
}
