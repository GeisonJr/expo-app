import { MaterialCommunityIcons } from '@expo/vector-icons'
import { isArray } from '@geisonjr/typefy'
import React from 'react'

type Icon = React.ComponentProps<typeof MaterialCommunityIcons>['name']

export function TabBarIcon({
	focused,
	icon,
	...props
}: {
	icon: Icon | [Icon, Icon]
	color: React.ComponentProps<typeof MaterialCommunityIcons>['color']
	focused: boolean
	size: number
}) {
	const name = !isArray(icon) ? icon : focused ? icon[0] : icon[1]

	return (
		<MaterialCommunityIcons
			name={name}
			{...props}
		/>
	)
}

