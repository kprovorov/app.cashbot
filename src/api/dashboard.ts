import { useQuery } from "react-query";
import Account from "../interfaces/Account";
import api from "../services/api";

export function useDashboard() {
  return useQuery<Account[]>(
    "dashboard",
    async () => (await api.get("dashboard")).data
  );
}
