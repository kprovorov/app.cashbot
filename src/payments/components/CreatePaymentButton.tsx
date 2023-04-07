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
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function CreatePaymentButton() {
  const [show, setShow] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.EXPENSE
  );

  const handleClose = () => setShow(false);
  const handleShow = (paymentType: PaymentType) => {
    setPaymentType(paymentType);
    setShow(true);
  };

  return (
    <div className="fixed z-10 right-10 bottom-10">
      <Popover className="relative">
        <Popover.Button className="bg-primary hover:scale-110 transition duration-200 ease-in-out text-white p-5 rounded-full hover:bg-primary-dark shadow-lg shadow-primary/50 ui-open:outline-none focus:outline-none">
          <PlusIcon className="w-6 h-6" />
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
        show={show}
        onClose={handleClose}
        paymentType={paymentType}
      />
    </div>
  );
}
