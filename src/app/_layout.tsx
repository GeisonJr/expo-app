import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import 'react-native-reanimated'

import { ActivityIndicator, Text, useScreenOptions, View } from '@/components'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		...MaterialCommunityIcons.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return <RootLayoutLoading />
	}

	return <RootLayoutStack />
}

function RootLayoutStack() {
	const { stack } = useScreenOptions()

	return (
		<Stack
			screenOptions={{
				...stack,
				headerShown: false,
			}}
		>
			<Stack.Screen name={'(tabs)'} />
			<Stack.Screen
				name={'modal'}
				options={{
					headerShown: true,
					presentation: 'modal',
				}}
			/>
		</Stack>
	)
}

function RootLayoutLoading() {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
			<Text>{'Loading data, wait a minute...'}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		gap: 10,
		justifyContent: 'center',
	},
})
