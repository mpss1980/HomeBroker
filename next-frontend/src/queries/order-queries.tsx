import { Order } from '@/models/order.model';

export async function getOrders(walletId: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:3000/orders?walletId=${walletId}`);
  return response.json();
}