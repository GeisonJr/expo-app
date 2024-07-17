import {
	ActivityIndicator as NativeActivityIndicator
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export type ActivityIndicatorProps = ThemeProps &
	NativeActivityIndicator['props']

export function ActivityIndicator(props: ActivityIndicatorProps) {
	const { colorDark, colorLight, ...rest } = props
	const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

	return (
		<NativeActivityIndicator
			{...rest}
			color={color}
		/>
	)
}
