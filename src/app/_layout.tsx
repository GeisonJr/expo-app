import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { Icon, useScreenOptions } from '@/components'
import { LoadingProvider } from '@/contexts/useLoading'
import { Stack } from 'expo-router'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	// Load fonts and icons before rendering the app.
	const [loaded, error] = useFonts({
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
		...Icon.font,
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	// Hide the splash screen when the app is ready to be displayed.
	useEffect(() => {
		if (loaded) SplashScreen.hideAsync()
	}, [loaded])

	if (!loaded) return null

	return (
		<LoadingProvider>
			<RootLayoutStack />
		</LoadingProvider>
	)
}

function RootLayoutStack() {
	const { stack } = useScreenOptions()

	return (
		<Stack
			screenOptions={{
				...stack,
				headerShown: false,
			}}
		/>
	)
}
