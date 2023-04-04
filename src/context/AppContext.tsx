import React, { Dispatch, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  showEmptyAccounts: boolean;
  setShowEmptyAccounts: Dispatch<SetStateAction<boolean>>;
}>({
  showEmptyAccounts: false,
  setShowEmptyAccounts: () => {},
});
