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

  const { data: accounts } = useAccounts();

  return (
    <Modal show={show} onClose={onClose} title={title || "Payments"}>
      {editPayment ? (
        <EditPaymentForm
          payment={editPayment}
          onUpdated={onClose}
          onDeleted={onClose}
        />
      ) : (
        <div>
          {accounts
            ?.map((a) => a.payments || [])
            .flat()
            .filter((p) => p.group === group)
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

      {editPayment ? null : (
        <ModalFooter>
          <DeleteGroupButton group={group} onDeleted={onClose} />
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ModalFooter>
      )}
    </Modal>
  );
}
