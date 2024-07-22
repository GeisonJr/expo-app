import {
  View as NativeView,
  ViewProps as NativeViewProps
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export interface ViewProps extends ThemeProps, NativeViewProps {
  //...
}

export function View(props: ViewProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark,
    light: colorLight
  }, 'background')

  return (
    <NativeView
      {...rest}
      style={[
        {
          backgroundColor: color
        },
        rest.style
      ]}
    />
  )
}
