import { isArray } from '@geisonjr/typefy'
import React from 'react'

import { Icon, IconProps } from '../Icon'

export interface TabsBarIconProps {
	icon: IconProps['name'] | [IconProps['name'], IconProps['name']]
	color: IconProps['color']
	focused: boolean
	size: number
}

export function TabsBarIcon(props: TabsBarIconProps) {
	const { focused, icon, ...rest } = props

	const name = !isArray(icon) ? icon : focused ? icon[0] : icon[1]

	return (
		<Icon
			{...rest}
			name={name}
		/>
	)
}

