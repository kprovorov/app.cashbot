import { Popover } from "@headlessui/react";
import { useState } from "react";
import { PaymentType } from "../../types/Enums";
import CreatePaymentModal from "./CreatePaymentModal";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useAccountsQuery } from "../../api/accounts";

export default function CreatePaymentButton() {
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.EXPENSE
  );

  const handleClose = () => setShowModal(false);
  const handleShow = (paymentType: PaymentType) => {
    setPaymentType(paymentType);
    setShowModal(true);
  };

  const { data: accounts } = useAccountsQuery();

  return (
    <div className="fixed z-10 right-10 bottom-10 group">
      <Popover className="relative">
        <Popover.Button className="flex justify-center items-center w-16 h-16 bg-primary hover:scale-110 transition duration-200 ease-in-out text-white  rounded-full  shadow-lg shadow-primary/50 ui-open:outline-none focus:outline-none">
          <div>
            <PlusIcon className="w-6 h-6" />
          </div>
          {accounts?.flatMap((a) => a.payments).length === 0 && !showModal ? (
            <div className="animate-ping group-hover:animate-none absolute top-2 left-2 bg-transparent border-8 border-primary rounded-full w-12 h-12 opacity-80"></div>
          ) : null}
        </Popover.Button>

        <Popover.Panel className="absolute bg-white shadow-outline shadow-black/10 text-black bottom-16 right-0 rounded-xl p-4 w-48">
          <div className="flex flex-col">
            {[
              {
                label: "Income",
                paymentType: PaymentType.INCOME,
                icon: <ArrowDownTrayIcon className="w-6 h-6 text-gray" />,
              },
              {
                label: "Expense",
                paymentType: PaymentType.EXPENSE,
                icon: <ArrowUpTrayIcon className="w-6 h-6 text-gray" />,
              },
              {
                label: "Transfer",
                paymentType: PaymentType.TRANSFER,
                icon: <ArrowsRightLeftIcon className="w-6 h-6 text-gray" />,
              },
              {
                label: "Budget",
                paymentType: PaymentType.BUDGET,
                icon: <BriefcaseIcon className="w-6 h-6 text-gray" />,
              },
            ].map((item) => (
              <SecondaryButton
                className="justify-start"
                key={item.label}
                onClick={() => handleShow(item.paymentType)}
              >
                {item.icon}
                {item.label}
              </SecondaryButton>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
      <CreatePaymentModal
        show={showModal}
        onClose={handleClose}
        paymentType={paymentType}
      />
      {accounts?.flatMap((a) => a.payments).length === 0 && !showModal ? (
        <div className="absolute top-0 right-20 text-xl font-medium flex items-center justify-center h-16 gap-2 w-60 text-gray">
          Create first payment
          <ArrowRightIcon className="w-6 h-6" />
        </div>
      ) : null}
    </div>
  );
}
