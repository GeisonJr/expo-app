import { Stack } from 'expo-router'
import React from 'react'

import { useScreenOptions } from '@/components'

export default function AuthLayout() {
	const { stack } = useScreenOptions()

	return (
		<>
			<Stack
				screenOptions={{
					...stack,
					headerShown: false,
				}}
			/>
		</>
	)
}
