import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import EditPaymentForm from "./EditPaymentForm";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";
import DeletePaymentButton from "./DeletePaymentButton";
import HidePaymentButton from "./HidePaymentButton";

export default function EditPaymentModal({
  payment,
  show,
  accounts,
  onClose,
  onUpdated,
}: PropsWithChildren<{
  payment: Payment;
  show: boolean;
  accounts: Account[];
  onClose: () => void;
  onUpdated: () => void;
}>) {
  return (
    <Modal centered show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <div className="text-uppercase fw-bold">Edit Payment</div>
      </Modal.Header>
      <Modal.Body>
        <EditPaymentForm
          accounts={accounts}
          payment={payment}
          formId={`edit-payment-form-${payment.id}`}
          onUpdated={onUpdated}
        />
      </Modal.Body>
      <Modal.Footer>
        <HidePaymentButton payment={payment} onUpdated={onUpdated} />

        <DeletePaymentButton paymentId={payment.id} onDeleted={onUpdated} />
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          form={`edit-payment-form-${payment.id}`}
          type="submit"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
