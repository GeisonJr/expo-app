import { useEffect } from 'react'
import { StyleSheet } from 'react-native'

import { ActivityIndicator, Separator, Text, View } from '@/components'
import { router } from 'expo-router'

export default function LoadingScreen() {

  useEffect(() => {
    onProcess()
  }, [])

  async function onProcess() {
    // TODO: Get stored auth
    const isAuth = false
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isAuth)
      router.replace('/(tabs)')
    else
      router.replace('/(auth)')
  }


  return (
    <>
      {/* <Header title={'Menu - Loading'} /> */}
      <View style={styles.container}>
        <ActivityIndicator />
        <Separator />
        <Text style={styles.text}>
          {'Wait a moment, we are processing loading all data for you...'}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
})
