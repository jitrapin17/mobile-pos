export type DeliveryStatus = 'pending' | 'cooking' | 'waitRider' | 'rider' | 'success';
export type PaymentType = 'online' | 'cod';
export type OrderAction = 'viewSlip' | 'selectRider' | 'completeDelivery' | 'none';

export type DeliveryOrder = {
  id: string;
  date: string;
  time: string;
  customerName: string;
  itemCount: string;
  paymentType: PaymentType;
  amount: string;
  status: DeliveryStatus;
  action: OrderAction;
  progress?: number;
};
