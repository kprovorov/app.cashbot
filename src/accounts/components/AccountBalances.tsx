import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";
import { useAccounts } from "../../api/accounts";
import { Currency } from "../../types/Enums";
import DashedButton from "../../common/components/ui/buttons/DashedButton";
import CreateAccountButton from "./Buttons/CreateAccountButton";

export default function AccountBalances() {
  const { data: accounts } = useAccounts();

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle>Balances</CardTitle>
        <div className="font-bold">
          {accounts
            ? currencyFormat(
                accounts
                  .filter((a) => a.parent_id === null)
                  .reduce(
                    (partialSum, account) =>
                      partialSum + account.balance_converted,
                    0
                  ),
                Currency.UAH
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
              <div className="text-end">
                {currencyFormat(account.balance_converted, Currency.UAH)}
              </div>
            </div>
          ))}
      </div>
      <CreateAccountButton />
    </Card>
  );
}
