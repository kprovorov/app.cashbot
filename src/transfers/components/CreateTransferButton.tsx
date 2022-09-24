import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import CreateTransferModal from "../../transfers/components/CreateTransferModal";

export default function CreateTransferButton({
  onCreated,
}: PropsWithChildren<{ onCreated: () => void }>) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreated = () => {
    handleClose();
    onCreated();
  };

  return (
    <>
      <Button onClick={handleShow} className="ms-2" size="sm" variant="dark">
        Add Transfer
      </Button>
      <CreateTransferModal
        show={show}
        onClose={handleClose}
        onCreated={handleCreated}
      />
    </>
  );
}
