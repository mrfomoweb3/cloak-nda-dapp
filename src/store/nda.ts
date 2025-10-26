import { create } from "zustand"
import type { NDA } from "../types"

interface NDAStore {
  ndas: NDA[]
  selectedNDA: NDA | null
  loading: boolean
  error: string | null
  setNDAs: (ndas: NDA[]) => void
  setSelectedNDA: (nda: NDA | null) => void
  addNDA: (nda: NDA) => void
  updateNDA: (ndaId: string, updates: Partial<NDA>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useNDAStore = create<NDAStore>((set) => ({
  ndas: [],
  selectedNDA: null,
  loading: false,
  error: null,

  setNDAs: (ndas: NDA[]) => {
    set({ ndas })
  },

  setSelectedNDA: (nda: NDA | null) => {
    set({ selectedNDA: nda })
  },

  addNDA: (nda: NDA) => {
    set((state) => ({
      ndas: [...state.ndas, nda],
    }))
  },

  updateNDA: (ndaId: string, updates: Partial<NDA>) => {
    set((state) => ({
      ndas: state.ndas.map((nda) => (nda.ndaId === ndaId ? { ...nda, ...updates } : nda)),
    }))
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },
}))
