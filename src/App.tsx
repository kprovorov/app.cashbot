import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import AddTransfer from "./AddTransfer";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAccounts();

      setAccounts(res);
    })();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col">
          <AddTransfer
            accounts={accounts}
            onCreated={async () => {
              const res = await getAccounts();

              setAccounts(res);
            }}
          />
        </div>
      </div>
      <div className="row">
        {accounts.map((account, index) => (
          <div className="col-12" key={account.id}>
            <AccountCard account={account} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
