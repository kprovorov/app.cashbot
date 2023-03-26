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
import { useCurrentUser } from "../api/auth";

function Dashboard() {
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

  const { data: accounts, isLoading, refetch } = useAccounts();
  const { data: user } = useCurrentUser();

  return (
    <>
      <TheHeader user={user} />
      <div className="flex flex-col">
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
                "640": {
                  slidesPerView: 2,
                },
                "960": {
                  slidesPerView: 3,
                },
                "1280": {
                  slidesPerView: 4,
                },
                "1600": {
                  slidesPerView: 5,
                },
                "1920": {
                  slidesPerView: 6,
                },
              }}
              modules={[Mousewheel, Keyboard]}
            >
              <SwiperSlide>
                <div className="flex flex-col gap-4 px-4 pb-8">
                  {accounts ? (
                    <>
                      <AccountBalances />
                      {accounts
                        .flatMap((account) => account.payments || [])
                        .filter((payment) => payment.balance < 0).length ? (
                        <PaymentsCard
                          title="Alerts"
                          payments={accounts
                            .flatMap((account) => account.payments || [])
                            .filter((payment) => payment.balance < 0)}
                        />
                      ) : null}
                      {accounts
                        .flatMap((account) => account.payments || [])

                        .filter(
                          (payment) => moment(payment.date).diff(moment()) < 0
                        ).length ? (
                        <PaymentsCard
                          title="Upcoming"
                          payments={accounts
                            .flatMap((account) => account.payments || [])
                            .filter(
                              (payment) =>
                                moment(payment.date).diff(moment()) < 0
                            )}
                        />
                      ) : null}
                      {accounts.flatMap((account) => account.payments || [])
                        .length ? (
                        <div className="w-full pt-6 flex flex-col items-center gap-4 sm:hidden">
                          <div className="text-center font-semibold text-xl text-slate-300">
                            Swipe to see your payments
                          </div>
                          <svg
                            width="78"
                            height="29"
                            viewBox="0 0 78 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="fill-slate-300"
                              d="M2.46935 19.3339C1.65573 19.5108 0.302145 19.2818 0.332366 18.2194C0.365012 17.1213 1.90493 16.5138 2.75684 16.3294C24.1151 11.6809 46.2696 11.0783 67.8471 14.5144C66.8747 13.5369 65.9024 12.5596 64.9239 11.5867C62.3454 9.00281 59.869 6.00749 56.8453 3.92899C54.8252 2.5316 58.7694 0.228797 60.2353 1.23726C63.6759 3.61274 66.4855 6.8818 69.4267 9.82423C70.9813 11.3784 72.5299 12.9362 74.0844 14.4903C75.166 15.569 77.8289 17.3052 77.3235 19.0648C76.8325 20.7801 74.5862 21.2795 73.1213 21.7515C71.0209 22.4226 68.9245 23.0995 66.8179 23.7746C62.4202 25.1844 58.0166 26.598 53.6194 28.0081C52.837 28.2595 51.2771 28.466 50.9152 27.4357C50.569 26.4294 51.9294 25.5603 52.6837 25.3181C56.2827 24.1614 59.8819 23.0051 63.4809 21.8485C65.1801 21.3012 66.8797 20.7537 68.5826 20.2125C69.4876 19.9244 70.3821 19.6342 71.2871 19.3461C71.6561 19.2264 72.0194 19.1099 72.3884 18.9902C72.3032 18.899 72.2142 18.802 72.1234 18.7152C49.139 14.1361 25.3735 14.3504 2.4698 19.3335L2.46935 19.3339Z"
                            />
                          </svg>
                        </div>
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
      </div>
    </>
  );
}

export default Dashboard;
