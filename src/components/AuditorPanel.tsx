"use client"

import { useState } from "react"
import { useWalletStore } from "../store/wallet"
import { useNDAStore } from "../store/nda"
import { grantAuditorAccess } from "../api/client"

export function AuditorPanel() {
  const { address } = useWalletStore()
  const { ndas, setLoading, setError } = useNDAStore()
  const [selectedNDAId, setSelectedNDAId] = useState<string | null>(null)

  const handleGrantAccess = async (ndaId: string) => {
    if (!address) {
      setError("Wallet not connected")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const nda = ndas.find((n) => n.ndaId === ndaId)
      if (!nda) {
        setError("NDA not found")
        return
      }

      await grantAuditorAccess(ndaId, address, nda.creator)
      console.log("[v0] Auditor access granted")
      setSelectedNDAId(null)
    } catch (error) {
      console.error("[v0] Failed to grant access:", error)
      setError("Failed to grant auditor access")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Audit Dashboard</h2>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          As an auditor, you can request access to NDAs for verification purposes.
        </p>
      </div>

      <div className="space-y-2">
        {ndas.filter((nda) => nda.status === "SIGNED").length === 0 ? (
          <p className="text-gray-500">No signed NDAs available for audit</p>
        ) : (
          ndas
            .filter((nda) => nda.status === "SIGNED")
            .map((nda) => (
              <div key={nda.ndaId} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{nda.title}</h4>
                    <p className="text-sm text-gray-600">
                      Creator: {nda.creator.slice(0, 6)}...{nda.creator.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Counterparty: {nda.counterparty.slice(0, 6)}...{nda.counterparty.slice(-4)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleGrantAccess(nda.ndaId)}
                    className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-sm"
                  >
                    Request Access
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  )
}
