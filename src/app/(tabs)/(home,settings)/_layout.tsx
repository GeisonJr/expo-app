import { Stack } from 'expo-router'

import { useScreenOptions } from '@/components'

export default function TabsAllLayout() {
	const { stack } = useScreenOptions()

	return <Stack screenOptions={stack} />
}
