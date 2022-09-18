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
import Account from "../../interfaces/Account";

export default function GroupDetailModal({
  groupId,
  accounts,
  show,
  onClose,
}: PropsWithChildren<{
  groupId: number;
  accounts: Account[];
  show: boolean;
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
    <Modal show={show} onHide={onClose} size="lg">
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
              payment={payment}
              accounts={accounts}
              showDescription={false}
              showAccountName={true}
              showDeleteButton={true}
              clickable={false}
              onUpdated={() => console.log("onUpdated")}
              onDeleted={() => console.log("onDeleted")}
            />
          ))}
        </div>
      )}
      {loading ? null : (
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" form="edit-payment-form" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
