import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { getGroup } from "../../api/groups";
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
    <Modal centered show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <div className="text-uppercase fw-bold">{group?.name}</div>
      </Modal.Header>
      {loading ? (
        <div
          className="d-flex w-100 justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : (
        <div className="payment-list">
          {group?.payments.map((payment) => (
            <PaymentListItem
              key={payment.id}
              payment={payment}
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
        <Modal.Footer>
          <DeleteGroupButton groupId={groupId} onDeleted={onDeleted} />
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
