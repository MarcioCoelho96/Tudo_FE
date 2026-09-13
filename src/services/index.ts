import * as categories from "./categoryService";
import * as establishmentsMembers from "./establishmentMembersServices";
import * as establishments from "./establishmentsServices";
import * as orders from "./ordersServices";
import * as payments from "./paymentsServices";

export const DashboardServices = {
  ...categories,
  ...establishments,
  ...establishmentsMembers,
  ...orders,
  ...payments,
};

export type TDashboardService = typeof DashboardServices;
