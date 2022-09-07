import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import AddTransfer from "./AddTransfer";
import CreatePaymentButton from "./payments/components/CreatePaymentButton";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const res = await getAccounts();

    setAccounts(res);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col">
          <AddTransfer accounts={accounts} onCreated={fetchAccounts} />
          <CreatePaymentButton
            accounts={accounts}
            onPaymentCreated={fetchAccounts}
          />
        </div>
      </div>
      <div className="row">
        {accounts.map((account, index) => (
          <div className="col-12" key={account.id}>
            <AccountCard account={account} onPaymentDeleted={fetchAccounts} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
