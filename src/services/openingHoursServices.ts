import api from "./api";
import { PageableDto, SortDto } from "./serviceTypes";

export interface OpeningHourDto {
  id?: string;
  day:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  opensAt: string; // "HH:mm" format
  closesAt: string; // "HH:mm" format
}

export interface OpeningHoursListDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: OpeningHourDto;
  number: number;
  pageable: PageableDto;
  sort: SortDto;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const updateOpeningHour = async (
  hourId: string,
  data: OpeningHourDto,
): Promise<OpeningHourDto> => {
  const response = await api.put<OpeningHourDto>(
    `/api/opening-hours/${hourId}`,
    data,
  );

  return response.data;
};

export const deleteOpeningHour = async (hourId: string): Promise<void> => {
  await api.delete(`/api/opening-hours/${hourId}`);
};

export const getEstablishmentsOpeningHours = async (
  estId?: string,
  page?: number,
  size?: number,
  sort?: string[],
): Promise<OpeningHoursListDto> => {
  const response = await api.get<OpeningHoursListDto>(
    `/api/establishments/${estId}/opening-hours`,
    { params: { size, sort, page } },
  );

  return response.data;
};

export const createOpeningHour = async (
  estId: string,
  data: OpeningHourDto,
): Promise<OpeningHourDto> => {
  const response = await api.post<OpeningHourDto>(
    `/api/establishments/${estId}/opening-hours`,
    data,
  );

  return response.data;
};
