import { Button as NativeButton } from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export type ButtonProps = ThemeProps &
  NativeButton['props']

export function Button(props: ButtonProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')


  return (
    <NativeButton
      {...rest}
      color={color}
    />
  )
}
