import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { HeaderOptions } from '@react-navigation/elements'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Link as NativeLink } from 'expo-router'
import {
	ActivityIndicator as NativeActivityIndicator,
	Text as NativeText,
	View as NativeView,
	useColorScheme,
} from 'react-native'

import Colors from '@/constants/Colors'
import { ExpoRouter } from '../../.expo/types/router'

type ThemeProps = {
	colorLight?: string
	colorDark?: string
}

export type ActivityIndicatorProps = ThemeProps &
	NativeActivityIndicator['props']
export type LinkProps = ThemeProps & ExpoRouter.LinkProps
export type TextProps = ThemeProps & NativeText['props']
export type ViewProps = ThemeProps & NativeView['props']

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
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
	const { scheme, colors } = useTheme()
	const colorFromProps = props[scheme]

	if (colorFromProps) {
		return colorFromProps
	} else {
		return colors[colorName]
	}
}

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

export function Link(props: LinkProps) {
	const { colorDark, colorLight, style, ...rest } = props
	const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

	return (
		<NativeLink
			{...rest}
			style={[{ color }, style]}
		/>
	)
}

export function Separator(props: ViewProps) {
	const { colorDark, colorLight, style, ...rest } = props
	const backgroundColor = useThemeColor(
		{ dark: colorDark, light: colorLight },
		'background',
	)

	return (
		<View
			{...rest}
			colorDark={'rgba(255,255,255,0.1)'}
			colorLight={'#eee'}
			style={[{ height: 1, marginVertical: 30, width: '80%' }, style]}
		/>
	)
}

export function Text(props: TextProps) {
	const { colorDark, colorLight, style, ...rest } = props
	const color = useThemeColor({ dark: colorDark, light: colorLight }, 'text')

	return (
		<NativeText
			{...rest}
			style={[{ color }, style]}
		/>
	)
}

export function View(props: ViewProps) {
	const { colorDark, colorLight, style, ...rest } = props
	const backgroundColor = useThemeColor(
		{ dark: colorDark, light: colorLight },
		'background',
	)

	return (
		<NativeView
			{...rest}
			style={[{ backgroundColor }, style]}
		/>
	)
}
