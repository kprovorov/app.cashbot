import { Dispatch, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  showEmptyAccounts: boolean;
  setShowEmptyAccounts: Dispatch<SetStateAction<boolean>>;
  projectionMonths: number;
  setProjectionMonths: Dispatch<SetStateAction<number>>;
}>({
  showEmptyAccounts: false,
  setShowEmptyAccounts: () => {},
  projectionMonths: 12,
  setProjectionMonths: () => {},
});
