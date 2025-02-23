import { WalletAssets } from '@/models/wallet-assets.model';

export type Wallet = {
  _id: string;
  assets: WalletAssets[];
}