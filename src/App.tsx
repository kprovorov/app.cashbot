import React, { useEffect, useState } from "react";
import "./App.scss";
import Account from "./interfaces/Account";
import { getAccounts } from "./api/accounts";
import AccountCard from "./AccountCard";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import AccountBalances from "./accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";
import TheHeader from "./common/components/TheHeader";
import Container from "react-bootstrap/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

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
                  <AccountBalances accounts={accounts} />
                ) : null}
              </div>
            </SwiperSlide>
            {accounts
              .filter((account) => showEmptyAccounts || account.payments.length)
              .map((account, index) => (
                <SwiperSlide key={account.id}>
                  <div className="p-3">
                    <AccountCard
                      account={account}
                      accounts={accounts}
                      onDeleted={fetchAccounts}
                      onUpdated={fetchAccounts}
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
