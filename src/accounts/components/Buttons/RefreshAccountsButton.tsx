import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useAccountsQuery } from "../../../api/accounts";
import SecondaryButton from "../../../common/components/ui/buttons/SecondaryButton";

export default function RefreshAccountsButton() {
  const { isLoading, refetch, isRefetching } = useAccountsQuery();

  return (
    <SecondaryButton $size="sm" onClick={() => refetch()}>
      <ArrowPathIcon
        className={`w-6 h-6 ${isLoading || isRefetching ? "animate-spin" : ""}`}
      />
    </SecondaryButton>
  );
}
