import {Asset} from "@/models/asset.model";

export type AssetDaily = {
  _id: string;
  asset: Asset;
  date: string;
  price: number;
}