import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";
import { useAccounts } from "../../api/accounts";

export default function AccountBalances() {
  const { data: accounts } = useAccounts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
        <div className="font-bold">
          {accounts
            ? currencyFormat(
                accounts
                  .filter((a) => a.parent_id === null)
                  .reduce(
                    (partialSum, account) =>
                      partialSum + (account.uah_balance || 0),
                    0
                  ),
                "UAH"
              )
            : null}
        </div>
      </CardHeader>
      <div>
        {accounts
          ?.filter((a) => a.parent_id === null)
          .map((account) => (
            <div
              key={account.id}
              className="p-2 grid grid-flow-col auto-cols-fr cursor-pointer items-center hover:bg-slate-50 rounded"
            >
              <div className="col-span-2 truncate font-semibold">
                {account.name}
              </div>

              <div className="text-end text-slate-400">
                <AccountBalance account={account} />
              </div>
              {account.uah_balance !== undefined && (
                <div className="text-end">
                  {currencyFormat(account.uah_balance, "UAH")}
                </div>
              )}
            </div>
          ))}
      </div>
    </Card>
  );
}
