import React, { createContext, useState } from 'react'

export const CellContext = createContext()

export const CellProvider = ({ children }) => {
  const [focusedCellId, setFocusedCellId] = useState(null)

  return <CellContext.Provider value={{ focusedCellId, setFocusedCellId }}>{children}</CellContext.Provider>
}
