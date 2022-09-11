import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import CreatePaymentButton from "./payments/components/CreatePaymentButton";
import CreateTransferButton from "./transfers/components/CreateTransferButton";
import { Button } from "react-bootstrap";
import AccountBalances from "./accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

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
            <div className="d-flex align-items-center">
              <CreateTransferButton
                accounts={accounts}
                onCreated={fetchAccounts}
              />
              <CreatePaymentButton
                accounts={accounts}
                onCreated={fetchAccounts}
              />
              <div className="ms-2">
                <Form.Check
                  onChange={(e) => setShowEmptyAccounts(e.target.checked)}
                  type="switch"
                  id="custom-switch"
                  label="Empty"
                />
              </div>
            </div>
            <Button as="a" href={`${process.env.REACT_APP_ID_URL}/login`}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <AccountBalances accounts={accounts} />
        </div>
        {accounts
          .filter((account) => showEmptyAccounts || account.payments.length)
          .map((account, index) => (
            <div
              className="col-sm-6 col-md-6 col-lg-4 col-xl-3"
              key={account.id}
            >
              <AccountCard
                account={account}
                accounts={accounts}
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
