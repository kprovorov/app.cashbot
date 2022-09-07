import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import EditPaymentForm from "./EditPaymentForm";
import Payment from "../../interfaces/Payment";

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
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditPaymentForm
          payment={payment}
          formId="edit-payment-form"
          onUpdated={onUpdated}
        />
      </Modal.Body>
      <Modal.Footer>
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
