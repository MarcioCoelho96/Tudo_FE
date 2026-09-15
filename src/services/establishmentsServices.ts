import api from "@/services/api";
import { PageableDto, ServiceType, SortDto } from "./serviceTypes";
export interface EstablishmentDto {
  id: string;
  name: string;
  description: string;
  type: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  reservationApprovalMode: string;
  coverImageUrl: string;
}

export interface EstablishmentsRequestDto {
  name: string;
  description: string;
  type: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  phone: string;
  reservationApprovalMode: string;
}

export interface EstablishmentsListDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: EstablishmentDto;
  number: number;
  pageable: PageableDto;
  sort: SortDto;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface EstablishmentsNearbyInput {
  lat: number | undefined;
  lon: number | undefined;
  address: string | undefined;
  radius: number | undefined;
  type?: ServiceType | undefined;
}

export const getEstablishment = async (
  id: string,
): Promise<EstablishmentDto> => {
  const response = await api.get<EstablishmentDto>(`/api/establishments/${id}`);

  return response.data;
};

export const updateEstablishment = async (
  id: string,
  data: EstablishmentsRequestDto,
): Promise<EstablishmentDto> => {
  const response = await api.put<EstablishmentDto>(
    `/api/establishments/${id}`,
    data,
  );

  return response.data;
};

export const getEstablishmentList = async (
  city: string,
  type: string,
  page?: number,
  size?: number,
  sort?: string[],
): Promise<EstablishmentsListDto> => {
  const response = await api.get<EstablishmentsListDto>("/api/establishments", {
    params: { city, type, page, size, sort },
  });

  return response.data;
};

export const createEstablishment = async (
  data: EstablishmentsRequestDto,
): Promise<EstablishmentDto> => {
  const response = await api.post<EstablishmentDto>(
    `/api/establishments`,
    data,
  );

  return response.data;
};

export const getEstablishmentsNearby = async ({
  address,
  lat,
  lon,
  radius = 10,
  type,
}: EstablishmentsNearbyInput): Promise<EstablishmentDto[]> => {
  const response = await api.get<EstablishmentDto[]>(
    "/api/establishments/nearby",
    {
      params: {
        address: address,
        lat: lat,
        lon: lon,
        radius: radius,
        type: type,
      },
    },
  );
  return response.data;
};
