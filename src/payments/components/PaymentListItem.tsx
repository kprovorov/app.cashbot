import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import Payment from "../../interfaces/Payment";
import moment from "moment";
import GroupDetailModal from "../../groups/components/GroupDetailModal";
import EditPaymentModal from "./EditPaymentModal";
import DeletePaymentButton from "./DeletePaymentButton";
import { DatePill } from "../../common/components/DatePill";

export default function PaymentListItem({
  payment,
  currency,
  showDescription = true,
  showAccountName = false,
  showDeleteButton = false,
  showGroupOnClick = true,
  onDeleted,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  currency: string;
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
    <>
      <div
        className={`p-2 grid grid-flow-col auto-cols-fr cursor-pointer items-center hover:bg-slate-50 rounded ${
          payment.hidden ? "opacity-50" : ""
        } `}
        onClick={() => {
          payment.group && showGroupOnClick
            ? handleShowGroup()
            : handleShowEdit();
        }}
      >
        <DatePill date={moment(payment.date)} />
        {showDescription && (
          <div className="col-span-3 truncate font-semibold">
            {payment.description}
          </div>
        )}
        {showAccountName && (
          <div className="col-span-3 truncate flex items-center gap-1">
            <span className="font-semibold">{payment.account.name}</span>
            <span className="text-gray-400">{payment.account.currency}</span>
          </div>
        )}
        <div
          className={`col-span-2 text-right ${
            payment.amount_converted > 0
              ? "text-positive font-semibold"
              : "text-slate-600"
          }`}
        >
          {currencyFormat(payment.amount_converted, currency)}
        </div>
        {payment.balance !== undefined ? (
          <div
            className={`col-span-2 text-right ${
              payment.balance < 0 ? "text-negative" : "text-slate-400"
            }`}
          >
            {currencyFormat(payment.balance, currency)}
          </div>
        ) : null}

        {showDeleteButton ? (
          <div className="flex justify-end">
            <DeletePaymentButton
              paymentId={payment.id}
              paymentDate={payment.date}
            />
          </div>
        ) : null}
      </div>
      {payment.group && showGroupOnClick ? (
        showGroup && (
          <GroupDetailModal
            show={showGroup}
            group={payment.group}
            onClose={handleCloseGroup}
            onUpdated={onUpdated}
            onDeleted={onDeleted}
          />
        )
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
    </>
  );
}
