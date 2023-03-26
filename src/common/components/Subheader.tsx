import { Switch } from "@headlessui/react";
import { useAccounts } from "../../api/accounts";
import Button from "./ui/buttons/Button";

export default function Subheader({
  showEmptyAccounts,
  setShowEmptyAccounts,
}: {
  showEmptyAccounts: boolean;
  setShowEmptyAccounts: (value: boolean) => void;
}) {
  const { isLoading, refetch } = useAccounts();

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Switch.Group>
          <div className="flex items-center gap-2">
            <Switch
              checked={showEmptyAccounts}
              onChange={setShowEmptyAccounts}
              className={`${
                showEmptyAccounts ? "bg-primary" : "bg-slate-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  showEmptyAccounts ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <Switch.Label className="uppercase font-bold text-base">
              Empty
            </Switch.Label>
          </div>
        </Switch.Group>
      </div>
      <div>
        <Button className="hover:bg-slate-900/5" onClick={() => refetch()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${isLoading ? "animate-spin" : null}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
