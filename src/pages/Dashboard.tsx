import { useState } from "react";
import BoardView from "../dashboard/Views/BoardView";
import Subheader from "../common/components/Subheader";

export default function Dashboard() {
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

  return (
    <div className="flex flex-col items-stretch gap-4 py-4">
      <Subheader
        showEmptyAccounts={showEmptyAccounts}
        setShowEmptyAccounts={setShowEmptyAccounts}
      />
      <BoardView showEmptyAccounts={showEmptyAccounts} />
    </div>
  );
}
