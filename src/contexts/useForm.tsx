import React from 'react'

export interface Field {
  name: string
  placeholder: string
  next?: string
  _value: string
  value: string
  blur: () => void
  clear: () => void
  focus: () => void
  reset: () => void
  valid: () => boolean
}

export interface Fields {
  [key: string]: Field
  [Symbol.iterator](): IterableIterator<Field>
}

export interface Data {
  fields: Fields
  getFieldByName: (key: string) => Field
  getFieldValue: (key: string, defaultValue?: string) => string
  setFieldValue: (key: string, value: string) => void
  registerField: (key: string, field: Field) => void
}

const Context = React.createContext({} as Data)

export function useField(key: string) {
  const context = React.useContext(Context)

  if (!context)
    throw new Error('"useField" must be used within a "FormProvider"')

  const getValue = React.useCallback((defaultValue?: string) => {
    return context.getFieldValue(key, defaultValue)
  }, [])

  const setValue = React.useCallback((newValue: string) => {
    context.setFieldValue(key, newValue)
  }, [])

  const register = React.useCallback((field: Field) => {
    context.registerField(key, field)
  }, [])

  return {
    getValue,
    setValue,
    register
  }
}

export function useForm() {
  const context = React.useContext(Context)

  if (!context)
    throw new Error('"useForm" must be used within a "FormProvider"')

  return context
}

export function FormProvider({ children }: React.PropsWithChildren) {
  const fields = React.useRef<Fields>({
    [Symbol.iterator]: function*() {
      for (const key in this)
        yield this[key]
    }
  })

  const getFieldByName = React.useCallback((key: string) => {
    return fields.current[key]
  }, [])

  const getFieldValue = React.useCallback((key: string, defaultValue?: string) => {
    return fields.current[key].value ?? defaultValue
  }, [])

  const setFieldValue = React.useCallback((key: string, newValue: string) => {
    fields.current[key].value = newValue
  }, [])

  const registerField = React.useCallback((key: string, field: Field) => {
    fields.current[key] = field
  }, [])

  return (
    <Context.Provider value={{
      fields: fields.current,
      getFieldByName,
      getFieldValue,
      setFieldValue,
      registerField
    }}>
      {children}
    </Context.Provider>
  )
}
