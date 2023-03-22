import AccountForm from "../Forms/AccountForm";

export default function CreateAccountView({
  onCancel = () => {},
  onSuccess = () => {},
}: {
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  return (
    <div>
      <AccountForm onCancel={onCancel} onSuccess={onSuccess} />
    </div>
  );
}
