import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import Account from "../../interfaces/Account";
import CreateTransferData from "../../interfaces/CreateTransferData";
import { createTransfer, getRate } from "../../api/accounts";

export default function CreateTransferForm({
  formId,
  accounts,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  accounts: Account[];
  onCreated: () => void;
}>) {
  const [transferData, setTransferData] = useState<CreateTransferData>({
    date: "",
    amount: 0,
    rate: 0,
    jar_from_id: 0,
    jar_to_id: 0,
    repeat: "none",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTransfer(transferData);

    onCreated();
  };

  const loadRate = async () => {
    const accountFrom = accounts.find((account) =>
      account.jars.map((jar) => jar.id).includes(transferData.jar_from_id)
    );
    const accountTo = accounts.find((account) =>
      account.jars.map((jar) => jar.id).includes(transferData.jar_to_id)
    );

    if (accountFrom && accountTo) {
      const res = await getRate(accountFrom.currency, accountTo.currency);

      setTransferData({
        ...transferData,
        rate: res.buy,
      });
    }
  };

  useEffect(() => {
    (async () => await loadRate())();
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
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount"
              value={transferData.amount}
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
            <Form.Label>Rate</Form.Label>
            <Form.Control
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
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
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
    </Form>
  );
}
