import api from "../services/api";
import Group from "../interfaces/Group";

export async function getGroup(groupId: number): Promise<Group> {
  const { data } = await api.get(`groups/${groupId}`);

  return data;
}
