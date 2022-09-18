import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import EditPaymentForm from "./EditPaymentForm";
import Payment from "../../interfaces/Payment";
import Account from "../../interfaces/Account";
import DeletePaymentButton from "./DeletePaymentButton";

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
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <div className="text-uppercase fw-bold">Edit Payment</div>
      </Modal.Header>
      <Modal.Body>
        <EditPaymentForm
          accounts={accounts}
          payment={payment}
          formId="edit-payment-form"
          onUpdated={onUpdated}
        />
      </Modal.Body>
      <Modal.Footer>
        <DeletePaymentButton paymentId={payment.id} onDeleted={onUpdated} />
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" form="edit-payment-form" type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
