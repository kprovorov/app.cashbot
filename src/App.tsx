import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import {
  Button,
  ButtonGroup,
  Col,
  Row,
  Spinner,
  ToggleButton,
} from "react-bootstrap";
import AccountBalances from "./accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";
import TheHeader from "./common/components/TheHeader";
import Container from "react-bootstrap/Container";

function App() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);
  const [layout, setLayout] = useState<"table" | "cards">("cards");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    const res = await getAccounts();

    setAccounts(res);
    setLoading(false);
  };

  return (
    <>
      <TheHeader accounts={accounts} onCreated={fetchAccounts} />
      <Container fluid className="container-main">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center bg-light p-3 border rounded">
              <div className="d-flex align-items-center">
                <Form.Check
                  onChange={(e) => setShowEmptyAccounts(e.target.checked)}
                  type="switch"
                  id="custom-switch"
                  label="Empty"
                />
                <Button
                  style={{ width: "80px" }}
                  className="ms-2"
                  size="sm"
                  variant="outline-secondary"
                  onClick={fetchAccounts}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>
              <div>
                <ButtonGroup>
                  <ToggleButton
                    value="table"
                    type="radio"
                    size="sm"
                    variant="outline-secondary"
                    checked={layout === "table"}
                    onClick={() => setLayout("table")}
                  >
                    <i className="bi bi-list"></i>
                  </ToggleButton>
                  <ToggleButton
                    value="cards"
                    type="radio"
                    size="sm"
                    variant="outline-secondary"
                    checked={layout === "cards"}
                    onClick={() => setLayout("cards")}
                  >
                    <i className="bi bi-grid"></i>
                  </ToggleButton>
                </ButtonGroup>
              </div>
            </div>
          </Col>
        </Row>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
            {accounts.length ? <AccountBalances accounts={accounts} /> : null}
          </div>
          {accounts
            .filter((account) => showEmptyAccounts || account.payments.length)
            .map((account, index) => (
              <div
                className={
                  layout === "cards"
                    ? "col-sm-6 col-md-6 col-lg-4 col-xl-3"
                    : "col-12"
                }
                key={account.id}
              >
                <AccountCard
                  layout={layout}
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
