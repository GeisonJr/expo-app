import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AnimatableNumericValue, Pressable } from 'react-native'

import { IconName } from '../Icon'
import { Link, LinkProps } from '../Link'

export type HeaderIconProps = {
	icon: IconName
	pressColor?: string
	tintColor?: string
	pressOpacity?: AnimatableNumericValue
} & LinkProps

export function HeaderIcon({
	icon,
	pressColor,
	tintColor,
	pressOpacity,
	...linkProps
}: HeaderIconProps) {
	return (
		<Link
			{...linkProps}
			asChild
		>
			<Pressable>
				{({ pressed }) => (
					<MaterialCommunityIcons
						name={icon}
						size={25}
						color={pressed ? pressColor : tintColor}
						style={{ marginRight: 15, opacity: pressOpacity }}
					/>
				)}
			</Pressable>
		</Link>
	)
}

