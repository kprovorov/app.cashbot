import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import moment from "moment";
import GroupDetailModal from "../../groups/components/GroupDetailModal";
import EditPaymentModal from "./EditPaymentModal";
import DeletePaymentButton from "./DeletePaymentButton";
import { DatePill } from "../../common/components/DatePill";
import { Account, Payment } from "../../types/Models";

export default function PaymentListItem({
  payment,
  account,
  currency,
  showDescription = true,
  showAccountName = false,
  showDeleteButton = false,
  showGroupOnClick = true,
  showBalance = true,
  onDeleted,
  onUpdated,
  onClick = () => {},
}: PropsWithChildren<{
  payment: Payment;
  account: Account;
  currency: string;
  showDescription?: boolean;
  showAccountName?: boolean;
  showDeleteButton?: boolean;
  showGroupOnClick?: boolean;
  showBalance?: boolean;
  onDeleted: () => void;
  onUpdated: () => void;
  onClick?: () => void;
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
            : onClick
            ? onClick()
            : handleShowEdit();
        }}
      >
        <DatePill date={payment.date} />
        {showDescription && (
          <div className="col-span-3 truncate font-semibold">
            {payment.description}
          </div>
        )}
        {showAccountName && (
          <div className="col-span-3 truncate flex items-center gap-3">
            {payment.account_from ? (
              <span>
                <span className="font-semibold">
                  {payment.account_from.name}{" "}
                </span>
                <span className="text-slate-400">
                  {payment.account_from.currency}
                </span>
              </span>
            ) : null}

            {payment.account_from && payment.account_to ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            ) : null}

            {payment.account_to ? (
              <span>
                <span className="font-semibold">
                  {payment.account_to.name}{" "}
                </span>
                <span className="text-slate-400">
                  {payment.account_to.currency}
                </span>
              </span>
            ) : null}
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
        {showBalance && payment.balance !== undefined ? (
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
            <DeletePaymentButton payment={payment} />
          </div>
        ) : null}
      </div>
      {payment.group && showGroupOnClick
        ? showGroup && (
            <GroupDetailModal
              account={account}
              show={showGroup}
              group={payment.group}
              onClose={handleCloseGroup}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
            />
          )
        : null}
    </>
  );
}
