import {
  Text as NativeText,
  TextProps as NativeTextProps
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export interface TextProps extends ThemeProps, NativeTextProps {
  //...
}

export function Text(props: TextProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark,
    light: colorLight
  }, 'text')

  return (
    <NativeText
      {...rest}
      style={[
        {
          color
        },
        rest.style
      ]}
    />
  )
}

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, {
        fontFamily: 'SpaceMono'
      }]}
    />
  )
}
