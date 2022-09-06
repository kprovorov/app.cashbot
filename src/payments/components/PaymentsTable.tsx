import React, { PropsWithChildren } from "react";
import PaymentsTableRow from "./PaymentsTableRow";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";
import { Table } from "react-bootstrap";
import PaymentsTableHeader from "./PaymentsTableHeader";

export default function PaymentsTable({
  payments,
  account,
  onPaymentDeleted,
}: PropsWithChildren<{
  payments: Payment[];
  account: Account;
  onPaymentDeleted: () => void;
}>) {
  return (
    <Table hover>
      <PaymentsTableHeader account={account} />
      <tbody>
        {payments.map((payment, index) => (
          <PaymentsTableRow
            key={payment.id}
            payment={payment}
            account={account}
            onDeleted={onPaymentDeleted}
          ></PaymentsTableRow>
        ))}
      </tbody>
    </Table>
  );
}
