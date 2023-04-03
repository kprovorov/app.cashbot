import { useState } from "react";
import CreateAccountModal from "../Modals/CreateAccountModal";
import CreateButton from "../../../common/components/ui/buttons/CreateButton";

export default function CreateAccountButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <CreateButton className="w-full" onClick={() => setShow(true)}>
        Add account
      </CreateButton>
      {show ? (
        <CreateAccountModal show={show} onClose={() => setShow(false)} />
      ) : null}
    </>
  );
}
