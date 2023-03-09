import { PropsWithChildren } from "react";
import EditPaymentForm from "./EditPaymentForm";
import DeletePaymentButton from "./DeletePaymentButton";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import { dateFormat } from "../../services/formatters";
import { Payment } from "../../types/Models";

export default function EditPaymentModal({
  payment,
  show,
  onClose,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  show: boolean;
  onClose: () => void;
  onUpdated: () => void;
}>) {
  const formId = `edit-payment-form-${payment.id}`;

  return (
    <Modal show={show} onClose={onClose} title="Edit payment">
      <div className="flex gap-2 items-baseline">
        <span className="font-semibold">{dateFormat(payment.date)}</span>
        {payment.repeat_unit !== "none" ? (
          <div className="bg-slate-100 py-1 px-3 rounded">
            Every{" "}
            {payment.repeat_interval === 1 ? "" : payment.repeat_interval + " "}
            {payment.repeat_unit}
            {payment.repeat_ends_on ? (
              <span>
                {" "}
                until{" "}
                <span className="font-medium">
                  {dateFormat(payment.repeat_ends_on)}
                </span>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
      <hr />
      <EditPaymentForm
        payment={payment}
        formId={`edit-payment-form-${payment.id}`}
        onUpdated={onClose}
      />
      <ModalFooter>
        <DeletePaymentButton payment={payment} onDeleted={onClose} />
        <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        <PrimaryButton form={formId} type="submit">
          Save Changes
        </PrimaryButton>
      </ModalFooter>
    </Modal>
  );
}
