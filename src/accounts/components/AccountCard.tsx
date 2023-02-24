import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";
import PaymentsList from "../../payments/components/PaymentsList";
import AccountBalance from "./AccountBalance";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";

export default function AccountCard({
  account,
  onDeleted,
  onUpdated,
  showHiddenPayments = false,
}: PropsWithChildren<{
  account: Account;
  onDeleted: () => void;
  onUpdated: () => void;
  showHiddenPayments?: boolean;
}>) {
  return (
    <Card>
      <CardHeader className="tw-font-bold">
        <CardTitle className="tw-flex-grow">{account.name}</CardTitle>
        <AccountBalance account={account} onUpdated={onUpdated} />
      </CardHeader>
      <PaymentsList
        account={account}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
        showHidden={showHiddenPayments}
      />
    </Card>
  );
}
