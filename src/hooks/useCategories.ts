import { useEffect, useState } from "react";
import { DashboardService } from "../services";
import { Category } from "../services/categoryService"; // Import the type from your service file

// Define what this custom hook will return to your UI component
interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await DashboardService.getCategories();
        setCategories(data);
      } catch (err) {
        // Cast or wrap the caught error so it matches the Error type
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
