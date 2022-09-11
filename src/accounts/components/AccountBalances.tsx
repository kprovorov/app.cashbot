import React, { PropsWithChildren } from "react";
import { Card, Table } from "react-bootstrap";
import Account from "../../interfaces/Account";
import { currencyFormat } from "../../services/formatters";

export default function AccountBalances({
  accounts,
}: PropsWithChildren<{ accounts: Account[] }>) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Table>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>{currencyFormat(account.balance, account.currency)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
