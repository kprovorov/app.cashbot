import { useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
import CreatePaymentModal from "./CreatePaymentModal";

export default function CreatePaymentButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <HeaderButton onClick={handleShow}>Add Payment</HeaderButton>
      <CreatePaymentModal show={show} onClose={handleClose} />
    </>
  );
}
