import { useState } from "react";
import AccountCard from "../accounts/components/AccountCard";
import AccountBalances from "../accounts/components/AccountBalances";
import TheHeader from "../common/components/TheHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper";
import PaymentsCard from "../payments/components/PaymentsCard";
import moment from "moment";
import { Switch } from "@headlessui/react";
import Button from "../common/components/ui/buttons/Button";
import { useAccounts } from "../api/accounts";
import LoginForm from "../auth/components/LoginForm";
import { useCurrentUser } from "../api/auth";

function Dashboard() {
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

  const { data: accounts, isLoading, refetch } = useAccounts();
  const { data: user } = useCurrentUser();

  return (
    <>
      <TheHeader user={user} />
      <div className="flex flex-col">
        {user ? (
          <div>
            <div className="flex items-center justify-between px-4 py-6">
              <div className="flex items-center gap-4">
                <Switch.Group>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={showEmptyAccounts}
                      onChange={setShowEmptyAccounts}
                      className={`${
                        showEmptyAccounts ? "bg-primary" : "bg-slate-300"
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          showEmptyAccounts ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    <Switch.Label className="uppercase font-bold text-base">
                      Empty
                    </Switch.Label>
                  </div>
                </Switch.Group>
              </div>
              <div>
                <Button
                  className="hover:bg-slate-900/5"
                  onClick={() => refetch()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-6 h-6 ${isLoading ? "animate-spin" : null}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <Swiper
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                breakpoints={{
                  // "320": {
                  //   slidesPerView: 1,
                  // },
                  "560": {
                    slidesPerView: 2,
                  },
                  "840": {
                    slidesPerView: 3,
                  },
                  "1120": {
                    slidesPerView: 4,
                  },
                  "1400": {
                    slidesPerView: 5,
                  },
                  "1680": {
                    slidesPerView: 6,
                  },
                }}
                modules={[Mousewheel, Keyboard]}
              >
                <SwiperSlide>
                  <div className="flex flex-col gap-4 px-4 pb-8">
                    {accounts?.length ? (
                      <>
                        <AccountBalances />
                        {accounts
                          .map((account) => account.payments || [])
                          .flat()
                          .filter((payment) => payment.balance < 0).length ? (
                          <PaymentsCard
                            title="Alerts"
                            payments={accounts
                              .map((account) => account.payments || [])
                              .flat()
                              .filter((payment) => payment.balance < 0)}
                          />
                        ) : null}
                        {accounts
                          .map((account) => account.payments || [])
                          .flat()
                          .filter(
                            (payment) => moment(payment.date).diff(moment()) < 0
                          ).length ? (
                          <PaymentsCard
                            title="Upcoming"
                            payments={accounts
                              .map((account) => account.payments || [])
                              .flat()
                              .filter(
                                (payment) =>
                                  moment(payment.date).diff(moment()) < 0
                              )}
                          />
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </SwiperSlide>
                {accounts
                  ?.filter(
                    (account) => showEmptyAccounts || account.payments?.length
                  )
                  .map((account) => (
                    <SwiperSlide key={account.id}>
                      <div className="px-4 pb-8">
                        <AccountCard account={account} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <LoginForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
