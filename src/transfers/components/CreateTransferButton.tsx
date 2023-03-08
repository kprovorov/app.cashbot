import { useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
import CreateTransferModal from "../../transfers/components/CreateTransferModal";

export default function CreateTransferButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <HeaderButton onClick={handleShow}>Add Transfer</HeaderButton>
      <CreateTransferModal show={show} onClose={handleClose} />
    </>
  );
}
