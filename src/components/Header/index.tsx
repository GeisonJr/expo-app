import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'
import { useScreenOptions } from '../Themed'

export function Header({
	isHidden,
	title,
	right,
}: {
	isHidden?: boolean
	title: string
	right?: NativeStackNavigationOptions['headerRight']
}) {
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
