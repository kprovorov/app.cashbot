import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./accounts/components/AccountCard";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import AccountBalances from "./accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";
import TheHeader from "./common/components/TheHeader";
import Container from "react-bootstrap/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import PaymentsCard from "./payments/components/PaymentsCard";
import moment from "moment";

function App() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);
  const [showHiddenPayments, setShowHiddenPayments] = useState(false);

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
            <div className="d-flex justify-content-between align-items-center bg-white p-3 border rounded">
              <div className="d-flex align-items-center">
                <Form.Check
                  className="me-3"
                  onChange={(e) => setShowEmptyAccounts(e.target.checked)}
                  type="switch"
                  id="custom-switch"
                  label="Empty"
                />
                <Form.Check
                  onChange={(e) => setShowHiddenPayments(e.target.checked)}
                  type="switch"
                  id="custom-switch"
                  label="Hidden"
                />
              </div>
              <div>
                <Button
                  style={{ width: "80px" }}
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
            </div>
          </Col>
        </Row>
        <Row>
          <Swiper
            cssMode={true}
            mousewheel={true}
            keyboard={true}
            slidesPerView={2}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
              },
              "@0.75": {
                slidesPerView: 2,
              },
              "@1.00": {
                slidesPerView: 3,
              },
              "@1.50": {
                slidesPerView: 5,
              },
            }}
            modules={[Mousewheel, Keyboard]}
          >
            <SwiperSlide>
              <div className="p-3">
                {accounts.length ? (
                  <>
                    <AccountBalances
                      accounts={accounts}
                      onUpdated={fetchAccounts}
                    />
                    {accounts
                      .map((account) => account.payments)
                      .flat()
                      .filter((payment) => payment.balance < 0)
                      .filter(
                        (payment) => showHiddenPayments || !payment.hidden
                      ).length ? (
                      <PaymentsCard
                        title="Alerts"
                        payments={accounts
                          .map((account) => account.payments)
                          .flat()
                          .filter((payment) => payment.balance < 0)}
                        accounts={accounts}
                        onDeleted={fetchAccounts}
                        onUpdated={fetchAccounts}
                        showHiddenPayments={showHiddenPayments}
                      />
                    ) : null}
                    {accounts
                      .map((account) => account.payments)
                      .flat()
                      .filter(
                        (payment) => moment(payment.date).diff(moment()) < 0
                      )
                      .filter(
                        (payment) => showHiddenPayments || !payment.hidden
                      ).length ? (
                      <PaymentsCard
                        title="Upcoming"
                        payments={accounts
                          .map((account) => account.payments)
                          .flat()
                          .filter(
                            (payment) => moment(payment.date).diff(moment()) < 0
                          )}
                        accounts={accounts}
                        onDeleted={fetchAccounts}
                        onUpdated={fetchAccounts}
                        showHiddenPayments={showHiddenPayments}
                      />
                    ) : null}
                  </>
                ) : null}
              </div>
            </SwiperSlide>
            {accounts
              .filter(
                (account) =>
                  showEmptyAccounts ||
                  account.payments.filter(
                    (payment) => showHiddenPayments || !payment.hidden
                  ).length
              )
              .map((account, index) => (
                <SwiperSlide key={account.id}>
                  <div className="p-3">
                    <AccountCard
                      account={account}
                      accounts={accounts}
                      onDeleted={fetchAccounts}
                      onUpdated={fetchAccounts}
                      showHiddenPayments={showHiddenPayments}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </Row>
      </Container>
    </>
  );
}

export default App;
