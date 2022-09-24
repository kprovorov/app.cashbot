import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import AccountsContext from "./context/AccountsContext";
import { getAccounts } from "./api/accounts";
import Account from "./interfaces/Account";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = useCallback(async () => {
    const res = await getAccounts();
    setAccounts(res);
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <AccountsContext.Provider value={{ accounts }}>
      <Dashboard />
    </AccountsContext.Provider>
  );
}

export default App;
