import { create } from "zustand"
import type { WalletState } from "../types"

interface WalletStore extends WalletState {
  connect: () => Promise<void>
  disconnect: () => void
  setAddress: (address: string) => void
  setChainId: (chainId: number) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  isConnected: false,
  chainId: null,

  connect: async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      set({
        address: accounts[0],
        isConnected: true,
        chainId: Number.parseInt(chainId, 16),
      })

      console.log("[v0] Wallet connected:", accounts[0])
    } catch (error) {
      console.error("[v0] Wallet connection failed:", error)
      throw error
    }
  },

  disconnect: () => {
    set({
      address: null,
      isConnected: false,
      chainId: null,
    })
  },

  setAddress: (address: string) => {
    set({ address })
  },

  setChainId: (chainId: number) => {
    set({ chainId })
  },
}))
