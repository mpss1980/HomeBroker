import { Injectable } from '@nestjs/common';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletAssetsService {
  constructor(
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectModel(Wallet.name)
    private walletSchema: Model<Wallet>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  async create(createWalletAssetDto: CreateWalletAssetDto) {
    const session = await this.connection.startSession();
    await session.startTransaction();

    try {
      const docs = await this.walletAssetSchema.create(
        [
          {
            wallet: createWalletAssetDto.walletId,
            asset: createWalletAssetDto.assetId,
            shares: createWalletAssetDto.shares,
          }
        ],
        { session },
      );

      const walletAsset = docs[0];

      await this.walletSchema.updateOne(
        { _id: createWalletAssetDto.walletId },
        {
          $push: { assets: walletAsset._id },
        },
        {
          session,
        },
      );

      await session.commitTransaction();
      return walletAsset;
    } catch (e) {
      console.log(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
