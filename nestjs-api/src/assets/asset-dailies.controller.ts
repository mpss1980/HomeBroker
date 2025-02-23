import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssetDailiesService } from './asset-dailies.service';

@Controller('assets/:symbol/dailies')
export class AssetDailiesController {
  constructor(private readonly assetDailiesService: AssetDailiesService) {}

  @Post()
  create(
    @Body() dto: { date: string; price: number },
    @Param('symbol') symbol: string,
  ) {
    return this.assetDailiesService.create({
      symbol: symbol,
      date: new Date(dto.date),
      price: dto.price,
    });
  }

  @Get()
  findAll(@Param('symbol') symbol: string) {
    return this.assetDailiesService.findAll(symbol);
  }
}
