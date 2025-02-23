'use client';

import {socket} from "@/socket-io";
import {useEffect} from "react";
import {Asset} from "@/models/asset.model";
import {useAssetStore} from "@/stores/asset-store";

export function AssetSync(props: {assetSymbols: string[]}) {
    const {assetSymbols} = props;
    const changeAsset = useAssetStore(state => state.changeAsset);
    useEffect(() => {
        socket.connect();
        socket.emit("joinAssets", { symbols: assetSymbols });
        socket.on("assets/price-changed", (asset: Asset) => {
            console.log(asset);
            changeAsset(asset);
        });

        return () => {
            socket.emit("leaveAssets", { symbols: assetSymbols });
            socket.off("assets/price-changed");
        };
    }, [assetSymbols, changeAsset]);
    return null;
}