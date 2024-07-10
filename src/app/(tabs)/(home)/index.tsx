import { StyleSheet } from 'react-native'

import { Header, Link, Separator, Text, View } from '@/components'

export default function TabsHomeScreen() {
	return (
		<>
			<Header
				title={'Menu - Home'}
				isHidden
			/>
			<View style={styles.container}>
				<Text style={styles.title}>{'Home'}</Text>
				<Separator />
				<Link href={'/navigate'}>{'Navigate'}</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
	},
})
