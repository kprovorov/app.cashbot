import { useState } from "react";
import CreateAccountModal from "../Modals/CreateAccountModal";
import CreateButton from "../../../common/components/ui/buttons/CreateButton";

export default function CreateAccountButton({
  buttonClass,
}: {
  buttonClass?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <CreateButton
        className={`w-full ${buttonClass}`}
        onClick={() => setShow(true)}
      >
        Add account
      </CreateButton>
      {show ? (
        <CreateAccountModal show={show} onClose={() => setShow(false)} />
      ) : null}
    </>
  );
}
