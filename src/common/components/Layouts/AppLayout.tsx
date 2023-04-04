import { Outlet } from "react-router-dom";
import ShowEmptyAccountsSwitch from "../ShowEmptyAccountsSwitch";
import TheHeader from "../TheHeader";
import RefreshAccountsButton from "../../../accounts/components/Buttons/RefreshAccountsButton";

export default function AppLayout() {
  return (
    <>
      <TheHeader />
      <div className="flex flex-col">
        <div>
          <div className="flex items-center justify-between px-4 py-6">
            <ShowEmptyAccountsSwitch />
            <RefreshAccountsButton />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
