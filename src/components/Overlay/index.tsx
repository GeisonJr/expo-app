import { StyleSheet } from 'react-native'

import { View, ViewProps } from '../View'

export type OverlayProps = ViewProps & {

}

export function Overlay(props: OverlayProps) {
  const { children, ...rest } = props

  return (
    <View
      colorDark={'rgba(0, 0, 0, 0.75)'}
      colorLight={'rgba(255, 255, 255, 0.75)'}
      style={styles.container} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
