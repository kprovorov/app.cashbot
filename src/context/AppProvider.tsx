import { PropsWithChildren, useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }: PropsWithChildren) {
  const [showEmptyAccounts, setShowEmptyAccounts] = useState(false);
  const [projectionMonths, setProjectionMonths] = useState(12);

  return (
    <AppContext.Provider
      value={{
        showEmptyAccounts,
        setShowEmptyAccounts,
        projectionMonths,
        setProjectionMonths,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
