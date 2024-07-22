
import { isUndefined } from '@geisonjr/typefy'
import React from 'react'

export type ID = string
export type Display = string
export type Value = any
export type Props = {
  defaultDisplay?: Display
  defaultValue?: Value
  required?: boolean
}

export interface Field {
  id: ID
  name: string
  _display: Display
  display: Display
  props: Props
  value: Value
  blur: () => void
  clear: () => void
  focus: () => void
  reset: () => void
  valid: () => boolean
}

export interface Fields {
  [id: ID]: Field
  [Symbol.iterator](): IterableIterator<Field>
}

export interface FormContextReturn {
  fields: Fields
  getField: (id: ID) => Field
  getFieldDisplay: (id: ID) => Display
  getFieldProps: (id: ID) => Props
  getFieldValue: (id: ID, defaultValue?: Value) => Value
  setField: (id: ID, field: Field) => void
  setFieldDisplay: (id: ID, display: Display) => void
  setFieldProps: (id: ID, props: Props) => void
  setFieldValue: (id: ID, value: Value) => void
}

export interface FieldContextReturn {
  get: () => Field
  getDisplay: () => Display
  getProps: () => Props
  getValue: (defaultValue?: Value) => Value
  set: (field: Field) => void
  setDisplay: (display: Display) => void
  setProps: (props: Props) => void
  setValue: (value: Value) => void
}

export interface FormProviderProps extends React.PropsWithChildren {
  //...
}

const Context = React.createContext({} as FormContextReturn)

export function useField(id: ID): FieldContextReturn {
  const form = React.useContext(Context)

  if (!form)
    throw new Error('"useField" must be used within a "FormProvider"')

  // Getters
  const get = React.useCallback(() => {
    return form.getField(id)
  }, [])

  const getDisplay = React.useCallback(() => {
    return form.getFieldDisplay(id)
  }, [])

  const getProps = React.useCallback(() => {
    return form.getFieldProps(id)
  }, [])

  const getValue = React.useCallback((defaultValue?: Value) => {
    return form.getFieldValue(id, defaultValue)
  }, [])

  // Setter
  const set = React.useCallback((field: Field) => {
    form.setField(id, field)
  }, [])

  const setDisplay = React.useCallback((display: Display) => {
    form.setFieldDisplay(id, display)
  }, [])

  const setProps = React.useCallback((field: Props) => {
    form.setFieldProps(id, field)
  }, [])

  const setValue = React.useCallback((value: Value) => {
    form.setFieldValue(id, value)
  }, [])

  return {
    get,
    getDisplay,
    getProps,
    getValue,
    set,
    setDisplay,
    setProps,
    setValue,
  }
}

export function useForm(): FormContextReturn {
  const form = React.useContext(Context)

  if (!form)
    throw new Error('"useForm" must be used within a "FormProvider"')

  return form
}

export function FormProvider(props: FormProviderProps) {
  const fields = React.useRef<Fields>({
    [Symbol.iterator]: function*() {
      for (const key in this)
        yield this[key]
    }
  })

  // Getters
  const getField = React.useCallback((id: ID) => {
    const field = fields.current[id]

    if (isUndefined(field))
      throw new Error(`The field "${id}" does not exist`)

    return field
  }, [])

  const getFieldDisplay = React.useCallback((id: ID) => {
    const field = getField(id)
    return field.display
  }, [])

  const getFieldProps = React.useCallback((id: ID) => {
    const field = getField(id)
    return field.props
  }, [])

  const getFieldValue = React.useCallback((id: ID, defaultValue?: Value) => {
    const field = getField(id)
    return field.value ?? defaultValue
  }, [])

  // Setters
  const setField = React.useCallback((id: ID, field: Field) => {
    fields.current[id] = field
  }, [])

  const setFieldDisplay = React.useCallback((id: ID, display: Display) => {
    const field = getField(id)
    field.display = display
  }, [])

  const setFieldProps = React.useCallback((id: ID, props: Props) => {
    const field = getField(id)
    field.props = props
  }, [])

  const setFieldValue = React.useCallback((id: ID, value: Value) => {
    const field = getField(id)
    field.value = value
  }, [])

  return (
    <Context.Provider value={{
      fields: fields.current,
      getField,
      getFieldDisplay,
      getFieldProps,
      getFieldValue,
      setField,
      setFieldDisplay,
      setFieldProps,
      setFieldValue,
    }}>
      {props.children}
    </Context.Provider>
  )
}
