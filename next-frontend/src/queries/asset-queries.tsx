import { AssetDaily } from '@/models/asset-daily.model';
import { Asset } from '@/models/asset.model';

export async function getAssets(): Promise<Asset[]> {
  const response = await fetch(`http://localhost:3000/assets`);
  return response.json();
}

export async function getAssetsBySymbol(symbol: string): Promise<Asset> {
  const response = await fetch(`http://localhost:3000/assets/${symbol}`);
  return response.json();
}

export async function getAssetDailies(assetSymbol: string): Promise<AssetDaily[]> {
  const response = await fetch(`http://localhost:3000/assets/${assetSymbol}/dailies`);
  return response.json();
}