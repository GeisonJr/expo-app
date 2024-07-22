import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { HeaderOptions } from '@react-navigation/elements'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import {
	useColorScheme
} from 'react-native'

import Colors from '@/constants/Colors'
import { isUndefined } from '@geisonjr/typefy'

export interface ThemeProps {
	colorLight?: string
	colorDark?: string
}

export function useTheme() {
	const scheme = useColorScheme() ?? 'light'

	return {
		scheme,
		colors: Colors[scheme],
	}
}

export function useScreenOptions() {
	const { colors } = useTheme()

	const header = {
		headerShown: true,
		headerStyle: {
			backgroundColor: colors.tabBarBackground,
			shadowColor: colors.tabBarBorder,
		},
		headerTintColor: colors.tint,
		headerTitleAllowFontScaling: true,
		headerTitleStyle: {
			color: colors.tint,
		},
		// headerPressColor: colors.text,
	} as HeaderOptions

	return {
		tabs: {
			...header,
			tabBarActiveTintColor: colors.tabBarPrimary,
			tabBarAllowFontScaling: true,
			tabBarInactiveTintColor: colors.tabBarText,
			tabBarStyle: {
				backgroundColor: colors.tabBarBackground,
			},
		} as BottomTabNavigationOptions,
		stack: {
			...header,
		} as NativeStackNavigationOptions,
	}
}

export function useThemeColor(
	props: {
		color?: string
		light?: string
		dark?: string
	},
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	if (!isUndefined(props.color))
		return props.color

	const { scheme, colors } = useTheme()
	const colorFromProps = props[scheme]

	if (colorFromProps)
		return colorFromProps

	return colors[colorName]
}
