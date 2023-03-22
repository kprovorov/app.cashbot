import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";
import { Currency } from "../../types/Enums";
import { Account } from "../../types/Models";
import { useState } from "react";
import EditAccountModal from "./Modals/EditAccountModal";

export default function AccountBalancesRow({ account }: { account: Account }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="p-2 grid grid-flow-col auto-cols-fr cursor-pointer items-center hover:bg-slate-50 rounded">
        <div
          className="col-span-2 truncate font-semibold hover:text-primary"
          onClick={() => setShowModal(true)}
        >
          {account.name}
        </div>
        <div className="text-end text-slate-400">
          <AccountBalance account={account} />
        </div>
        <div className="text-end font-semibold">
          {currencyFormat(account.balance_converted, Currency.UAH)}
        </div>
      </div>
      {showModal ? (
        <EditAccountModal
          show={showModal}
          onClose={() => setShowModal(false)}
          account={account}
        />
      ) : null}
    </>
  );
}
