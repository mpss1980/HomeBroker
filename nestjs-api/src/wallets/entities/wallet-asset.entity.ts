import * as crypto from 'node:crypto';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Asset, AssetDocument } from '../../assets/entities/asset.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WalletDocument } from './wallet.entity';

export type WalletAssetDocument = HydratedDocument<WalletAsset>;

@Schema({ timestamps: true })
export class WalletAsset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: String, ref: 'Wallet' })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  createdAt!: Date;
  updatedAt!: Date;
}

export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);

WalletAssetSchema.index({ wallet: 1, asset: -1 }, { unique: true });
