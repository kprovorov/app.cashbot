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
                      showEmptyAccounts ? "bg-primary" : "bg-gray"
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
                className="hover:bg-gray-dark/5"
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
                          <svg
                            width="44"
                            height="44"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_508_807)">
                              <path
                                d="M14.6667 23.8333V8.25C14.6667 7.52065 14.9564 6.82118 15.4721 6.30546C15.9878 5.78973 16.6873 5.5 17.4167 5.5C18.146 5.5 18.8455 5.78973 19.3612 6.30546C19.8769 6.82118 20.1667 7.52065 20.1667 8.25V22"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20.1667 21.0833V17.4167C20.1667 17.0555 20.2378 16.6979 20.376 16.3643C20.5142 16.0306 20.7168 15.7275 20.9721 15.4721C21.2275 15.2168 21.5306 15.0142 21.8643 14.876C22.1979 14.7378 22.5555 14.6667 22.9167 14.6667C23.2778 14.6667 23.6354 14.7378 23.969 14.876C24.3027 15.0142 24.6058 15.2168 24.8612 15.4721C25.1166 15.7275 25.3191 16.0306 25.4573 16.3643C25.5955 16.6979 25.6667 17.0555 25.6667 17.4167V22"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M25.6667 19.25C25.6667 18.5207 25.9564 17.8212 26.4721 17.3055C26.9878 16.7897 27.6873 16.5 28.4167 16.5C29.146 16.5 29.8455 16.7897 30.3612 17.3055C30.8769 17.8212 31.1667 18.5207 31.1667 19.25V22"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M31.1667 21.0833C31.1667 20.354 31.4564 19.6545 31.9721 19.1388C32.4879 18.6231 33.1873 18.3333 33.9167 18.3333C34.646 18.3333 35.3455 18.6231 35.8612 19.1388C36.3769 19.6545 36.6667 20.354 36.6667 21.0833V29.3333C36.6667 32.2507 35.5077 35.0486 33.4448 37.1115C31.3819 39.1744 28.584 40.3333 25.6667 40.3333H22H22.3813C20.5596 40.3337 18.7663 39.8815 17.1625 39.0175C15.5587 38.1536 14.1946 36.9048 13.1927 35.3833C13.0724 35.2003 12.9526 35.017 12.8333 34.8333C12.2613 33.9552 10.2538 30.4553 6.809 24.332C6.45783 23.7078 6.36402 22.9712 6.54753 22.279C6.73105 21.5867 7.17741 20.9933 7.79167 20.625C8.44594 20.2324 9.21263 20.0697 9.96996 20.1627C10.7273 20.2557 11.4318 20.5991 11.9717 21.1383L14.6667 23.8333"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M39 7.5H26.1667"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M33.5 2L39 7.5L33.5 13"
                                stroke="#CBD5E1"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_508_807">
                                <rect width="44" height="44" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="text-center font-medium text-xl text-gray">
                            Swipe to see your payments
                          </div>
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
