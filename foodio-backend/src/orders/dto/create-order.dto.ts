// src/orders/dto/create-order.dto.ts
export class CreateOrderDto {
  totalPrice: number;
  user: any;
  items: { menuItemId: number; quantity: number; price: number }[]; 
}