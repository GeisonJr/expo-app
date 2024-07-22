import {
  Button as NativeButton,
  ButtonProps as NativeButtonProps
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export interface ButtonProps extends ThemeProps, NativeButtonProps {
  //...
}

export function Button(props: ButtonProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark,
    light: colorLight
  }, 'text')

  return (
    <NativeButton
      {...rest}
      color={color}
    />
  )
}
