import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AnimatableNumericValue, Pressable } from 'react-native'

import { Link } from '..'

type Icon = React.ComponentProps<typeof MaterialCommunityIcons>['name']

export function HeaderIcon({
	icon,
	pressColor,
	tintColor,
	pressOpacity,
}: {
	icon: Icon
	pressColor?: string
	tintColor?: string
	pressOpacity?: AnimatableNumericValue
}) {
	return (
		<Link
			href={'/modal'}
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

