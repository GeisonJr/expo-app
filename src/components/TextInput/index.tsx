import React from 'react'
import ReactNative from 'react-native'

import { Display, ID, Value, useField, useForm } from '@/contexts/useForm'
import { isString } from '@geisonjr/typefy'
import { ThemeProps, useThemeColor } from '../Themed'

export interface TextInputProps
  extends ThemeProps,
  Omit<ReactNative.TextInputProps, 'onChangeText'> {
  id: ID
  name: string
  nextFieldId?: ID
  defaultDisplay?: Display
  // display?: never
  defaultValue?: Value
  value?: never
  required?: boolean
  onDisplay?: (value: Display) => Display
  onValue?: (value: Value) => Value
  onValid?: (value: Value, props: TextInputProps) => boolean
  onChangeText?: (value: string, setters: {
    setDisplay: (display: Display) => void,
    setValue: (value: Value) => void,
  }) => void
}

export type TextInputRef = React.RefObject<ReactNative.TextInput>

export const TextInput = (props: TextInputProps) => {

  if (!props.id)
    throw new Error('The "id" prop is required')

  if (!props.name)
    throw new Error('The "name" prop is required')

  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark,
    light: colorLight
  }, 'text')

  const field = useField(rest.id)
  const form = useForm()

  const inputRef = React.useRef<ReactNative.TextInput>(null)

  const onChangeText = React.useCallback((value: string) => {
    if (rest.onChangeText)
      return rest.onChangeText?.(value, {
        setDisplay: handleDisplay,
        setValue: handleValue,
      })

    handleDisplay(value)
    handleValue(value)
  }, [])

  const onSubmitEditing = React.useCallback((e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputSubmitEditingEventData>) => {
    rest.onSubmitEditing?.(e)

    if (rest.blurOnSubmit)
      return

    const nextFieldId = rest.nextFieldId
    if (!nextFieldId)
      return

    const nextField = form.getField(nextFieldId)
    nextField.focus()
  }, [])

  const forceRender = React.useCallback(() => {
    const display = field.getDisplay()
    inputRef.current?.setNativeProps({ text: display })
  }, [])

  const handleBlur = React.useCallback(() => {
    inputRef.current?.blur()
  }, [])

  const handleClear = React.useCallback(() => {
    handleDisplay('')
    handleValue(undefined)
  }, [])

  const handleFocus = React.useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleReset = React.useCallback(() => {
    handleDisplay(rest.defaultDisplay ?? '')
    handleValue(rest.defaultValue ?? undefined)
  }, [])

  const handleValid = React.useCallback(() => {
    const value = field.getValue()

    if (rest.required && !value)
      return false

    return rest.onValid?.(value, props) ?? true
  }, [])

  const handleDisplay = React.useCallback((display: Display) => {
    display = rest.onDisplay?.(display) ?? display
    field.setDisplay(display)
  }, [])

  const handleValue = React.useCallback((value: Value) => {
    value = rest.onValue?.(value) ?? value
    field.setValue(value)
  }, [])

  React.useEffect(() => {
    const defaultDisplay = rest.defaultDisplay ?? ''
    const defaultValue = rest.defaultValue ?? undefined

    field.set({
      id: rest.id,
      name: rest.name,
      props: {
        defaultDisplay: defaultDisplay,
        defaultValue: defaultValue,
        required: props.required,
      },
      _display: '',
      get display() {
        return this._display
      },
      set display(value: string) {
        this._display = value
        forceRender()
      },
      value: undefined,
      blur: handleBlur,
      clear: handleClear,
      focus: handleFocus,
      reset: handleReset,
      valid: handleValid
    })

    // Call field API to prevent run onDisplay
    field.setDisplay(defaultDisplay)

    // Call field API to prevent run onValue
    field.setValue(defaultValue)
  }, [])

  React.useEffect(() => {
    field.setProps({
      defaultDisplay: props.defaultDisplay,
      defaultValue: props.defaultValue,
      required: props.defaultValue
    })
  }, [
    props.defaultDisplay,
    props.defaultValue,
    props.required
  ])

  return (
    <ReactNative.TextInput
      {...rest}
      placeholder={rest.placeholder ?? rest.name}
      ref={inputRef}
      style={[
        {
          borderColor: color,
          borderRadius: 8,
          borderWidth: 1,
          color,
          height: 50,
          padding: 10,
          width: '100%',
        },
        rest.style
      ]}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
    />
  )
}

export const CPFTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      keyboardType={'number-pad'}
      maxLength={14}
      onDisplay={(value) => {
        value = value.replace(/\D/g, '')

        if (value.length > 9)
          value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-')
        else if (value.length > 6)
          value = value.replace(/(\d{3})(\d{3})/, '$1.$2.')
        else if (value.length > 3)
          value = value.replace(/(\d{3})/, '$1.')

        return value
      }}
      onValue={(value) => {
        if (isString(value))
          return value.replace(/\D/g, '')

        return value
      }}
      {...props}
    />
  )
}

export const CNPJTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      keyboardType={'number-pad'}
      maxLength={18}
      onDisplay={(value) => {
        value = value.replace(/\D/g, '')

        if (value.length > 12)
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-')
        else if (value.length > 8)
          value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3/')
        else if (value.length > 5)
          value = value.replace(/(\d{2})(\d{3})/, '$1.$2.')
        else if (value.length > 2)
          value = value.replace(/(\d{2})/, '$1.')

        return value
      }}
      onValue={(value) => {
        if (isString(value))
          return value.replace(/\D/g, '')

        return value
      }}
      {...props}
    />
  )
}

export const BRValueTextInput = (props: TextInputProps & {
  decimalLength?: number
  decimalSeparator?: string
  thousandSeparator?: string
  prefix?: string
  suffix?: string
}) => {

  const {
    decimalLength = 2,
    decimalSeparator = ',',
    thousandSeparator = '.',
    prefix = 'R$ ',
    suffix = ' %',
    ...rest
  } = props

  return (
    <TextInput
      keyboardType={'number-pad'}
      onDisplay={(display) => {
        // Remove non numeric chars
        display = display.replace(/\D/g, '')

        // Remove leading zeros
        display = display.replace(/^0+/, '')

        // Add leading zeros
        const text = display.padStart(decimalLength + 1, '0')

        // Get integer part
        const integer = text.slice(0, -decimalLength)

        // Get decimal part
        const decimal = text.slice(-decimalLength)

        // Convert to number
        const asNumber = Number(integer + '.' + decimal)

        // Format with Intl
        const formated = new Intl
          .NumberFormat('pt-br', {
            style: 'decimal'
          })
          .format(asNumber)

        // Add prefix and suffix
        return (`${prefix}${formated}${suffix}`).trim()
      }}
      onValue={(value) => {
        // Remove non numeric chars
        value = value.replace(/\D/g, '')

        // Remove leading zeros
        value = value.replace(/^0+/, '')

        // Add leading zeros
        const text = value.padStart(decimalLength + 1, '0')

        // Get integer part
        const integer = text.slice(0, -decimalLength)

        // Get decimal part
        const decimal = text.slice(-decimalLength)

        // Convert to number
        const asNumber = Number(integer + '.' + decimal)

        return asNumber
      }}
      {...props}
    />
  )
}
