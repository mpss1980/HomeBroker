import { Asset } from '@nestjs/cli/lib/configuration';
import { Order } from '../entities/order.entity';
import { AssetPresenter } from '../../assets/presenters/asset.presenter';

export class OrderPresenter {
  constructor(
    private order: Order & {  asset: Asset }
  ) {}

  toJSON() {
    // @ts-ignore
    const assetPresenter = new AssetPresenter(this.order.asset);
    return {
      _id: this.order._id,
      asset: assetPresenter.toJSON(),
      shares: this.order.shares,
      partial: this.order.partial,
      price: this.order.price,
      type: this.order.type,
      status: this.order.status,
    };
  }
}
