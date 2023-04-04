import AccountBalance from "./AccountBalance";
import { currencyFormat } from "../../services/formatters";
import Card from "../../common/components/ui/card/Card";
import CardHeader from "../../common/components/ui/card/CardHeader";
import CardTitle from "../../common/components/ui/card/CardTitle";
import { useAccountsQuery } from "../../api/accounts";
import { Currency } from "../../types/Enums";
import CreateAccountButton from "./Buttons/CreateAccountButton";
import AccountBalancesRow from "./AccountBalancesRow";

export default function AccountBalances() {
  const { data: accounts } = useAccountsQuery();

  return (
    <Card className="p-sm">
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
        <div className="font-bold">
          {accounts?.length
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
            <AccountBalancesRow key={account.id} account={account} />
          ))}
      </div>
      <CreateAccountButton />
    </Card>
  );
}
