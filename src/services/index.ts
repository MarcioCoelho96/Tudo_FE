import * as categories from "./categoryService";
import * as establishmentsMembers from "./establishmentMembersServices";
import * as establishments from "./establishmentsServices";
import * as openingHours from "./openingHoursServices";
import * as orders from "./ordersServices";
import * as payments from "./paymentsServices";

export const DashboardServices = {
  ...establishmentsMembers,
  ...orders,
  ...openingHours,
  ...payments,
  ...categories,
  ...establishments,
};

export type TDashboardService = typeof DashboardServices;
