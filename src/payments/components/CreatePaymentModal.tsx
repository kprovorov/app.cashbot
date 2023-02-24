import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";
import Button from "../../common/components/ui/buttons/Button";
import PrimaryButton from "../../common/components/ui/buttons/PrimaryButton";
import SecondaryButton from "../../common/components/ui/buttons/SecondaryButton";
import CreatePaymentForm from "./CreatePaymentForm";

export default function CreatePaymentModal({
  show,
  onClose,
  onCreated,
}: PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  onCreated: () => void;
}>) {
  return (
    <Dialog open={show} onClose={onClose} className="tw-relative tw-z-10">
      <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
      <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
        <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
          <Dialog.Panel className="tw-flex tw-flex-col tw-gap-4 tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
            <Dialog.Title className="tw-uppercase tw-font-bold tw-flex">
              <span className="tw-flex-grow">Add Payment</span>
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="tw-w-6 tw-h-6 tw-text-slate-400 hover:tw-text-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Title>

            <CreatePaymentForm
              formId="create-payment-form"
              onCreated={onCreated}
            />

            <div className="tw-flex tw-gap-3 tw-justify-end">
              <SecondaryButton onClick={onClose}>Close</SecondaryButton>
              <PrimaryButton form="create-payment-form" type="submit">
                Save changes
              </PrimaryButton>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
