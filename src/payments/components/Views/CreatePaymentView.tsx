import CreatePaymentForm from "../CreatePaymentForm";

export default function CreatePaymentView({
  onCancel = () => {},
  onCreated = () => {},
}: {
  onCreated?: () => void;
  onCancel?: () => void;
}) {
  return <CreatePaymentForm onCreated={onCreated} onCancel={onCancel} />;
}
