import React from 'react'
import ReactNative from 'react-native'

import { useField, useForm } from '@/contexts'
import { ThemeProps, useThemeColor } from '../Themed'

export type TextInputProps = ThemeProps
  & ReactNative.TextInputProps
  & {
    name: string
    next?: string
    placeholder: string
    required?: boolean
  }

export type TextInputRef = React.RefObject<ReactNative.TextInput>

export const TextInput = (props: TextInputProps) => {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

  if (!rest.name)
    throw new Error('The "name" prop is required')

  const { register, getValue, setValue } = useField(rest.name)
  const { getFieldByName } = useForm()

  const inputRef = React.useRef<ReactNative.TextInput>(null)

  const onChangeText = React.useCallback((newText: string) => {
    rest.onChangeText?.(newText)
    setValue(newText)
  }, [])

  const onSubmitEditing = React.useCallback((e: ReactNative.NativeSyntheticEvent<ReactNative.TextInputSubmitEditingEventData>) => {
    rest.onSubmitEditing?.(e)
    if (!rest.next)
      return

    const nextField = getFieldByName(rest.next)
    nextField.focus()
  }, [])

  const onUpdate = React.useCallback(() => {
    const value = getValue()
    inputRef.current?.setNativeProps({ text: value })
  }, [])

  React.useEffect(() => {
    register({
      name: rest.name,
      placeholder: rest.placeholder,
      next: rest.next,
      get value() {
        return this._value
      },
      set value(newValue: string) {
        this._value = newValue
        onUpdate()
      },
      _value: rest.defaultValue ?? '',
      blur: () => {
        inputRef.current?.blur()
      },
      clear: () => {
        setValue('')
      },
      focus: () => {
        inputRef.current?.focus()
      },
      reset: () => {
        setValue(rest.defaultValue ?? '')
      },
      valid: () => {
        const value = getValue()
        if (rest.required && !value)
          return false

        return true
      }
    })
  }, [])

  return (
    <ReactNative.TextInput
      {...rest}
      ref={inputRef}
      style={[{
        borderColor: color,
        borderRadius: 8,
        borderWidth: 1,
        color,
        height: 50,
        padding: 10,
        width: '100%',
      }, rest.style]}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
    />
  )
}
