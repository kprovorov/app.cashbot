import CreateTransferButton from "../../transfers/components/CreateTransferButton";
import CreatePaymentButton from "../../payments/components/CreatePaymentButton";
import HeaderButton from "./HeaderButton";

export default function TheHeader() {
  return (
    <div className="flex bg-slate-800 p-3 text-white justify-between items-center">
      <div className="flex gap-3 items-center">
        <a href="/" className="px-3">
          <img className="h-6" src="logo.svg" alt="cashbot" />
        </a>
        <CreateTransferButton />
        <CreatePaymentButton />
      </div>
      <HeaderButton $as="a" href={`${import.meta.env.VITE_ID_APP_URL}/login`}>
        Login
      </HeaderButton>
    </div>
  );
}
