import { PropsWithChildren } from "react";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import CreateTransferForm from "./CreateTransferForm";

export default function CreateTransferModal({
  show,
  onClose,
  onCreated,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  onCreated: () => void;
}>) {
  return (
    <Modal show={show} onClose={onClose} title="Add Transfer">
      <CreateTransferForm formId="create-transfer-form" onCreated={onCreated} />
      <div className="tw-flex tw-gap-3 tw-justify-end">
        <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        <PrimaryButton form="create-transfer-form" type="submit">
          Save Changes
        </PrimaryButton>
      </div>
    </Modal>
  );
}
