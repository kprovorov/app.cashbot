import React, { PropsWithChildren, useState } from "react";
import Account from "../../interfaces/Account";
import { Button } from "react-bootstrap";
import CreateTransferModal from "../../transfers/components/CreateTransferModal";

export default function CreateTransferButton({
  accounts,
  onCreated,
}: PropsWithChildren<{ accounts: Account[]; onCreated: () => void }>) {
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
        accounts={accounts}
      />
    </>
  );
}