import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import Payment from "../../interfaces/Payment";
import moment from "moment";
import { isIncomingPaymentWithinSameAccountTransfer } from "../../helpers/PaymentHelper";
import GroupDetailModal from "../../groups/components/GroupDetailModal";
import EditPaymentModal from "./EditPaymentModal";
import DeletePaymentButton from "./DeletePaymentButton";

export default function PaymentListItem({
  payment,
  showDescription = true,
  showAccountName = false,
  showDeleteButton = false,
  showGroupOnClick = true,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
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
      className="p-2 d-flex flex-column border-top payment-list-item"
      style={{
        cursor: "pointer",
        opacity: payment.hidden ? 0.5 : 1,
      }}
    >
      <div
        className="payment-card d-flex"
        onClick={() => {
          payment.group_id && showGroupOnClick
            ? handleShowGroup()
            : handleShowEdit();
        }}
      >
        <div
          className={`d-flex flex-column rounded-pill text-size-sm align-items-center justify-content-center line-height-sm fw-bold ${
            moment(payment.date).diff(moment()) < 0
              ? "bg-primary text-white"
              : "bg-lighter text-black"
          }`}
          style={{
            width: "2rem",
            height: "2rem",
          }}
        >
          <div>{moment(payment.date).format("D")}</div>
          <div>{moment(payment.date).format("MMM")}</div>
        </div>
        <div className="d-flex flex-column flex-grow-1 ps-2">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="me-auto">
              {showDescription ? (
                <span className="fw-semibold">{payment.description}</span>
              ) : showAccountName ? (
                `${payment.jar.account.name} (${payment.jar.name})`
              ) : null}
            </div>

            <div
              className={
                payment.amount_converted > 0 &&
                !isIncomingPaymentWithinSameAccountTransfer(payment)
                  ? "text-success fw-bold"
                  : ""
              }
            >
              {isIncomingPaymentWithinSameAccountTransfer(payment)
                ? currencyFormat(
                    -payment.amount_converted,
                    payment.jar.account.currency
                  )
                : currencyFormat(
                    payment.amount_converted,
                    payment.jar.account.currency
                  )}
            </div>

            {showDeleteButton ? (
              <DeletePaymentButton
                paymentId={payment.id}
                onDeleted={onDeleted}
                size="sm"
              />
            ) : null}
          </div>
          {payment.balance !== undefined ? (
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

          {!payment.jar.default && payment.jar_balance !== undefined && (
            <div className="d-flex flex-row justify-content-between text-size-md">
              <div className="text-secondary">{payment.jar.name}</div>
              <div
                className={
                  payment.jar_balance >= 0 ? "text-secondary" : "text-danger"
                }
              >
                {currencyFormat(
                  payment.jar_balance,
                  payment.jar.account.currency
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {payment.group_id && showGroupOnClick ? (
        <GroupDetailModal
          show={showGroup}
          groupId={payment.group_id}
          onClose={handleCloseGroup}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ) : (
        <EditPaymentModal
          show={showEdit}
          payment={payment}
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
