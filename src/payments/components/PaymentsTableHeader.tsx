import React, { PropsWithChildren } from "react";
import Account from "../../interfaces/Account";

export default function PaymentsTableHeader({
  account,
}: PropsWithChildren<{ account: Account }>) {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Jar</th>
        <th>Amount</th>
        <th>Balance</th>
        <th>Savings Balance</th>
        {account.jars
          .filter((jar) => !jar.default)
          .map((jar) => (
            <th key={jar.id}>{jar.name} Balance</th>
          ))}
        <th></th>
      </tr>
    </thead>
  );
}
