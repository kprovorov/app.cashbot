import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import Payment from "../../interfaces/Payment";
import moment from "moment";
import { isIncomingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";
import GroupDetailModal from "../../groups/components/GroupDetailModal";
import EditPaymentModal from "./EditPaymentModal";
import Account from "../../interfaces/Account";
import DeletePaymentButton from "./DeletePaymentButton";

export default function PaymentListItem({
  payment,
  accounts,
  showDescription = true,
  showAccountName = false,
  showDeleteButton = false,
  showGroupOnClick = true,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  accounts: Account[];
  showDescription?: boolean;
  showAccountName?: boolean;
  showDeleteButton?: boolean;
  showGroupOnClick?: boolean;
  onDeleted: () => void;
  onUpdated: () => void;
}>) {
  const [showGroup, setShowGroup] = useState(false);
  const handleCloseGroup = () => setShowGroup(false);
  const handleShowGroup = () => setShowGroup(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  return (
    <div
      className={`p-3 d-flex flex-column border-top payment-list-item ${
        moment(payment.date).month() % 2 ? "bg-light" : null
      }`}
      style={{
        cursor: "pointer",
        opacity: payment.hidden ? 0.5 : 1,
      }}
    >
      <div
        className="payment-card d-flex flex-column"
        onClick={() => {
          payment.group_id && showGroupOnClick
            ? handleShowGroup()
            : handleShowEdit();
        }}
      >
        <div className="d-flex">
          <small
            className={
              moment(payment.date).diff(moment()) < 0 ? "text-primary" : ""
            }
          >
            {moment(payment.date).format("D MMM YYYY")}{" "}
            {showAccountName ? null : `(${payment.jar.name})`}
          </small>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="me-auto">
            {showDescription
              ? payment.description
              : showAccountName
              ? `${payment.jar.account.name} (${payment.jar.name})`
              : null}
          </div>

          <div
            className={
              payment.amount > 0 &&
              !isIncomingPaymentWithinSameAccountTransfer(payment)
                ? "text-success fw-bold"
                : ""
            }
          >
            {isIncomingPaymentWithinSameAccountTransfer(payment)
              ? currencyFormat(-payment.amount, payment.jar.account.currency)
              : currencyFormat(payment.amount, payment.jar.account.currency)}
          </div>

          {showDeleteButton ? (
            <DeletePaymentButton
              paymentId={payment.id}
              onDeleted={onDeleted}
              size="sm"
            />
          ) : null}
        </div>
        {payment.balance ? (
          <div className="d-flex flex-row justify-content-between text-size-md">
            <div className="text-secondary">Default</div>
            <div
              className={
                payment.balance >= 0
                  ? payment.jar_savings_balance &&
                    payment.balance < payment.jar_savings_balance
                    ? "text-warning"
                    : "text-secondary"
                  : "text-danger"
              }
            >
              {currencyFormat(payment.balance, payment.jar.account.currency)}
            </div>
          </div>
        ) : null}

        {payment.jar_savings_balance ? (
          <div className="d-flex flex-row justify-content-between text-size-md">
            <div className="text-secondary">Savings</div>
            <div
              className={
                payment.jar.default || payment.jar_savings_balance >= 0
                  ? "text-secondary"
                  : "text-danger"
              }
            >
              {currencyFormat(
                payment.jar_savings_balance,
                payment.jar.account.currency
              )}
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
                      : "text-danger"
                  }
                >
                  {currencyFormat(
                    payment.jar_balance,
                    payment.jar.account.currency
                  )}
                </div>
              </div>
            ) : null
          )}
      </div>
      {payment.group_id && showGroupOnClick ? (
        <GroupDetailModal
          show={showGroup}
          accounts={accounts}
          groupId={payment.group_id}
          onClose={handleCloseGroup}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ) : (
        <EditPaymentModal
          show={showEdit}
          payment={payment}
          accounts={accounts}
          onUpdated={() => {
            handleCloseEdit();
            onUpdated();
          }}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
}
