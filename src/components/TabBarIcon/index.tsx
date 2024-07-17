import { MaterialCommunityIcons } from '@expo/vector-icons'
import { isArray } from '@geisonjr/typefy'
import React from 'react'

import { IconName } from '../Icon'

export function TabBarIcon({
	focused,
	icon,
	...props
}: {
	icon: IconName | [IconName, IconName]
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

