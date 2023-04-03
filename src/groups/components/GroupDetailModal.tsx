import { PropsWithChildren, useState } from "react";
import { useAccountsQuery } from "../../api/accounts";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import DeletePaymentButton from "../../payments/components/DeletePaymentButton";
import EditPaymentForm from "../../payments/components/EditPaymentForm";
import PaymentListItem from "../../payments/components/PaymentListItem";
import { Account, Payment } from "../../types/Models";
import DeleteGroupButton from "./DeleteGroupButton";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Heading from "../../common/components/Heading";

export default function GroupDetailModal({
  group,
  title,
  account,
  show,
  onUpdated,
  onDeleted,
  onClose,
}: PropsWithChildren<{
  group: string;
  title?: string;
  account: Account;
  show: boolean;
  onUpdated: () => void;
  onDeleted: () => void;
  onClose: () => void;
}>) {
  const [editPayment, setEditPayment] = useState<Payment | null>(null);

  const { data: accounts } = useAccountsQuery();

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-row items-center justify-between p-6 pb-0">
        <div className="w-6 h-6">
          {editPayment ? (
            <button onClick={() => setEditPayment(null)}>
              <ArrowLeftIcon className="w-6 h-6 text-gray hover:text-gray-dark" />
            </button>
          ) : null}
        </div>
        <div className="flex justify-center">
          <Heading>{title}</Heading>
        </div>
        <div className="w-6 h-6">
          <button onClick={onClose}>
            <XMarkIcon className="w-6 h-6 text-gray hover:text-gray-dark" />
          </button>
        </div>
      </div>
      {editPayment ? (
        <EditPaymentForm
          payment={editPayment}
          onUpdated={onClose}
          onDeleted={onClose}
        />
      ) : (
        <div className="flex flex-col gap-6 p-6">
          <div>
            {accounts
              ?.map((a) => a.payments || [])
              .flat()
              .filter((p) => p.group === group)
              .sort((a, b) => a.date.unix() - b.date.unix())
              .map((payment) => (
                <PaymentListItem
                  account={account}
                  key={`${payment.id}_${payment.date.unix()}_${
                    payment.amount_converted
                  }`}
                  payment={payment}
                  currency={account.currency}
                  showDescription={false}
                  showAccountName={true}
                  showDeleteButton={true}
                  showGroupOnClick={false}
                  showBalance={false}
                  onUpdated={onUpdated}
                  onDeleted={onDeleted}
                  onClick={() => {
                    setEditPayment(payment);
                  }}
                />
              ))}
          </div>
          {editPayment ? null : (
            <div className="flex justify-between">
              <DeleteGroupButton group={group} onDeleted={onClose} />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
