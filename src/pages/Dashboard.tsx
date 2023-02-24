import React, { useCallback, useEffect, useState } from "react";
import Account from "../interfaces/Account";
import AccountCard from "../accounts/components/AccountCard";
import { Col, Row, Spinner } from "react-bootstrap";
import AccountBalances from "../accounts/components/AccountBalances";
import Form from "react-bootstrap/Form";
import TheHeader from "../common/components/TheHeader";
import Container from "react-bootstrap/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import PaymentsCard from "../payments/components/PaymentsCard";
import moment from "moment";
import { getDashboard } from "../api/dashboard";
import { Switch } from "@headlessui/react";
import Button from "../common/components/ui/buttons/Button";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);
  const [showHiddenPayments, setShowHiddenPayments] = useState(false);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    const res = await getDashboard();

    setAccounts(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <>
      <TheHeader onCreated={fetchDashboard} />
      <div className="tw-flex tw-flex-col">
        <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-6">
          <div className="tw-flex tw-items-center tw-gap-4">
            <Switch.Group>
              <div className="tw-flex tw-items-center tw-gap-2">
                <Switch
                  checked={showEmptyAccounts}
                  onChange={setShowEmptyAccounts}
                  className={`${
                    showEmptyAccounts ? "tw-bg-primary" : "tw-bg-slate-300"
                  } tw-relative tw-inline-flex tw-h-6 tw-w-11 tw-items-center tw-rounded-full`}
                >
                  <span
                    className={`${
                      showEmptyAccounts
                        ? "tw-translate-x-6"
                        : "tw-translate-x-1"
                    } tw-inline-block tw-h-4 tw-w-4 tw-transform tw-rounded-full tw-bg-white tw-transition`}
                  />
                </Switch>
                <Switch.Label>Empty</Switch.Label>
              </div>
            </Switch.Group>

            <Switch.Group>
              <div className="tw-flex tw-items-center tw-gap-2">
                <Switch
                  checked={showHiddenPayments}
                  onChange={setShowHiddenPayments}
                  className={`${
                    showHiddenPayments ? "tw-bg-primary" : "tw-bg-slate-300"
                  } tw-relative tw-inline-flex tw-h-6 tw-w-11 tw-items-center tw-rounded-full`}
                >
                  <span
                    className={`${
                      showHiddenPayments
                        ? "tw-translate-x-6"
                        : "tw-translate-x-1"
                    } tw-inline-block tw-h-4 tw-w-4 tw-transform tw-rounded-full tw-bg-white tw-transition`}
                  />
                </Switch>
                <Switch.Label>Hidden</Switch.Label>
              </div>
            </Switch.Group>
          </div>
          <div>
            <Button
              className="hover:tw-bg-slate-900/5"
              onClick={fetchDashboard}
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
        <div>
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
              <div className="tw-flex tw-flex-col tw-gap-4 tw-px-4 tw-pb-8">
                {accounts.length ? (
                  <>
                    <AccountBalances onUpdated={fetchDashboard} />
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
                        onDeleted={fetchDashboard}
                        onUpdated={fetchDashboard}
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
                        onDeleted={fetchDashboard}
                        onUpdated={fetchDashboard}
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
                  <div className="tw-px-4 tw-pb-8">
                    <AccountCard
                      account={account}
                      onDeleted={fetchDashboard}
                      onUpdated={fetchDashboard}
                      showHiddenPayments={showHiddenPayments}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
