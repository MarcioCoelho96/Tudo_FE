import api from "@/services/api";
export interface Establishment {
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

export enum ServiceType {
  RESTAURANT = "RESTAURANT",
  CAFE = "CAFE",
  LAUNDRY = "LAUNDRY",
}

export interface EstablishmentsNearbyInput {
  lat: number | undefined;
  lon: number | undefined;
  address: string | undefined;
  radius: number | undefined;
  type?: ServiceType | undefined;
}

export const getEstablishmentsNearby = async ({
  address,
  lat,
  lon,
  radius = 10,
  type,
}: EstablishmentsNearbyInput): Promise<Establishment[]> => {
  const response = await api.get<Establishment[]>(
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
