import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getPaymentsByGroup } from "../../api/payments";
import Spinner from "../../common/components/Spinner";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import Modal from "../../common/components/ui/modal/Modal";
import ModalFooter from "../../common/components/ui/modal/ModalFooter";
import Payment from "../../interfaces/Payment";
import PaymentListItem from "../../payments/components/PaymentListItem";
import DeleteGroupButton from "./DeleteGroupButton";

export default function GroupDetailModal({
  group,
  show,
  onUpdated,
  onDeleted,
  onClose,
}: PropsWithChildren<{
  group: string;
  show: boolean;
  onUpdated: () => void;
  onDeleted: () => void;
  onClose: () => void;
}>) {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = React.useState<Payment[]>([]);

  const fetchPayments = async () => {
    if (show) {
      setLoading(true);
      const res = await getPaymentsByGroup(group);

      setPayments(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Modal show={show} onClose={onClose} title={payments[0]?.description || ""}>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : (
        <div>
          {payments.map((payment) => (
            <PaymentListItem
              key={payment.id}
              payment={payment}
              currency={payment.jar.account.currency}
              showDescription={false}
              showAccountName={true}
              showDeleteButton={true}
              showGroupOnClick={false}
              onUpdated={async () => {
                await fetchPayments();
                onUpdated();
              }}
              onDeleted={async () => {
                await fetchPayments();
                onDeleted();
              }}
            />
          ))}
        </div>
      )}

      {loading ? null : (
        <ModalFooter>
          {/* <DeleteGroupButton groupId={groupId} onDeleted={onDeleted} /> */}
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ModalFooter>
      )}
    </Modal>
  );
}
