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
    <div
      className={`tw-p-2 tw-grid tw-cursor-pointer tw-items-center hover:tw-bg-slate-50 tw-rounded ${
        payment.hidden ? "tw-opacity-50" : ""
      } ${showDeleteButton ? "tw-grid-cols-9" : "tw-grid-cols-8"} `}
      onClick={() => {
        payment.group_id && showGroupOnClick
          ? handleShowGroup()
          : handleShowEdit();
      }}
    >
      <DatePill date={moment(payment.date)} />
      <div className="tw-col-span-3 tw-truncate tw-font-semibold">
        {payment.description}
      </div>
      <div
        className={`tw-col-span-2 tw-text-right ${
          payment.amount_converted > 0
            ? "tw-text-positive tw-font-semibold"
            : "tw-text-slate-600"
        }`}
      >
        {currencyFormat(payment.amount_converted, currency)}
      </div>
      <div
        className={`tw-col-span-2 tw-text-right ${
          payment.balance <= 0 ? "tw-text-negative" : "tw-text-slate-400"
        }`}
      >
        {currencyFormat(payment.balance, currency)}
      </div>
      {showDeleteButton ? (
        <div className="tw-text-center">
          <DeletePaymentButton
            paymentId={payment.id}
            onDeleted={onDeleted}
            size="sm"
          />
        </div>
      ) : null}

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
