import { PropsWithChildren, useState } from "react";
import { useAccounts } from "../../api/accounts";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import DeletePaymentButton from "../../payments/components/DeletePaymentButton";
import EditPaymentForm from "../../payments/components/EditPaymentForm";
import PaymentListItem from "../../payments/components/PaymentListItem";
import { Account, Payment } from "../../types/Models";
import DeleteGroupButton from "./DeleteGroupButton";

export default function GroupDetailModal({
  group,
  account,
  show,
  onUpdated,
  onDeleted,
  onClose,
}: PropsWithChildren<{
  group: string;
  account: Account;
  show: boolean;
  onUpdated: () => void;
  onDeleted: () => void;
  onClose: () => void;
}>) {
  const [editPayment, setEditPayment] = useState<Payment | null>(null);

  const { data: accounts } = useAccounts();

  return (
    <Modal show={show} onClose={onClose} title="Payments">
      {editPayment ? (
        <EditPaymentForm
          payment={editPayment}
          formId={`edit-payment-form-${editPayment.id}`}
          onUpdated={onClose}
        />
      ) : (
        <div>
          {accounts
            ?.map((account) => account.payments || [])
            .flat()
            .filter((payment) => payment.group === group)
            .sort((a, b) => a.date.unix() - b.date.unix())
            .map((payment) => (
              <PaymentListItem
                account={account}
                key={`${payment.id}_${payment.date.unix()}`}
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
      )}

      {editPayment ? (
        <ModalFooter>
          <SecondaryButton onClick={() => setEditPayment(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </SecondaryButton>
          <DeletePaymentButton payment={editPayment} onDeleted={onClose} />
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
          <PrimaryButton
            form={`edit-payment-form-${editPayment.id}`}
            type="submit"
          >
            Save Changes
          </PrimaryButton>
        </ModalFooter>
      ) : (
        <ModalFooter>
          <DeleteGroupButton group={group} onDeleted={onClose} />
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ModalFooter>
      )}
    </Modal>
  );
}
