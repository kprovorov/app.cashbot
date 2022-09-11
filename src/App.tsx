import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import { Col, Row } from "react-bootstrap";
import AccountBalances from "./accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";
import TheHeader from "./common/components/TheHeader";
import Container from "react-bootstrap/Container";

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
    <>
      <TheHeader accounts={accounts} onCreated={fetchAccounts} />
      <Container fluid className="container-main">
        <Row>
          <Col>
            <Form.Check
              onChange={(e) => setShowEmptyAccounts(e.target.checked)}
              type="switch"
              id="custom-switch"
              label="Empty"
            />
          </Col>
        </Row>
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
      </Container>
    </>
  );
}

export default App;
