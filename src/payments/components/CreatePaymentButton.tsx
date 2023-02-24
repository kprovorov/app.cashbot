import React, { PropsWithChildren, useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
import CreatePaymentModal from "./CreatePaymentModal";

export default function CreatePaymentButton({
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
      <HeaderButton onClick={handleShow}>Add Payment</HeaderButton>
      <CreatePaymentModal
        show={show}
        onClose={handleClose}
        onCreated={handleCreated}
      />
    </>
  );
}
