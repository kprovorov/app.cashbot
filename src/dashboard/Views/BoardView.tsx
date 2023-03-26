import moment from "moment";
import AccountBalances from "../../accounts/components/AccountBalances";
import AccountCard from "../../accounts/components/AccountCard";
import { useAccounts } from "../../api/accounts";
import PaymentsCard from "../../payments/components/PaymentsCard";

export default function BoardView({
  showEmptyAccounts = false,
}: {
  showEmptyAccounts?: boolean;
}) {
  const { data: accounts } = useAccounts();

  return (
    <div className="flex overflow-auto snap-x gap-x-4 px-4 scroll-px-4 w-full h-full">
      <div className="snap-center xs:snap-start">
        <div className="flex flex-col gap-6 w-96">
          {accounts ? (
            <>
              <AccountBalances />
              {accounts
                .flatMap((account) => account.payments || [])
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
                .flatMap((account) => account.payments || [])
                .filter((payment) => payment.date.isSameOrBefore(moment()))
                .length ? (
                <PaymentsCard
                  title="Upcoming"
                  payments={accounts
                    .flatMap((account) => account.payments || [])
                    .filter((payment) => payment.date.isSameOrBefore(moment()))}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      {accounts
        ?.filter((account) => showEmptyAccounts || account.payments?.length)
        .map((account) => (
          <div className="snap-center xs:snap-start">
            <AccountCard account={account} />
          </div>
        ))}
    </div>
  );
}
