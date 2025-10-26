"use client"

import type React from "react"

import { useState } from "react"
import { useWalletStore } from "../store/wallet"
import { useNDAStore } from "../store/nda"
import { createNDA, encryptData } from "../api/client"
import type { NDAForm } from "../types"

export function CreatorDashboard() {
  const { address } = useWalletStore()
  const { ndas, addNDA, setLoading, setError } = useNDAStore()
  const [formData, setFormData] = useState<NDAForm>({
    title: "",
    terms: "",
    counterpartyAddress: "",
    expirationDate: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateNDA = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      setError("Wallet not connected")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Encrypt NDA terms
      const { encrypted, encryptionKey } = await encryptData(formData.terms, "string")

      // Create NDA
      const result = await createNDA({
        title: formData.title,
        terms: formData.terms,
        counterpartyAddress: formData.counterpartyAddress,
        expirationDate: Number.parseInt(formData.expirationDate),
        createdBy: address,
      })

      // Add to store
      addNDA({
        ndaId: result.ndaId,
        title: formData.title,
        creator: address,
        counterparty: formData.counterpartyAddress,
        status: "DRAFT",
        createdAt: Date.now(),
        expirationDate: Number.parseInt(formData.expirationDate),
      })

      // Reset form
      setFormData({
        title: "",
        terms: "",
        counterpartyAddress: "",
        expirationDate: "",
      })

      console.log("[v0] NDA created successfully")
    } catch (error) {
      console.error("[v0] Failed to create NDA:", error)
      setError("Failed to create NDA")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create NDA</h2>
        <form onSubmit={handleCreateNDA} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">NDA Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter NDA title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
            <textarea
              name="terms"
              value={formData.terms}
              onChange={handleInputChange}
              placeholder="Enter NDA terms (will be encrypted)"
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Counterparty Address</label>
            <input
              type="text"
              name="counterpartyAddress"
              value={formData.counterpartyAddress}
              onChange={handleInputChange}
              placeholder="0x..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Expiration Date (Unix Timestamp)</label>
            <input
              type="number"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              placeholder="1735689600"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Create NDA
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Your NDAs</h3>
        <div className="space-y-2">
          {ndas.length === 0 ? (
            <p className="text-gray-500">No NDAs created yet</p>
          ) : (
            ndas.map((nda) => (
              <div key={nda.ndaId} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{nda.title}</h4>
                    <p className="text-sm text-gray-600">Status: {nda.status}</p>
                    <p className="text-sm text-gray-600">
                      Counterparty: {nda.counterparty.slice(0, 6)}...{nda.counterparty.slice(-4)}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{nda.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
