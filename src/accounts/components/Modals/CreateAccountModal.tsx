import Modal from "../../../common/components/ui/modal/Modal";
import { Account } from "../../../types/Models";
import CreateAccountView from "../Views/CreateAccountView";

export default function CreateAccountModal({
  parent,
  show,
  onClose,
}: {
  parent?: Account;
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title={`${parent ? `Create Jar for ${parent.name}` : "Create Account"}`}
    >
      <CreateAccountView onSuccess={onClose} parent={parent} />
    </Modal>
  );
}
