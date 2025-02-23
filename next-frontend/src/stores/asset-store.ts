import {Asset} from "@/models/asset.model";
import {create} from "zustand/react";

export type AssetStore = {
    assets: Asset[];
    changeAsset: (asset: Asset) => void;
}

export const useAssetStore = create<AssetStore>((set) => ({
    assets: [],
    changeAsset: (asset: Asset) => set((state) => {
        const assetIndex = state.assets.findIndex(a => a.symbol === asset.symbol);
        if (assetIndex === -1) {
            return {
                assets: [...state.assets, asset],
            }
        }

        const newAssets = [...state.assets];
        newAssets[assetIndex] = asset;
        return {assets: newAssets};
    }),
}));