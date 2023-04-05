import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function ShowEmptyAccountsSwitch() {
  const { showEmptyAccounts, setShowEmptyAccounts } = useContext(AppContext);

  return (
    <div className="flex items-center gap-4">
      <Switch.Group>
        <div className="flex items-center gap-2">
          <Switch
            checked={showEmptyAccounts}
            onChange={setShowEmptyAccounts}
            className={`${
              showEmptyAccounts ? "bg-gray-darkest" : "bg-gray"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                showEmptyAccounts ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <Switch.Label className="uppercase font-bold text-base">
            show empty accounts
          </Switch.Label>
        </div>
      </Switch.Group>
    </div>
  );
}
