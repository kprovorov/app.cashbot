import Account from "../interfaces/Account";
import api from "../services/api";

export async function getDashboard(): Promise<Account[]> {
  const { data } = await api.get("dashboard");

  return data;
}
