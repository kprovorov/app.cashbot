import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import CreatePaymentButton from "./payments/components/CreatePaymentButton";
import CreateTransferButton from "./transfers/components/CreateTransferButton";
import { Button } from "react-bootstrap";

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
          <div className="d-flex justify-content-between">
            <div>
              <CreateTransferButton
                accounts={accounts}
                onCreated={fetchAccounts}
              />
              <CreatePaymentButton
                accounts={accounts}
                onCreated={fetchAccounts}
              />
            </div>
            <Button as="a" href={`${process.env.REACT_APP_ID_URL}/login`}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        {accounts.map((account, index) => (
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3" key={account.id}>
            <AccountCard
              account={account}
              onDeleted={fetchAccounts}
              onUpdated={fetchAccounts}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
