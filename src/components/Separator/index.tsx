import { ThemeProps, useThemeColor } from '../Themed'
import { View, ViewProps } from '../View'

export interface SeparatorProps extends ThemeProps, ViewProps {
  //...
}

export function Separator(props: SeparatorProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark ?? 'rgba(255, 255, 255, .15)',
    light: colorLight ?? 'rgba(0, 0, 0, .15)'
  }, 'text')

  return (
    <View
      {...rest}
      style={[
        {
          borderBottomColor: color,
          borderBottomWidth: 1,
          marginVertical: 8,
          width: '80%'
        },
        rest.style
      ]}
    />
  )
}
