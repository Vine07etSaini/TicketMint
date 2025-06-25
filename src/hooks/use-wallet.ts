'use client';

import { useState, useEffect, useCallback } from 'react';

type WalletState = {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

export function useWallet(): WalletState {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem('ticketmint-walletAddress');
    if (storedAddress) {
      setIsConnected(true);
      setWalletAddress(storedAddress);
    }
  }, []);

  const connectWallet = useCallback(() => {
    const dummyAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    localStorage.setItem('ticketmint-walletAddress', dummyAddress);
    setWalletAddress(dummyAddress);
    setIsConnected(true);
  }, []);

  const disconnectWallet = useCallback(() => {
    localStorage.removeItem('ticketmint-walletAddress');
    setWalletAddress(null);
    setIsConnected(false);
  }, []);

  return { isConnected, walletAddress, connectWallet, disconnectWallet };
}
