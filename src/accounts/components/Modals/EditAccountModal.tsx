import Modal from "../../../common/components/ui/modal/Modal";
import { Account } from "../../../types/Models";
import EditAccountView from "../Views/EditAccountView";

export default function EditAccountModal({
  account,
  show,
  onClose,
}: {
  account: Account;
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Modal show={show} onClose={onClose} title="Edit Account">
      <EditAccountView
        onSuccess={onClose}
        account={account}
        onDeleted={onClose}
      />
    </Modal>
  );
}
