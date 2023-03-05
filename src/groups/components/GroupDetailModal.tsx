import moment from "moment";
import React, { PropsWithChildren, useEffect, useState } from "react";
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
          {payments
            .map((payment) => ({
              ...payment,
              date: moment(payment.date).unix(),
            }))
            .map((payment) => {
              if (payment.repeat_unit === "none") {
                return [payment];
              }

              const res = [];

              let date = payment.date;

              const dateTill = payment.repeat_ends_on
                ? moment(payment.repeat_ends_on).unix()
                : moment().add(1, "year").unix();

              while (date <= dateTill) {
                res.push({
                  ...payment,
                  date,
                });

                date = moment
                  .unix(date)
                  .add(payment.repeat_interval, payment.repeat_unit)
                  .unix();
              }

              return res;
            })
            .flat()
            .sort((a, b) => a.date - b.date)
            .map((payment) => ({
              ...payment,
              date: moment.unix(payment.date).toISOString(),
            }))
            .map((payment) => (
              <PaymentListItem
                key={`${payment.id}_${moment(payment.date).unix()}`}
                payment={payment}
                currency={payment.account.currency}
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
          <DeleteGroupButton group={group} onDeleted={onDeleted} />
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </ModalFooter>
      )}
    </Modal>
  );
}
