import React, {
  ChangeEvent,
  FormEvent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Account from "../../interfaces/Account";
import CreateTransferData from "../../interfaces/CreateTransferData";
import { createTransfer, getRate, useAccounts } from "../../api/accounts";
import AccountsContext from "../../context/AccountsContext";
import Label from "../../common/components/ui/forms/Label";
import Input from "../../common/components/ui/forms/Input";
import moment from "moment";
import { useCreateTransferMutation } from "../../api/payments";

export default function CreateTransferForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const { mutate } = useCreateTransferMutation();
  const { data: accounts } = useAccounts();
  const [rate, setRate] = useState(0);
  const [accountFrom, setAccountFrom] = useState<Account | undefined>();
  const [accountTo, setAccountTo] = useState<Account | undefined>();
  const [transferData, setTransferData] = useState<CreateTransferData>({
    date: "",
    amount: 0,
    account_from_id: 0,
    account_to_id: 0,
    repeat_unit: "none",
    currency: "",
    description: "",
    hidden: false,
    auto_apply: false,
    repeat_interval: 1,
    repeat_ends_on: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        ...transferData,
        amount:
          (transferData.currency === accountFrom?.currency
            ? Math.round(transferData.amount)
            : Math.round(transferData.amount * rate)) * 10000,
      },
      {
        onSuccess: onCreated,
      }
    );
  };

  useEffect(() => {
    (async () => {
      if (accountFrom && accountTo) {
        const res = await getRate(accountFrom.currency, accountTo.currency);

        setRate(res.rate);

        setTransferData({
          ...transferData,
          currency: accountFrom.currency,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFrom, accountTo]);

  useEffect(() => {
    setAccountFrom(
      accounts.find((account) => account.id === transferData.account_from_id)
    );
    setAccountTo(
      accounts.find((account) => account.id === transferData.account_to_id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferData.account_from_id, transferData.account_to_id]);

  return (
    <form id={formId} onSubmit={submit}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Label>Date</Label>
          <Input
            type="date"
            placeholder="Date"
            value={transferData.date}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                date: e.target.value,
              });
            }}
          />
        </div>

        <div className="col-span-3">
          <Label>Rate</Label>
          <Input
            disabled
            type="number"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>

        <div className="col-span-2">
          <Label>Repeat unit</Label>
          <Input
            $as="select"
            value={transferData.repeat_unit}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                repeat_unit: e.target
                  .value as CreateTransferData["repeat_unit"],
              });
            }}
          >
            <option value="none">never</option>
            <option value="day">daily</option>
            <option value="week">weekly</option>
            <option value="month">monthly</option>
            <option value="quarter">quarterly</option>
            <option value="year">yearly</option>
          </Input>
        </div>

        <div className="col-span-2">
          <Label>Repeat interval</Label>
          <Input
            disabled={transferData.repeat_unit === "none"}
            type="number"
            value={transferData.repeat_interval}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                repeat_interval: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="col-span-2">
          <Label>Repeat Ends</Label>
          <Input
            disabled={transferData.repeat_unit === "none"}
            type="date"
            value={moment(transferData.repeat_ends_on).format("YYYY-MM-DD")}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                repeat_ends_on: e.target.value,
              });
            }}
          />
        </div>

        <div className="col-span-3">
          <Label>Account from</Label>
          <Input
            $as="select"
            onChange={(e) => {
              setTransferData({
                ...transferData,
                account_from_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
        </div>

        <div className="col-span-3">
          <Label>Account to</Label>
          <Input
            $as="select"
            onChange={(e) => {
              setTransferData({
                ...transferData,
                account_to_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Input>
        </div>

        <div className="col-span-2">
          <Label>Amount From</Label>
          <Input
            type="number"
            placeholder="Amount From"
            value={Math.round(transferData.amount * 100) / 100}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                amount: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="col-span-2">
          <Label>Amount To</Label>
          <Input
            type="number"
            placeholder="Amount To"
            value={Math.round(transferData.amount * rate * 100) / 100}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                amount: Number(e.target.value) / rate,
              });
            }}
          />
        </div>

        <div className="col-span-2">
          <Label>Fix currency</Label>
          <Input
            $as="select"
            disabled={
              !accountFrom ||
              !accountTo ||
              accountFrom?.currency === accountTo?.currency
            }
            value={transferData.currency}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                currency: e.target.value,
              });
            }}
          >
            {accountFrom && (
              <option value={accountFrom.currency}>
                {accountFrom.currency}
              </option>
            )}
            {accountTo && (
              <option value={accountTo.currency}>{accountTo.currency}</option>
            )}
          </Input>
        </div>

        <div className="col-span-6">
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="Description"
            value={transferData.description}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                description: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </form>
  );
}
