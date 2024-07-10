import { StyleSheet } from 'react-native'

import { Header, HeaderIcon, Separator, Text, View } from '@/components'

export default function TabsSettingsScreen() {
	return (
		<>
			<Header
				title={'Menu Setting'}
				right={(props) => (
					<HeaderIcon
						icon={'information'}
						{...props}
					/>
				)}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>{'Settings'}</Text>
				<Separator />
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
