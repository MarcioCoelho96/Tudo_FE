export interface PageableDto {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortDto;
  unpaged: boolean;
}

export interface SortDto {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export enum ServiceType {
  RESTAURANT = "RESTAURANT",
  CAFE = "CAFE",
  LAUNDRY = "LAUNDRY",
}

export enum PaymentMethodType {
  MBWAY = "MBWAY",
  CARD = "CARD",
}

export enum PaymentStatusType {
  PAYED = "PAYED",
  PENDING = "PENDING",
}
