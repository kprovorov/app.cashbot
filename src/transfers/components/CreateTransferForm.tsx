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
import { createTransfer, getRate } from "../../api/accounts";
import AccountsContext from "../../context/AccountsContext";
import Label from "../../common/components/ui/forms/Label";
import Input from "../../common/components/ui/forms/Input";

export default function CreateTransferForm({
  formId,
  onCreated,
}: PropsWithChildren<{
  formId: string;
  onCreated: () => void;
}>) {
  const { accounts } = useContext(AccountsContext);
  const [accountFrom, setAccountFrom] = useState<Account | undefined>();
  const [accountTo, setAccountTo] = useState<Account | undefined>();
  const [transferData, setTransferData] = useState<CreateTransferData>({
    date: "",
    amount: 0,
    rate: 0,
    jar_from_id: 0,
    jar_to_id: 0,
    repeat: "none",
    currency: "",
    description: "",
  });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createTransfer({
      ...transferData,
      amount:
        transferData.currency === accountFrom?.currency
          ? Math.round(transferData.amount * 100) / 100
          : Math.round(transferData.amount * transferData.rate * 100) / 100,
    });

    onCreated();
  };

  useEffect(() => {
    (async () => {
      if (accountFrom && accountTo) {
        const res = await getRate(accountFrom.currency, accountTo.currency);

        setTransferData({
          ...transferData,
          rate: res.rate,
          currency: accountFrom.currency,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountFrom, accountTo]);

  useEffect(() => {
    setAccountFrom(
      accounts.find((account) =>
        account.jars.map((jar) => jar.id).includes(transferData.jar_from_id)
      )
    );
    setAccountTo(
      accounts.find((account) =>
        account.jars.map((jar) => jar.id).includes(transferData.jar_to_id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferData.jar_from_id, transferData.jar_to_id]);

  return (
    <form id={formId} onSubmit={submit}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
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

        <div className="col-span-2">
          <Label>Rate</Label>
          <Input
            disabled
            type="number"
            placeholder="Rate"
            value={transferData.rate}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                rate: Number(e.target.value),
              });
            }}
          />
        </div>

        <div className="col-span-2">
          <Label>Repeat</Label>
          <Input
            $as="select"
            value={transferData.repeat}
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                repeat: e.target.value,
              });
            }}
          >
            <option value="none">none</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="quarterly">quarterly</option>
          </Input>
        </div>

        <div className="col-span-3">
          <Label>Jar from</Label>
          <Input
            $as="select"
            onChange={(e) => {
              setTransferData({
                ...transferData,
                jar_from_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) =>
              account.jars.map((jar) => (
                <option value={jar.id} key={jar.id}>
                  {account.name} ({jar.default ? "default" : jar.name}) —{" "}
                  {account.currency}
                </option>
              ))
            )}
          </Input>
        </div>

        <div className="col-span-3">
          <Label>Jar to</Label>
          <Input
            $as="select"
            onChange={(e) => {
              setTransferData({
                ...transferData,
                jar_to_id: Number(e.target.value),
              });
            }}
          >
            <option>Please select...</option>
            {accounts.map((account) =>
              account.jars.map((jar) => (
                <option value={jar.id} key={jar.id}>
                  {account.name} ({jar.default ? "default" : jar.name}) —{" "}
                  {account.currency}
                </option>
              ))
            )}
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
            value={
              Math.round(transferData.amount * transferData.rate * 100) / 100
            }
            onChange={(e): void => {
              setTransferData({
                ...transferData,
                amount: Number(e.target.value) / transferData.rate,
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
