import { Outlet } from "react-router-dom";
import TheHeader from "../TheHeader";
import CreatePaymentButton from "../../../payments/components/CreatePaymentButton";
import { useAccountsQuery } from "../../../api/accounts";

export default function AppLayout() {
  const { data: accounts } = useAccountsQuery();

  return (
    <>
      <div className="p-md pb-0">
        <TheHeader />
      </div>
      {accounts?.length ? <CreatePaymentButton /> : null}
      <Outlet />
    </>
  );
}
