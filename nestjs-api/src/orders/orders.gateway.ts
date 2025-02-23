import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { OrdersService } from './orders.service';
import { Order, OrderType } from './entities/order.entity';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private readonly ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(
    client: any,
    payload: {
      assetId: string;
      walletId: string;
      type: OrderType;
      shares: number;
      price: number;
    },
  ): Promise<Order> {
    return await this.ordersService.create({
      assetId: payload.assetId,
      walletId: payload.walletId,
      type: payload.type,
      shares: payload.shares,
      price: payload.price,
    });
  }
}