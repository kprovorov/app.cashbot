import { Popover } from "@headlessui/react";
import { useState } from "react";
import HeaderButton from "../../common/components/HeaderButton";
import Button from "../../common/components/ui/buttons/Button";
import { PaymentType } from "../../types/Enums";
import CreatePaymentModal from "./CreatePaymentModal";

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
        <Popover.Button className="bg-primary text-white p-5 rounded-3xl hover:bg-primary-darken shadow-lg shadow-primary/50 ui-open:outline-none focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Popover.Button>

        <Popover.Panel className="absolute z-10 bg-white shadow-lg shadow-slate-200 border border-slate-200 text-black bottom-14 right-14 rounded-2xl p-4">
          <div className="flex flex-col">
            {[
              {
                label: "income",
                paymentType: PaymentType.INCOME,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                ),
              },
              {
                label: "expense",
                paymentType: PaymentType.EXPENSE,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                ),
              },
              {
                label: "transfer",
                paymentType: PaymentType.TRANSFER,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                ),
              },
              {
                label: "budget",
                paymentType: PaymentType.BUDGET,
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <Button
                className="flex gap-4 justify-start capitalize hover:bg-slate-100"
                key={item.label}
                onClick={() => handleShow(item.paymentType)}
              >
                {item.icon}
                <span className="text-slate-700 font-medium">{item.label}</span>
              </Button>
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
