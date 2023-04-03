import React, { PropsWithChildren, useState } from "react";
import { currencyFormat } from "../../services/formatters";
import moment from "moment";
import GroupDetailModal from "../../groups/components/GroupDetailModal";
import DeletePaymentButton from "./DeletePaymentButton";
import { DatePill } from "../../common/components/DatePill";
import { Account, Payment } from "../../types/Models";
import { Currency } from "../../types/Enums";

export default function PaymentListItem({
  payment,
  account,
  currency,
  showDescription = true,
  showAccountName = false,
  showDeleteButton = false,
  showGroupOnClick = true,
  showBalance = true,
  onDeleted = () => {},
  onUpdated = () => {},
  onClick = () => {},
}: PropsWithChildren<{
  payment: Payment;
  account?: Account;
  currency: Currency;
  showDescription?: boolean;
  showAccountName?: boolean;
  showDeleteButton?: boolean;
  showGroupOnClick?: boolean;
  showBalance?: boolean;
  onDeleted?: () => void;
  onUpdated?: () => void;
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
        className="p-2 grid grid-flow-col auto-cols-fr cursor-pointer items-center hover:bg-gray-lightest/50 rounded"
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
                <span className="text-gray">
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
                className="w-4 h-4 text-gray-dark"
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
                <span className="text-gray">{payment.account_to.currency}</span>
              </span>
            ) : null}
          </div>
        )}
        <div
          className={`col-span-2 text-right ${
            payment.amount > 0 ? "text-green font-semibold" : "text-gray-dark"
          }`}
        >
          {currencyFormat(payment.amount_converted, currency)}
        </div>
        {showBalance && payment.balance !== undefined ? (
          <div
            className={`col-span-2 text-right ${
              payment.balance < 0
                ? "text-red"
                : payment.balance > (account?.balance_savings || 0)
                ? "text-gray"
                : "text-orange"
            }`}
          >
            {currencyFormat(payment.balance, currency)}
          </div>
        ) : null}

        {showDeleteButton ? (
          <div className="flex justify-end">
            <DeletePaymentButton payment={payment} $size="sm" />
          </div>
        ) : null}
      </div>
      {showGroupOnClick && !!account && showGroup && (
        <GroupDetailModal
          title={payment.description}
          account={account}
          show={showGroup}
          group={payment.group}
          onClose={handleCloseGroup}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      )}
    </>
  );
}
