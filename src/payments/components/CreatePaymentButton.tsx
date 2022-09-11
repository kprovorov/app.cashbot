import React, { PropsWithChildren, useState } from "react";
import { Button } from "react-bootstrap";
import CreatePaymentModal from "./CreatePaymentModal";
import Account from "../../interfaces/Account";

export default function CreatePaymentButton({
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
        Add Payment
      </Button>
      <CreatePaymentModal
        show={show}
        onClose={handleClose}
        onCreated={handleCreated}
        accounts={accounts}
      />
    </>
  );
}
