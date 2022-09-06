import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { Button, Card, Form, Table } from "react-bootstrap";
import { currencyFormat } from "./services/formatters";
import {
  createPayment,
  deletePayment,
  getAccountPayments,
} from "./api/accounts";
import Payment from "./interfaces/Payment";
import Account from "./interfaces/Account";

export default function AccountCard({
  account,
}: PropsWithChildren<{ account: Account }>) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentData, setPaymentData] = useState<Omit<Payment, "id">>({
    jar_id: 0,
    description: "",
    amount: 0,
    currency: "",
    date: "",
    balance: 0,
    repeat: "none",
  });

  const delPayment = async (paymentId: number) => {
    await deletePayment(paymentId);

    const res = await getAccountPayments(account.id);

    setPayments(res);
  };

  useEffect(() => {
    (async () => {
      const res = await getAccountPayments(account.id);

      setPayments(res);
    })();
  }, [account.id]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createPayment(paymentData.jar_id, {
      ...paymentData,
      amount: paymentData.amount * 10000,
    });

    setPaymentData({
      jar_id: 0,
      description: "",
      amount: 0,
      currency: "",
      date: "",
      balance: 0,
      repeat: "none",
    });

    const res = await getAccountPayments(account.id);

    setPayments(res);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>
          {account.name} - {account.currency}
        </Card.Title>
        <Form onSubmit={submit}>
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
              <tr>
                <td>
                  <Form.Group>
                    <Form.Control
                      type="date"
                      placeholder="Date"
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
                </td>
                <td>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Description"
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
                </td>
                <td>
                  <Form.Group>
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
                      {account.jars.map((jar) => (
                        <option key={jar.id} value={jar.id}>
                          {jar.default ? "default" : jar.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
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
                </td>
                <td>
                  <Form.Group>
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
                    </Form.Select>
                  </Form.Group>
                </td>
                <td>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </td>
              </tr>

              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>{payment.description}</td>
                  <td>
                    {payment.jar?.default ? "default" : payment.jar?.name}
                  </td>
                  <td
                    className={
                      payment.amount > 0 ? "text-success" : "text-danger"
                    }
                  >
                    {currencyFormat(payment.amount, payment.currency)}
                  </td>
                  <td
                    className={
                      payment.balance && payment.balance >= 0
                        ? payment.jar_savings_balance &&
                          payment.balance < payment.jar_savings_balance
                          ? "text-bg-warning"
                          : ""
                        : "text-bg-danger"
                    }
                  >
                    {payment.balance
                      ? currencyFormat(payment.balance, payment.currency)
                      : ""}
                  </td>
                  <td
                    className={
                      payment.default_jar ||
                      (payment.jar_savings_balance &&
                        payment.jar_savings_balance >= 0)
                        ? ""
                        : "text-bg-danger"
                    }
                  >
                    {payment.jar_savings_balance
                      ? currencyFormat(
                          payment.jar_savings_balance,
                          payment.currency
                        )
                      : ""}
                  </td>
                  {account.jars
                    .filter((jar) => !jar.default)
                    .map((jar) => (
                      <td
                        key={jar.id}
                        className={
                          payment.jar_id !== jar.id ||
                          (payment.jar_balance && payment.jar_balance >= 0)
                            ? ""
                            : "text-bg-danger"
                        }
                      >
                        {payment.jar_balance && payment.jar_id === jar.id
                          ? currencyFormat(
                              payment.jar_balance,
                              payment.currency
                            )
                          : ""}
                      </td>
                    ))}
                  <td>
                    <Button onClick={() => delPayment(payment.id)}>del</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
      </Card.Body>
    </Card>
  );
}
