import {
  Controller,
  Get,
  Post,
  Body,
  Param, NotFoundException,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletAssetsService } from './wallet-assets.service';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { WalletPresenter } from './presenters/wallet.presenter';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly walletAssetsService: WalletAssetsService,
  ) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);
   if (!wallet) {
     throw new NotFoundException('Wallet not found');
   }
   // @ts-ignore
    return new WalletPresenter(wallet)
  }

  @Post(':id/assets')
  createWalletAssets(
    @Param('id') id: string,
    @Body() body: { assetId: string; shares: number },
  ) {
    return this.walletAssetsService.create({
      walletId: id,
      assetId: body.assetId,
      shares: body.shares,
    });
  }
}
