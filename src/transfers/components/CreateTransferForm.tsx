import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import Account from "../../interfaces/Account";
import CreateTransferData from "../../interfaces/CreateTransferData";
import { createTransfer, getRate } from "../../api/accounts";
import AccountsContext from "../../context/AccountsContext";

export default function CreateTransferForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const { accounts } = useContext(AccountsContext);
  const [accountFrom, setAccountFrom] = useState<Account | undefined>();
  const [accountTo, setAccountTo] = useState<Account | undefined>();
  const [transferData, setTransferData] = useState<CreateTransferData>({
    date: "",
    amount: 0,
    rate: 0,
    jar_from_id: 0,
    jar_to_id: 0,
    repeat: "none",
    currency: "",
    description: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTransfer({
      ...transferData,
      amount:
        transferData.currency === accountFrom?.currency
          ? Math.round(transferData.amount * 100) / 100
          : Math.round(transferData.amount * transferData.rate * 100) / 100,
    });

    onCreated();
  };

  useEffect(() => {
    (async () => {
      if (accountFrom && accountTo) {
        const res = await getRate(accountFrom.currency, accountTo.currency);

        setTransferData({
          ...transferData,
          rate: res.rate,
          currency: accountFrom.currency,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFrom, accountTo]);

  useEffect(() => {
    setAccountFrom(
      accounts.find((account) =>
        account.jars.map((jar) => jar.id).includes(transferData.jar_from_id)
      )
    );
    setAccountTo(
      accounts.find((account) =>
        account.jars.map((jar) => jar.id).includes(transferData.jar_to_id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferData.jar_from_id, transferData.jar_to_id]);

  return (
    <Form id={formId} onSubmit={submit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date"
              value={transferData.date}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setTransferData({
                  ...transferData,
                  date: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Rate</Form.Label>
            <Form.Control
              disabled
              type="number"
              placeholder="Rate"
              value={transferData.rate}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setTransferData({
                  ...transferData,
                  rate: Number(e.target.value),
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Repeat</Form.Label>
            <Form.Select
              value={transferData.repeat}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setTransferData({
                  ...transferData,
                  repeat: e.target.value,
                });
              }}
            >
              <option value="none">none</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Jar from</Form.Label>
            <Form.Select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setTransferData({
                  ...transferData,
                  jar_from_id: Number(e.target.value),
                });
              }}
            >
              <option>Please select...</option>
              {accounts.map((account) =>
                account.jars.map((jar) => (
                  <option value={jar.id} key={jar.id}>
                    {account.name} ({jar.default ? "default" : jar.name}) —{" "}
                    {account.currency}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Jar to</Form.Label>
            <Form.Select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setTransferData({
                  ...transferData,
                  jar_to_id: Number(e.target.value),
                });
              }}
            >
              <option>Please select...</option>
              {accounts.map((account) =>
                account.jars.map((jar) => (
                  <option value={jar.id} key={jar.id}>
                    {account.name} ({jar.default ? "default" : jar.name}) —{" "}
                    {account.currency}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Amount From</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount From"
              value={Math.round(transferData.amount * 100) / 100}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setTransferData({
                  ...transferData,
                  amount: Number(e.target.value),
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Amount To</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount To"
              value={
                Math.round(transferData.amount * transferData.rate * 100) / 100
              }
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setTransferData({
                  ...transferData,
                  amount: Number(e.target.value) / transferData.rate,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Fix currency</Form.Label>
            <Form.Select
              disabled={
                !accountFrom ||
                !accountTo ||
                accountFrom?.currency === accountTo?.currency
              }
              value={transferData.currency}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setTransferData({
                  ...transferData,
                  currency: e.target.value,
                });
              }}
            >
              {accountFrom && (
                <option value={accountFrom.currency}>
                  {accountFrom.currency}
                </option>
              )}
              {accountTo && (
                <option value={accountTo.currency}>{accountTo.currency}</option>
              )}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={transferData.description}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setTransferData({
                  ...transferData,
                  description: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
