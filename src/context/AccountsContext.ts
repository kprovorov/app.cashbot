import { createContext } from "react";
import Account from "../interfaces/Account";

export default createContext<{ accounts: Account[] }>({
  accounts: [],
});
