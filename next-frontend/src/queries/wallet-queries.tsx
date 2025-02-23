import { Wallet } from '@/models/wallet.model';

export async function getMyWallet(walletId: string): Promise<Wallet | null> {
  const response = await fetch(`http://localhost:3000/wallets/${walletId}`);
  if (!response.ok) return null;
  return response.json();
}

export async function getWallets(): Promise<Wallet[]> {
  const response = await fetch('http://localhost:3000/wallets');
  return response.json();
}