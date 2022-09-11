import React, { PropsWithChildren } from "react";
import PaymentsTableRow from "./PaymentsTableRow";
import Account from "../../interfaces/Account";
import { Table } from "react-bootstrap";

export default function PaymentsTable({
  account,
  accounts,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  account: Account;
  accounts: Account[];
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  return (
    <Table hover>
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
      <tbody>
        {account.payments.map((payment, index) => (
          <PaymentsTableRow
            accounts={accounts}
            key={payment.id}
            payment={payment}
            onDeleted={onDeleted}
            onUpdated={onUpdated}
          ></PaymentsTableRow>
        ))}
      </tbody>
    </Table>
  );
}
