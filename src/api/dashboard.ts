import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { BackendErrorResponse } from "../hooks/common";
import Account from "../interfaces/Account";
import api from "../services/api";

export const DASHBOARD_QUERY = "DASHBOARD_QUERY";

export function useDashboard() {
  return useQuery<Account[], AxiosError<BackendErrorResponse>>(
    DASHBOARD_QUERY,
    async () => (await api.get("dashboard")).data
  );
}
