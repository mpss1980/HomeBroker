'use client';

import {Button, TableCell, TableRow} from "flowbite-react";
import {AssetShow} from "@/components/AssetShow";
import Link from "next/link";
import {useAssetStore} from "@/stores/asset-store";
import {useShallow} from "zustand/react/shallow";
import {Asset} from "@/models/asset.model";

export function TableAssetRow(props: { asset: Asset, walletId: string }) {
    const {asset, walletId} = props;
    const assetFound = useAssetStore(
        useShallow((state) =>
            state.assets.find((a) => a.symbol === asset.symbol)
        ),
    );

    const assetInUse = assetFound || asset;

    return (
        <TableRow>
            <TableCell>
                <AssetShow asset={assetInUse}/>
            </TableCell>
            <TableCell>R$ {assetInUse.price}</TableCell>
            <TableCell>
                <Button className="w-fit" color="light" as={Link}
                        href={`/assets/${asset.symbol}?wallet_id=${walletId}`}>
                    Comprar/Vender
                </Button>
            </TableCell>
        </TableRow>
    );
}