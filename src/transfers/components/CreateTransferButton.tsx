import React, { PropsWithChildren, useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
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
      <HeaderButton onClick={handleShow}>Add Transfer</HeaderButton>
      <CreateTransferModal
        show={show}
        onClose={handleClose}
        onCreated={handleCreated}
      />
    </>
  );
}
