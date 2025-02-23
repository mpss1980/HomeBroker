import {Table, TableBody, TableHead, TableHeadCell} from 'flowbite-react';
import {WalletList} from '@/components/WalletList';
import {getMyWallet} from '@/queries/wallet-queries';
import {AssetSync} from "@/components/AssetSync";
import {TableWalletAssetRow} from "@/app/TableWalletAssetRow";

export default async function MyWalletPage({searchParams}: {
    searchParams: Promise<{ wallet_id: string }>;
}) {
    const {wallet_id} = await searchParams;

    if (!wallet_id) {
        return <WalletList/>;
    }

    const wallet = await getMyWallet(wallet_id);

    if (!wallet) {
        return <WalletList/>;
    }

    return (
        <div className="flex flex-col space-y-5 flex-grow">
            <article className="format">
                <h1>Minha carteira</h1>
            </article>
            <div className="overflow-x-auto w-full">
                <Table className="w-full max-w-full table-fixed">
                    <TableHead>
                        <TableHeadCell>Ativo</TableHeadCell>
                        <TableHeadCell>Cotação</TableHeadCell>
                        <TableHeadCell>Quantidade</TableHeadCell>
                        <TableHeadCell>Comprar/Vender</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {wallet.assets.map((walletAsset, index) => (
                            <TableWalletAssetRow
                                key={index}
                                walletAsset={walletAsset}
                                walletId={wallet_id}/>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AssetSync assetSymbols={wallet.assets.map(
                (walletAsset) => walletAsset.asset.symbol)
            }/>
        </div>
    );
}
