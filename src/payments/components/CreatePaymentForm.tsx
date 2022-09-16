import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import Account from "../../interfaces/Account";
import { createPayment } from "../../api/accounts";
import CreatePaymentData from "../../interfaces/CreatePaymentData";

export default function CreatePaymentForm({
  formId,
  accounts,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  accounts: Account[];
  onCreated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<CreatePaymentData>({
    jar_id: 0,
    description: "",
    amount: 0,
    date: "",
    repeat: "none",
    direction: "expense",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createPayment({
      ...paymentData,
      amount:
        paymentData.direction === "income"
          ? paymentData.amount
          : -paymentData.amount,
    });

    onCreated();
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              value={paymentData.date}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setPaymentData({
                  ...paymentData,
                  date: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Repeat:</Form.Label>
            <Form.Select
              value={paymentData.repeat}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setPaymentData({
                  ...paymentData,
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
            <Form.Label>Account:</Form.Label>
            <Form.Select
              value={paymentData.jar_id}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setPaymentData({
                  ...paymentData,
                  jar_id: Number(e.target.value),
                });
              }}
            >
              <option>Please select...</option>
              {accounts.map((account) =>
                account.jars.map((jar) => (
                  <option key={jar.id} value={jar.id}>
                    {account.name} ({account.currency}) - {jar.name}
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
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="text"
              value={paymentData.amount}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setPaymentData({
                  ...paymentData,
                  amount: Number(e.target.value),
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Direction:</Form.Label>
            <Form.Select
              value={paymentData.direction}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setPaymentData({
                  ...paymentData,
                  direction: e.target.value as "expense" | "income",
                });
              }}
            >
              <option value="expense">expense</option>
              <option value="income">income</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              value={paymentData.description}
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ): void => {
                setPaymentData({
                  ...paymentData,
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
