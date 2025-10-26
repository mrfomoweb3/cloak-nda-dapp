"use client"

import { useState } from "react"
import { useWalletStore } from "../store/wallet"
import { useNDAStore } from "../store/nda"
import { getNDA, signNDA } from "../api/client"
import type { NDA } from "../types"

export function CounterpartyInterface() {
  const { address } = useWalletStore()
  const { ndas, setNDAs, setLoading, setError } = useNDAStore()
  const [selectedNDA, setSelectedNDA] = useState<NDA | null>(null)
  const [ndaDetails, setNDADetails] = useState<any>(null)

  const handleViewNDA = async (nda: NDA) => {
    try {
      setLoading(true)
      setError(null)

      // Fetch decrypted NDA details
      const details = await getNDA(nda.ndaId, address || "", "")
      setNDADetails(details)
      setSelectedNDA(nda)
    } catch (error) {
      console.error("[v0] Failed to fetch NDA:", error)
      setError("Failed to fetch NDA details")
    } finally {
      setLoading(false)
    }
  }

  const handleSignNDA = async (ndaId: string) => {
    if (!address) {
      setError("Wallet not connected")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Sign NDA
      await signNDA(ndaId, address, "0x")

      // Update NDA status
      setNDAs(
        ndas.map((nda) => (nda.ndaId === ndaId ? { ...nda, status: "SIGNED" as const, signedAt: Date.now() } : nda)),
      )

      setSelectedNDA(null)
      setNDADetails(null)
      console.log("[v0] NDA signed successfully")
    } catch (error) {
      console.error("[v0] Failed to sign NDA:", error)
      setError("Failed to sign NDA")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending NDAs</h2>

      {selectedNDA && ndaDetails ? (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <button
            onClick={() => {
              setSelectedNDA(null)
              setNDADetails(null)
            }}
            className="text-blue-500 hover:text-blue-600 mb-4"
          >
            ← Back
          </button>

          <div>
            <h3 className="text-xl font-bold">{ndaDetails.title}</h3>
            <p className="text-sm text-gray-600">
              From: {ndaDetails.createdBy.slice(0, 6)}...{ndaDetails.createdBy.slice(-4)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded border">
            <h4 className="font-semibold mb-2">Terms & Conditions</h4>
            <p className="text-sm whitespace-pre-wrap">{ndaDetails.terms}</p>
          </div>

          <button
            onClick={() => handleSignNDA(selectedNDA.ndaId)}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
          >
            Sign NDA
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {ndas.filter((nda) => nda.status === "PENDING_SIGNATURE").length === 0 ? (
            <p className="text-gray-500">No pending NDAs</p>
          ) : (
            ndas
              .filter((nda) => nda.status === "PENDING_SIGNATURE")
              .map((nda) => (
                <div key={nda.ndaId} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{nda.title}</h4>
                      <p className="text-sm text-gray-600">
                        From: {nda.creator.slice(0, 6)}...{nda.creator.slice(-4)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleViewNDA(nda)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  )
}
