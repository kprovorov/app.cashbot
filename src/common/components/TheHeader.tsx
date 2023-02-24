import { PropsWithChildren } from "react";
import CreateTransferButton from "../../transfers/components/CreateTransferButton";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import HeaderLink from "./HeaderLink";

export default function TheHeader({
  onCreated,
}: PropsWithChildren<{ onCreated: () => void }>) {
  return (
    <div className="tw-flex tw-bg-slate-800 tw-p-3 tw-text-white tw-justify-between tw-items-center">
      <div className="tw-flex tw-gap-3 tw-items-center">
        <a href="/" className="tw-px-3">
          <img className="tw-h-6" src="logo.svg" alt="cashbot" />
        </a>
        <CreateTransferButton onCreated={onCreated} />
        <CreatePaymentButton onCreated={onCreated} />
      </div>
      <HeaderLink href={`${import.meta.env.VITE_ID_APP_URL}/login`}>
        Login
      </HeaderLink>
    </div>
  );
}
