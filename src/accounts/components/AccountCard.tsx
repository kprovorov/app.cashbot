import { PropsWithChildren, useState } from "react";
import PaymentsList from "../../payments/components/PaymentsList";
import AccountBalance from "./AccountBalance";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";
import { currencyFormat } from "../../services/formatters";
import "./AccountCard.css";
import { Popover } from "@headlessui/react";
import { Account } from "../../types/Models";
import EditAccountModal from "./Modals/EditAccountModal";
import CreatePaymentModal from "../../payments/components/CreatePaymentModal";

export default function AccountCard({
  account,
}: PropsWithChildren<{
  account: Account;
}>) {
  const [showModal, setShowModal] = useState(false);
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);

  return (
    <>
      <Card>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex-grow flex items-center gap-2">
              <span
                onClick={() => setShowModal(true)}
                className="hover:text-primary cursor-pointer"
              >
                {account.name}
              </span>
              <span className="text-gray font-normal ">{account.currency}</span>
              <button
                className="border border-gray-light rounded-full hover:bg-gray-light flex items-center justify-center w-5 h-5 p-0 text-gray"
                onClick={() => setShowCreatePaymentModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </CardTitle>
            <div className="font-bold flex items-center gap-2">
              {!!account.balance_savings && (
                <div>
                  <Popover className="relative">
                    <Popover.Button
                      className={`${
                        account.balance_savings > account.balance
                          ? "bg-orange-light border-orange-dark hover:border-orange aria-expanded:border-orange text-orange aria-expanded:shadow-orange-dark/10"
                          : "bg-gray-light border-gray-light hover:border-gray aria-expanded:border-gray text-gray aria-expanded:shadow-gray-dark/10"
                      }  rounded-full py-1 px-2 text-sm flex items-center font-bold gap-1 border  outline-none aria-expanded:shadow`}
                    >
                      {account.balance_savings > account.balance ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 22"
                          className="w-3 h-3 fill-gray"
                        >
                          <path d="M19.7647 0C17.6471 0 15.8118 1.97647 15.5294 2.82353C10.5882 0.705882 0 2.4 0 9.88235C0 12.4235 0 14.1176 2.82353 16.2353V21.1765H8.47059V18.3529H12.7059V21.1765H18.3529V15.5294C19.7647 14.8235 20.7529 14.1176 21.1765 12.7059H24V7.05882H21.1765C21.1765 5.64706 20.4706 4.94118 19.7647 4.23529V0Z" />
                        </svg>
                      )}

                      {currencyFormat(
                        account.balance_savings,
                        account.currency
                      )}
                    </Popover.Button>

                    <Popover.Panel className="absolute z-10 w-48 left-1/2 -translate-x-1/2">
                      <div className="p-1 rounded bg-gray-light mb-2 flex flex-col relative top-2 shadow-lg shadow-gray-dark/10 border border-gray">
                        <div className="savings after:bg-gray">
                          {account.jars?.map((jar) => (
                            <div
                              key={`jar_${jar.id}`}
                              className="grid grid-cols-2 p-1"
                            >
                              <div className="font-semibold truncate">
                                {jar.name}
                              </div>
                              <div className="text-right">
                                {currencyFormat(jar.balance, jar.currency)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                </div>
              )}
              <div>
                <AccountBalance account={account} />
              </div>
            </div>
          </CardHeader>
        </div>
        <div>
          <PaymentsList account={account} />
        </div>
      </Card>
      {showCreatePaymentModal ? (
        <CreatePaymentModal
          show={showCreatePaymentModal}
          onClose={() => setShowCreatePaymentModal(false)}
          accountId={account.id}
        />
      ) : null}
      {showModal ? (
        <EditAccountModal
          show={showModal}
          onClose={() => setShowModal(false)}
          account={account}
        />
      ) : null}
    </>
  );
}
