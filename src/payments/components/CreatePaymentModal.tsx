import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import CreatePaymentForm from "./CreatePaymentForm";
import Account from "../../interfaces/Account";

export default function CreatePaymentModal({
  show,
  onClose,
  accounts,
  onCreated,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  accounts: Account[];
  onCreated: () => void;
}>) {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <div className="text-uppercase fw-bold">Add Payment</div>
      </Modal.Header>
      <Modal.Body>
        <CreatePaymentForm
          formId="create-payment-form"
          accounts={accounts}
          onCreated={onCreated}
        />
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
