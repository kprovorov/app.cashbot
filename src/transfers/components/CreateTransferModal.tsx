import React, { PropsWithChildren } from "react";
import { Button, Modal } from "react-bootstrap";
import CreateTransferForm from "./CreateTransferForm";

export default function CreateTransferModal({
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
        <div className="text-uppercase fw-bold">Add Transfer</div>
      </Modal.Header>
      <Modal.Body>
        <CreateTransferForm
          formId="create-transfer-form"
          onCreated={onCreated}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" form="create-transfer-form" type="submit">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
