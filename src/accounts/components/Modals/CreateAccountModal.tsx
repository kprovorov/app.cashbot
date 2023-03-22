import Modal from "../../../common/components/ui/modal/Modal";
import CreateAccountView from "../Views/CreateAccountView";

export default function CreateAccountModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Modal show={show} onClose={onClose} title="Create Account">
      <CreateAccountView onCancel={onClose} onSuccess={onClose} />
    </Modal>
  );
}
