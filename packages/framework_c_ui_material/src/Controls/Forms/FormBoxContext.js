import React from 'react'

export const FormBoxContext = React.createContext(
  {
    loading: false,
    readonly: false,
    sideEffects: {},
    debugMode: false
  }
)
