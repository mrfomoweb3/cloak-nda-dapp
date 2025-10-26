"use client"

import { useState } from "react"
import { WalletConnect } from "./components/WalletConnect"
import { CreatorDashboard } from "./components/CreatorDashboard"
import { CounterpartyInterface } from "./components/CounterpartyInterface"
import { AuditorPanel } from "./components/AuditorPanel"
import { useNDAStore } from "./store/nda"

type UserRole = "creator" | "counterparty" | "auditor"

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>("creator")
  const { error } = useNDAStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">CloakNDA</h1>
            <p className="text-sm text-slate-400">Confidential NDA Management with fhEVM</p>
          </div>
          <WalletConnect />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>}

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setActiveRole("creator")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeRole === "creator" ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Creator
          </button>
          <button
            onClick={() => setActiveRole("counterparty")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeRole === "counterparty"
                ? "bg-blue-500 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Counterparty
          </button>
          <button
            onClick={() => setActiveRole("auditor")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeRole === "auditor" ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Auditor
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 text-slate-100">
          {activeRole === "creator" && <CreatorDashboard />}
          {activeRole === "counterparty" && <CounterpartyInterface />}
          {activeRole === "auditor" && <AuditorPanel />}
        </div>
      </main>
    </div>
  )
}
