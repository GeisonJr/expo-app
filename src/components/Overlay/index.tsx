import { StyleSheet } from 'react-native'

import { ThemeProps } from '../Themed'
import { View, ViewProps } from '../View'

export interface OverlayProps extends ThemeProps, ViewProps {
  //...
}

export function Overlay(props: OverlayProps) {
  props.colorDark = props.colorDark ?? 'rgba(0, 0, 0, 0.75)'
  props.colorLight = props.colorLight ?? 'rgba(255, 255, 255, 0.75)'

  return (
    <View
      {...props}
      style={[
        styles.container,
        props.style
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
