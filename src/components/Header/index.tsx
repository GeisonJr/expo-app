import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

import { useScreenOptions } from '../Themed'

export interface HeaderProps {
	isHidden?: boolean
	title: string
	right?: NativeStackNavigationOptions['headerRight']
}

export function Header({
	isHidden,
	title,
	right,
}: HeaderProps) {
	const { stack } = useScreenOptions()

	return (
		<Stack.Screen
			options={{
				title,
				headerShown: !isHidden ?? stack.headerShown,
				headerRight: right,
			}}
		/>
	)
}
