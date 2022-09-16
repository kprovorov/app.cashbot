import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import { Collapse } from "react-bootstrap";
import Payment from "../../interfaces/Payment";
import EditPaymentButton from "./EditPaymentButton";
import DeletePaymentButton from "./DeletePaymentButton";
import DeleteGroupButton from "../../groups/components/DeleteGroupButton";
import Account from "../../interfaces/Account";
import moment from "moment";
import { isIncomingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";

export default function PaymentListItem({
  payment,
  accounts,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  accounts: Account[];
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`p-3 d-flex flex-column border-top ${
        moment(payment.date).month() % 2 ? "bg-light" : null
      }`}
    >
      <div
        className="payment-card d-flex flex-column"
        onClick={() => setOpen(!open)}
        aria-controls={`expand-${payment.id}`}
        aria-expanded={open}
      >
        <div className="d-flex">
          <small
            className={
              moment(payment.date).diff(moment()) < 0 ? "text-bg-success" : ""
            }
          >
            {payment.date} ({payment.jar.name})
          </small>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div>{payment.description}</div>

          <div
            className={
              payment.amount > 0 &&
              !isIncomingPaymentWithinSameAccountTransfer(payment)
                ? "text-success fw-bold"
                : ""
            }
          >
            {isIncomingPaymentWithinSameAccountTransfer(payment)
              ? currencyFormat(-payment.amount, payment.currency)
              : currencyFormat(payment.amount, payment.currency)}
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between text-size-md">
          <div className="text-secondary">Default</div>
          <div
            className={
              payment.balance >= 0
                ? payment.jar_savings_balance &&
                  payment.balance < payment.jar_savings_balance
                  ? "text-warning"
                  : "text-secondary"
                : "text-bg-danger"
            }
          >
            {currencyFormat(payment.balance, payment.currency)}
          </div>
        </div>

        {payment.jar_savings_balance ? (
          <div className="d-flex flex-row justify-content-between text-size-md">
            <div className="text-secondary">Savings</div>
            <div
              className={
                payment.jar.default || payment.jar_savings_balance >= 0
                  ? "text-secondary"
                  : "text-bg-danger"
              }
            >
              {currencyFormat(payment.jar_savings_balance, payment.currency)}
            </div>
          </div>
        ) : null}

        {payment.jar.account.jars
          .filter((jar) => !jar.default)
          .map((jar) =>
            payment.jar_balance && payment.jar_id === jar.id ? (
              <div
                key={jar.id}
                className="d-flex flex-row justify-content-between text-size-md"
              >
                <div className="text-secondary">{jar.name}</div>
                <div
                  className={
                    payment.jar_id !== jar.id || payment.jar_balance >= 0
                      ? "text-secondary"
                      : "text-bg-danger"
                  }
                >
                  {currencyFormat(payment.jar_balance, payment.currency)}
                </div>
              </div>
            ) : null
          )}
      </div>
      <Collapse in={open}>
        <div id={`expand-${payment.id}`}>
          <EditPaymentButton
            accounts={accounts}
            payment={payment}
            onUpdated={onUpdated}
          />
          <DeletePaymentButton paymentId={payment.id} onDeleted={onDeleted} />
          {payment.group_id ? (
            <DeleteGroupButton
              groupId={payment.group_id}
              onDeleted={onDeleted}
            />
          ) : null}
        </div>
      </Collapse>
    </div>
  );
}
