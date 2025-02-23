import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { Asset } from '../assets/entities/asset.entity';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private walletSchema: Model<Wallet>) {
  }

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id).populate([
      {
        path: 'assets',
        populate: ['asset'],
      }
    ]) as Promise<(Wallet & { assets: (WalletAsset & { asset: Asset})[] }) | null>;
  }
}
