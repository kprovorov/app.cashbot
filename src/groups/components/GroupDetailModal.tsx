import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getGroup } from "../../api/groups";
import Spinner from "../../common/components/Spinner";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import Group from "../../interfaces/Group";
import PaymentListItem from "../../payments/components/PaymentListItem";
import DeleteGroupButton from "./DeleteGroupButton";

export default function GroupDetailModal({
  groupId,
  show,
  onUpdated,
  onDeleted,
  onClose,
}: PropsWithChildren<{
  groupId: number;
  show: boolean;
  onUpdated: () => void;
  onDeleted: () => void;
  onClose: () => void;
}>) {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = React.useState<Group | null>(null);

  const fetchGroup = useCallback(async () => {
    if (show) {
      setLoading(true);
      const group = await getGroup(groupId);

      setGroup(group);
      setLoading(false);
    }
  }, [show, groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup]);

  return (
    <Modal show={show} onClose={onClose} title={group?.name || ""}>
      {loading ? (
        <div
          className="tw-flex tw-justify-center tw-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner />
        </div>
      ) : (
        <div>
          {group?.payments.map((payment) => (
            <PaymentListItem
              key={payment.id}
              payment={payment}
              currency={payment.jar.account.currency}
              showDescription={false}
              showAccountName={true}
              showDeleteButton={true}
              showGroupOnClick={false}
              onUpdated={async () => {
                await fetchGroup();
                onUpdated();
              }}
              onDeleted={async () => {
                await fetchGroup();
                onDeleted();
              }}
            />
          ))}
        </div>
      )}

      {loading ? null : (
        <ModalFooter>
          <DeleteGroupButton groupId={groupId} onDeleted={onDeleted} />
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ModalFooter>
      )}
    </Modal>
  );
}
