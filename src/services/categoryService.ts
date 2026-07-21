import api from "@/services/api";

export interface Category {
  key: string;
  label: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/api/categories");
  return response.data;
};
