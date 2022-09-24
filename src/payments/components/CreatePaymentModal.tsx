import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import CreatePaymentForm from "./CreatePaymentForm";

export default function CreatePaymentModal({
  show,
  onClose,
  onCreated,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  onCreated: () => void;
}>) {
  return (
    <Modal centered show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <div className="text-uppercase fw-bold">Add Payment</div>
      </Modal.Header>
      <Modal.Body>
        <CreatePaymentForm formId="create-payment-form" onCreated={onCreated} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" form="create-payment-form" type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
