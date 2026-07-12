import * as categories from "./categoryService";

export const DashboardService = {
  ...categories,
};

export type TDashboardService = typeof DashboardService;
