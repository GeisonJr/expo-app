import { Tabs } from 'expo-router'

import { useScreenOptions } from '../Themed'

export interface TabBarProps {
	isHidden?: boolean
	title: string
}

export function TabBar({
	isHidden,
	title,
}: TabBarProps) {
	const { tabs } = useScreenOptions()

	return (
		<Tabs.Screen
			options={{
				title,
				headerShown: !isHidden ?? tabs.headerShown,
			}}
		/>
	)
}
