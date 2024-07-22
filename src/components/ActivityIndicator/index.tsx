import {
	ActivityIndicator as NativeActivityIndicator,
	ActivityIndicatorProps as NativeActivityIndicatorProps
} from 'react-native'

import { ThemeProps, useThemeColor } from '../Themed'

export interface ActivityIndicatorProps extends ThemeProps, NativeActivityIndicatorProps {
	//...
}

export function ActivityIndicator(props: ActivityIndicatorProps) {
	const { colorDark, colorLight, ...rest } = props
	const color = useThemeColor({
		dark: colorDark,
		light: colorLight
	}, 'text')

	return (
		<NativeActivityIndicator
			{...rest}
			color={color}
		/>
	)
}
