import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { WalletAsset, WalletAssetSchema } from './entities/wallet-asset.entity';
import { WalletAssetsService } from './wallet-assets.service';

@Module({
  controllers: [WalletsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: WalletAsset.name,
        schema: WalletAssetSchema,
      },
    ]),
  ],
  providers: [WalletsService, WalletAssetsService],
})
export class WalletsModule {}
