import { useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
import CreatePaymentModal from "./CreatePaymentModal";

export default function CreatePaymentButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="fixed bg-primary text-white p-5 z-10 right-10 bottom-10 rounded-3xl hover:bg-primary-darken shadow-lg shadow-primary/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <CreatePaymentModal show={show} onClose={handleClose} />
    </>
  );
}
