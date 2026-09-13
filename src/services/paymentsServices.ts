import api from "./api";
import { PageableDto, SortDto } from "./serviceTypes";

export interface PaymentsListInput {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PaymentDto {
  id: string;
  establishmentId: string;
  customerId: string;
  orderId: string;
  reservationId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  providerReference: string;
  payerPhone: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface PaymentsListDto {
  totalElements: number;
  totalPages: number;
  size: number;
  content: PaymentDto;
  number: number;
  pageable: PageableDto;
  sort: SortDto;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface MakePaymentInput {
  orderId: string;
  method: string;
  payerPhone: string;
}

export const getPaymentsList = async ({
  page,
  size,
  sort,
}: PaymentsListInput): Promise<PaymentsListDto> => {
  const response = await api.get<PaymentsListDto>("/api/payments", {
    params: { page, size, sort },
  });

  return response.data;
};

export const makePayment = async ({
  method,
  orderId,
  payerPhone,
}: MakePaymentInput): Promise<PaymentDto> => {
  const response = await api.post<PaymentDto>("/api/payments", {
    orderId,
    method,
    payerPhone,
  });

  return response.data;
};

export const getPayment = async (id: string): Promise<PaymentDto> => {
  const response = await api.get(`/api/payments/${id}`, { params: { id: id } });

  return response.data;
};

export const getPaymentsFromEstablishment = async (
  estId: string,
  page: number,
  size: number,
  sort: string[],
): Promise<PaymentsListDto> => {
  const response = await api.get<PaymentsListDto>(
    `/api/establishments/${estId}/payments`,
    {
      params: { page, size, sort },
    },
  );

  return response.data;
};
