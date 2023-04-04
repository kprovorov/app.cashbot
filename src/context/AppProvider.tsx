import { PropsWithChildren, useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }: PropsWithChildren) {
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);

  return (
    <AppContext.Provider value={{ showEmptyAccounts, setShowEmptyAccounts }}>
      {children}
    </AppContext.Provider>
  );
}
