import { useCreateAccountMutation } from "../../../api/accounts";
import AccountForm from "../Forms/AccountForm";
import { Account } from "../../../types/Models";
import Info from "../../../common/components/Info";
import { Currency } from "../../../types/Enums";

export default function CreateAccountView({
  parent,
  onSuccess = () => {},
}: {
  parent?: Account;
  onSuccess?: () => void;
}) {
  const { mutate: createAccount, isLoading } = useCreateAccountMutation();

  return (
    <div className="flex flex-col p-6 gap-6">
      {parent ? (
        <Info>
          <span>
            Jar is a virtual savings account inside of your «parent» account{" "}
            <span className="font-semibold"> {parent.name}</span>
          </span>
        </Info>
      ) : null}
      <AccountForm
        initialValues={{
          name: "",
          balance: 0,
          currency: parent?.currency || Currency.EUR,
          parent_id: parent?.id,
        }}
        isLoading={isLoading}
        onSubmit={createAccount}
        onSuccess={onSuccess}
        parent={parent}
      />
    </div>
  );
}
