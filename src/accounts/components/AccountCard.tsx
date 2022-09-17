import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Button, Card, Form } from "react-bootstrap";
import { currencyFormat } from "../../services/formatters";
import Account from "../../interfaces/Account";
import PaymentsList from "../../payments/components/PaymentsList";
import { updateAccount } from "../../api/accounts";

export default function AccountCard({
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
  const [balance, setBalance] = useState<number>(account.balance);
  const [editing, setEditing] = useState<boolean>(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAccount(account.id, { ...account, balance });
    setEditing(false);
    onUpdated();
  };

  return (
    <Card className="mt-4">
      <div className="p-3 d-flex justify-content-between fw-bold">
        <div className="w-50">{account.name}</div>
        <div className="w-50 d-flex justify-content-end">
          {editing ? (
            <Form onSubmit={submit}>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  className="me-2"
                  placeholder="Balance"
                  value={balance / 10000}
                  size="sm"
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ): void => {
                    setBalance(Number(e.target.value) * 10000);
                  }}
                />
                <Button size="sm" type="submit">
                  Ok
                </Button>
              </div>
            </Form>
          ) : (
            <div onClick={() => setEditing(true)}>
              {currencyFormat(account.balance, account.currency)}
            </div>
          )}
        </div>
      </div>
      <PaymentsList
        account={account}
        accounts={accounts}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    </Card>
  );
}
