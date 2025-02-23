import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AssetsService } from './assets.service';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AssetPresenter } from './presenters/asset.presenter';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetDailyPresenter } from './presenters/asset-daily.presenter';
import { Asset } from './entities/asset.entity';

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  logger = new Logger('AssetsGateway');

  constructor(
    private readonly assetsService: AssetsService,
    private readonly assetDailiesService: AssetDailiesService,
  ) {}

  afterInit(server: Server): any {
    this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
      server
        .to(asset.symbol)
        .emit('assets/price-changed', new AssetPresenter(asset).toJSON());
    });
    this.assetDailiesService.subscribeCreateEvents().subscribe((assetDaily) => {
      server
        .to((assetDaily.asset as Asset).symbol)
        .emit(
          'assets/daily-created',
          new AssetDailyPresenter(assetDaily).toJSON(),
        );
    });
  }

  @SubscribeMessage('joinAssets')
  handleJoinAssets(client: any, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) {
      return;
    }
    payload.symbols.forEach((symbol) => client.join(symbol));
    this.logger.log(
      `Client ${client.id} joined asset: ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('joinAsset')
  handleJoinAsset(client: any, payload: { symbol: string }) {
    client.join(payload.symbol);
    this.logger.log(`Client ${client.id} joined asset: ${payload.symbol}`);
  }

  @SubscribeMessage('leaveAssets')
  leaveJoinAssets(client: any, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) {
      return;
    }
    payload.symbols.forEach((symbol) => client.leave(symbol));
    this.logger.log(
      `Client ${client.id} left asset: ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('leaveAsset')
  leaveJoinAsset(client: any, payload: { symbol: string }) {
    client.leave(payload.symbol);
    this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
  }
}
