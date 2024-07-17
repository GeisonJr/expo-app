import { ThemeProps, useThemeColor } from '../Themed'
import { View, ViewProps } from '../View'

export type SeparatorProps = ThemeProps & ViewProps

export function Separator(props: SeparatorProps) {
  const { colorDark = 'rgba(255, 255, 255, .15)', colorLight = 'rgba(0, 0, 0, .15)', style, ...rest } = props
  const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

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
        style,
      ]}
    />
  )
}
