import { Link as NativeLink } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'

import { ExpoRouter } from '../../../.expo/types/router'
import { ThemeProps, useThemeColor } from '../Themed'

export type LinkProps = ThemeProps & ExpoRouter.LinkProps &
{
  isExternal?: boolean
  // href: string
}

export function Link(props: LinkProps) {
  const { colorDark, colorLight, isExternal, style, ...rest } = props
  const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

  return (
    <NativeLink
      {...rest}
      style={[{ color }, style]}
      onPress={(e) => {
        if (!isExternal)
          return rest.onPress?.(e)

        if (Platform.OS === 'web')
          return

        // Prevent the default behavior of linking to the default browser on native.
        e.preventDefault()
        // Open the link in an in-app browser.
        WebBrowser.openBrowserAsync(props.href as string)
      }}
    />
  )
}
