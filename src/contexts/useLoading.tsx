import React from 'react'

type Data = {
  value: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = React.createContext<Data>({} as Data)

export function useLoading() {
  const context = React.useContext(Context)

  if (!context)
    throw new Error('"useLoading" must be used within a "LoadingProvider"')

  return context
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState(false)

  return (
    <Context.Provider value={{ value, setValue }}>
      {children}
    </Context.Provider>
  )
}
