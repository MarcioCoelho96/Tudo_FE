import * as categories from "./categoryService";
import * as establishments from "./establishmentsServices";

export const DashboardService = {
  ...categories,
  ...establishments,
};

export type TDashboardService = typeof DashboardService;
