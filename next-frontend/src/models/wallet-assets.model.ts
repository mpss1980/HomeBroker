import { Asset } from '@/models/asset.model';

export type WalletAsset = {
  _id: string;
  shares: number;
  asset: Asset;
}