import { Establishment, ServiceType } from "@/services/establishmentsServices";
import { useUserStore } from "@/store/userStore/userStore.store";
import { AddressData } from "@/store/userStore/userStore.types";
import { useState } from "react";
import { Region } from "react-native-maps";
import { DashboardService } from "../services";

// Define what this custom hook will return to your UI component
interface UseEstablishmentsReturn {
  establishments: Establishment[];
  isLoading: boolean;
  error: Error | null;
  fetchEstablishmentsNearby: (
    address: AddressData | null,
    location: Region | null,
  ) => Promise<void>;
}

export const useEstablishmentsNearby = (): UseEstablishmentsReturn => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const location = useUserStore((state) => state.location);
  const address = useUserStore((state) => state.address);

  const fetchEstablishmentsNearby = async (
    address: AddressData | null,
    location: Region | null,
  ) => {
    try {
      setIsLoading(true);
      const data = await DashboardService.getEstablishmentsNearby({
        address: address?.formattedAddress,
        lat: location?.latitude,
        lon: location?.longitude,
        radius: 100,
        type: ServiceType.CAFE,
      });
      setEstablishments(data);
    } catch (err) {
      // Cast or wrap the caught error so it matches the Error type
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchEstablishmentsNearby, establishments, isLoading, error };
};
