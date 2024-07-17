import {
  Text as NativeText
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export type TextProps = ThemeProps & NativeText['props']

export function Text(props: TextProps) {
  const { colorDark, colorLight, style, ...rest } = props
  const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

  return (
    <NativeText
      {...rest}
      style={[{ color }, style]}
    />
  )
}

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'SpaceMono' }]}
    />
  )
}
