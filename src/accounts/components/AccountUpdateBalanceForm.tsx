import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { updateAccount } from "../../api/accounts";
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
    <Form onSubmit={submit}>
      <InputGroup>
        <Form.Control
          type="number"
          placeholder="Balance"
          value={balance / 10000}
          size="sm"
          onChange={(
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ): void => {
            setBalance(Number(e.target.value) * 10000);
          }}
          aria-describedby="update-balance-button"
        />
        <Button size="sm" type="submit" id="update-balance-button">
          <i className="bi bi-check"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
