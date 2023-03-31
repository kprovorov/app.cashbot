import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";

export default function Modal({
  title,
  show,
  onClose,
  children,
}: PropsWithChildren<{
  title: string;
  show: boolean;
  onClose: () => void;
}>) {
  return (
    <Dialog open={show} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="flex flex-col gap-4 w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title className="uppercase font-bold flex">
              <span className="flex-grow">{title}</span>
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray hover:text-gray-light0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
