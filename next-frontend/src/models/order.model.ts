import { Asset } from '@/models/asset.model';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED',
}

export type Order = {
  _id: string;
  asset: Asset;
  shares: number;
  partial: number;
  price: number;
  type: OrderType;
  status: OrderStatus;
}