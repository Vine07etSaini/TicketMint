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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedAddress = localStorage.getItem('ticketmint-walletAddress');
      if (storedAddress) {
        setIsConnected(true);
        setWalletAddress(storedAddress);
      }
    } catch (e) {
      console.error('Failed to access localStorage', e);
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

  if (!isClient) {
    return {
      isConnected: false,
      walletAddress: null,
      connectWallet,
      disconnectWallet,
    };
  }

  return { isConnected, walletAddress, connectWallet, disconnectWallet };
}
