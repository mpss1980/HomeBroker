import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';
import { AssetsGateway } from './assets.gateway';
import {AssetDaily, AssetDailySchema} from "./entities/asset-daily.entity";
import {AssetDailiesController} from "./asset-dailies.controller";
import {AssetDailiesService} from "./asset-dailies.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      {
        name: AssetDaily.name,
        schema: AssetDailySchema,
      },
    ]),
  ],
  controllers: [AssetsController, AssetDailiesController],
  providers: [AssetsService, AssetDailiesService, AssetsGateway],
})
export class AssetsModule {}
