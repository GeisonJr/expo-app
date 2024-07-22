import { MaterialCommunityIcons as NativeIcon } from '@expo/vector-icons'

import { ThemeProps, useThemeColor } from '../Themed'

type NativeIconProps = React.ComponentProps<typeof NativeIcon>

export interface IconProps extends ThemeProps, NativeIconProps {
  //...
}

function Icon(props: IconProps) {
  const { colorDark, colorLight, ...rest } = props
  const color = useThemeColor({
    dark: colorDark,
    light: colorLight
  }, 'text')

  return (
    <NativeIcon
      {...rest}
      color={color}
    />
  )
}

Icon.font = NativeIcon.font

export {
  Icon
}
