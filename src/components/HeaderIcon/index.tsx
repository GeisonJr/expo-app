import { AnimatableNumericValue, Pressable } from 'react-native'

import { Icon, IconProps } from '../Icon'
import { Link, LinkProps } from '../Link'

export interface HeaderIconProps extends LinkProps {
	icon: IconProps['name']
	pressColor?: string
	tintColor?: string
	pressOpacity?: AnimatableNumericValue
}

export function HeaderIcon(props: HeaderIconProps) {
	const { icon, pressColor, tintColor, pressOpacity, ...rest } = props

	return (
		<Link
			{...rest}
			asChild
		>
			<Pressable>
				{({ pressed }) => (
					<Icon
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

