// src/providers/cornhole-store-provider.tsx
'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type CornholeStore, createCornholeStore } from '../stores/cornhole-store'

export type CornholeStoreApi = ReturnType<typeof createCornholeStore>

export const CornholeStoreContext = createContext<CornholeStoreApi | undefined>(
  undefined,
)

export interface CornholeStoreProviderProps {
  children: ReactNode
}

export const CornholeStoreProvider = ({
  children,
}: CornholeStoreProviderProps) => {
  const [store] = useState(() => createCornholeStore())
  return (
    <CornholeStoreContext.Provider value={store}>
      {children}
    </CornholeStoreContext.Provider>
  )
}

export const useCornholeStore = <T,>(
  selector: (store: CornholeStore) => T,
): T => {
  const cornholeStoreContext = useContext(CornholeStoreContext)
  if (!cornholeStoreContext) {
    throw new Error(`useCornholeStore must be used within CornholeStoreProvider`)
  }

  return useStore(cornholeStoreContext, selector)
}
