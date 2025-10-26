"use client"

import { useEffect } from "react"
import { useWalletStore } from "../store/wallet"

export function WalletConnect() {
  const { address, isConnected, connect, disconnect } = useWalletStore()

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            useWalletStore.setState({
              address: accounts[0],
              isConnected: true,
            })
          }
        } catch (error) {
          console.error("[v0] Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("[v0] Connection failed:", error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {isConnected && address ? (
        <>
          <span className="text-sm text-gray-600">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button
            onClick={disconnect}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Connect Wallet
        </button>
      )}
    </div>
  )
}
