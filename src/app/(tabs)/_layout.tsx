import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon, useScreenOptions } from '@/components'

export default function TabsLayout() {
	const { tabs } = useScreenOptions()

	return (
		<>
			<Tabs
				screenOptions={{
					...tabs,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name={'(home)'}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: (props) => (
							<TabBarIcon
								icon={['home', 'home-outline']}
								{...props}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name={'(settings)'}
					options={{
						tabBarLabel: 'Settings',
						tabBarIcon: (props) => (
							<TabBarIcon
								icon={['cog', 'cog-outline']}
								{...props}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}
