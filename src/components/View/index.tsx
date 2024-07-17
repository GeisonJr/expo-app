import {
  View as NativeView
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export type ViewProps = ThemeProps & NativeView['props']

export function View(props: ViewProps) {
  const { colorDark, colorLight, style, ...rest } = props
  const backgroundColor = useThemeColor(
    { dark: colorDark, light: colorLight },
    'background',
  )

  return (
    <NativeView
      {...rest}
      style={[{ backgroundColor }, style]}
    />
  )
}
