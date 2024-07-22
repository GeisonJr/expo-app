import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

import { useScreenOptions } from '../Themed'

export interface HeaderProps {
	isHidden?: boolean
	title: string
	right?: NativeStackNavigationOptions['headerRight']
}

export function Header(props: HeaderProps) {
	const { isHidden, title, right, } = props

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
