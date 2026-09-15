import api from "./api";
import { PageableDto, SortDto } from "./serviceTypes";

export interface LinesDto {
  id: string;
  description: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  itemId: string;
  reservationId: string;
}

export interface OrdersDto {
  id: string;
  establishmentId: string;
  customerId: string;
  status: string;
  totalAmount: number;
  currency: number;
  cartId: string;
  lines: LinesDto;
  createdAt: string;
}

export interface OrderListDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: OrdersDto;
  number: number;
  pageable: PageableDto;
  sort: SortDto;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const addOrderToCart = async (
  establishmentId: string,
): Promise<OrdersDto> => {
  const response = await api.post<OrdersDto>("/api/carts/current/checkout", {
    establishmentId,
  });

  return response.data;
};

export const getListOfOrders = async (
  page: number,
  size: number,
): Promise<OrderListDto> => {
  const response = await api.get<OrderListDto>("/api/orders", {
    params: { page, size },
  });

  return response.data;
};

export const getOrder = async (id: string): Promise<OrdersDto> => {
  const response = await api.get<OrdersDto>(`/api/orders/${id}`, {
    params: { id },
  });

  return response.data;
};
