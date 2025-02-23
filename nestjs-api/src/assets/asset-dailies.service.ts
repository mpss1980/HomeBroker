import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Asset } from './entities/asset.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Observable } from 'rxjs';
import { AssetDaily } from './entities/asset-daily.entity';
import { CreateAsseDailyDto } from './dto/create-asset-daily.dto';

@Injectable()
export class AssetDailiesService {
  constructor(
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
  ) {}

  async create(createAssetDailyDto: CreateAsseDailyDto) {
    const asset = await this.assetSchema.findOne({
      symbol: createAssetDailyDto.symbol,
    });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return this.assetDailySchema.create({
      asset: asset._id,
      date: createAssetDailyDto.date,
      price: createAssetDailyDto.price,
    });
  }

  async findAll(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return this.assetDailySchema.find({ asset: asset._id }).sort({ date: 1 });
  }

  subscribeCreateEvents(): Observable<AssetDaily> {
    return new Observable((observer) => {
      this.assetDailySchema
        .watch(
          [
            {
              $match: {
                operationType: 'insert',
              },
            },
          ],
          { fullDocument: 'updateLookup' },
        )
        .on('change', async (data) => {
          const assetDaily = await this.assetDailySchema
            .findById(data.fullDocument._id)
            .populate('asset');
          observer.next(assetDaily! as AssetDaily & { asset: Asset });
        });
    });
  }
}
