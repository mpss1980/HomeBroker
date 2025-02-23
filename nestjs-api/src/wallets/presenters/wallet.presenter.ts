import { Wallet } from '../entities/wallet.entity';
import { WalletAsset } from '../entities/wallet-asset.entity';
import { Asset } from '@nestjs/cli/lib/configuration';
import { AssetPresenter } from '../../assets/presenters/asset.presenter';

export class WalletPresenter {
  constructor(
    private wallet: Wallet & { assets: (WalletAsset & { asset: Asset })[] },
  ) {}

  toJSON() {
    return {
      _id: this.wallet._id,
      assets: this.wallet.assets.map((walletAsset) => {
        // @ts-ignore
        const assetPresenter = new AssetPresenter(walletAsset.asset);
        return {
          asset: assetPresenter.toJSON(),
          shares: walletAsset.shares,
        };
      }),
    };
  }
}
