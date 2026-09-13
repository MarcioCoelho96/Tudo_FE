import api from "./api";

export interface MembersDataDto {
  userId: string;
  phoneNumber: string;
  role: string;
}

export interface AddMemberDto {
  userId: string;
  role: "MANAGER" | "STAFF";
}

export const getEstablishmentMembers = async (
  estId: string,
): Promise<MembersDataDto[]> => {
  const response = await api.get<MembersDataDto[]>(
    `/api/establishments/${estId}/members`,
  );

  return response.data;
};

export const addEstablishmentMember = async (
  estId: string,
  data: AddMemberDto,
): Promise<MembersDataDto> => {
  const response = await api.post<MembersDataDto>(
    `/api/establishments/${estId}/members`,
    data,
  );

  return response.data;
};

export const removeEstablishmentMember = async (
  estId: string,
  userId: string,
): Promise<void> => {
  await api.delete(`/api/establishments/${estId}/members/${userId}`);
};
