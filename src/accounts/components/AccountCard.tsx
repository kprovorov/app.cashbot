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
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateAccountModal from "./Modals/CreateAccountModal";
import Button from "../../common/components/ui/buttons/Button";
import CreateButton from "../../common/components/ui/buttons/CreateButton";

export default function AccountCard({
  account,
}: PropsWithChildren<{
  account: Account;
}>) {
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  return (
    <>
      <Card>
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex-grow flex items-center gap-2">
              <span
                onClick={() => setEditAccount(account)}
                className="hover:text-primary cursor-pointer"
              >
                {account.name}
              </span>
              <span className="text-gray font-normal ">{account.currency}</span>
            </CardTitle>
            <div className="font-bold flex items-center gap-2">
              {account.jars?.length && account.jars?.length > 0 ? (
                <div>
                  <Popover className="relative">
                    <Popover.Button
                      className={`${
                        account.balance_savings > account.balance
                          ? "bg-orange-lightest border-orange hover:border-orange aria-expanded:border-orange text-orange aria-expanded:shadow-orange-dark/20"
                          : "bg-gray-lightest border-gray-light hover:border-gray aria-expanded:border-gray text-gray aria-expanded:shadow-gray-dark/20"
                      } rounded-full h-6 px-2 text-sm flex items-center font-bold gap-1 border  outline-none aria-expanded:shadow`}
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
                      <div className="p-sm rounded bg-gray-lightest flex flex-col relative top-2 shadow-lg shadow-gray-dark/10 border border-gray">
                        <div className="savings after:bg-gray">
                          {account.jars?.map((jar) => (
                            <div
                              key={`jar_${jar.id}`}
                              className="grid grid-cols-2 p-sm"
                            >
                              <button
                                className="font-semibold truncate capitalize hover:text-primary flex justify-start"
                                onClick={() => setEditAccount(jar)}
                              >
                                {jar.name}
                              </button>
                              <div className="text-right">
                                {currencyFormat(jar.balance, jar.currency)}
                              </div>
                            </div>
                          ))}
                          <hr className="text-gray-light my-2"></hr>
                          <CreateButton
                            $size="xs"
                            className="w-full p-2"
                            onClick={() => setShowCreateAccountModal(true)}
                          >
                            Add jar
                          </CreateButton>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreateAccountModal(true)}
                  className="w-6 h-6 bg-gray-lightest border-gray-light hover:border-gray text-gray rounded-full text-sm flex items-center justify-center font-bold gap-1 border outline-none"
                >
                  <PlusIcon className="w-4 h-4 fill-gray" />
                </button>
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
      {showCreateAccountModal ? (
        <CreateAccountModal
          show={showCreateAccountModal}
          onClose={() => setShowCreateAccountModal(false)}
          parent={account}
        />
      ) : null}
      {editAccount ? (
        <EditAccountModal
          show={!!editAccount}
          onClose={() => setEditAccount(null)}
          account={editAccount}
        />
      ) : null}
    </>
  );
}
