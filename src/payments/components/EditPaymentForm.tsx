import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap";
import { updatePayment } from "../../api/accounts";
import UpdatePaymentData from "../../interfaces/UpdatePaymentData";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";
import moment from "moment";
import { isTransfer } from "../../helpers/PaymentHelper";

export default function EditPaymentForm({
  payment,
  formId,
  accounts,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  formId: string;
  accounts: Account[];
  onUpdated: () => void;
}>) {
  const [paymentData, setPaymentData] = useState<UpdatePaymentData>({
    jar_id: payment.jar_id,
    description: payment.description,
    amount: Math.abs(payment.original_amount / 10000),
    date: payment.date,
    direction: payment.amount > 0 ? "income" : "expense",
    currency: payment.currency,
    hidden: payment.hidden,
    ends_on: payment.ends_on,
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updatePayment(payment.id, {
      ...paymentData,
      amount:
        paymentData.direction === "income"
          ? paymentData.amount
          : -paymentData.amount,
    });

    onUpdated();
  };

  return (
    <Form id={formId} onSubmit={submit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={moment(paymentData.date).format("YYYY-MM-DD")}
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
        {!isTransfer(payment) && (
          <Col>
            <Form.Group>
              <Form.Label>Ends</Form.Label>
              <Form.Control
                type="date"
                value={
                  paymentData.ends_on
                    ? moment(paymentData.ends_on).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ): void => {
                  setPaymentData({
                    ...paymentData,
                    ends_on: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>
        )}
      </Row>

      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label>Account</Form.Label>
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
            <Form.Label>Amount</Form.Label>
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
            <Form.Label>Currency</Form.Label>
            <Form.Select
              value={paymentData.currency}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                setPaymentData({
                  ...paymentData,
                  currency: e.target.value,
                });
              }}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Direction</Form.Label>
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
            <Form.Label>Description</Form.Label>
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
