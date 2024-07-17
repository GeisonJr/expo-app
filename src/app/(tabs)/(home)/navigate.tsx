import { StyleSheet } from 'react-native'

import { Header, HeaderIcon, Separator, Text, View } from '@/components'

export default function TabsNavigateScreen() {
	return (
		<>
			<Header
				title={'Menu - Navigate'}
				right={(props) => (
					<HeaderIcon
						href={'/modal'}
						icon={'information'}
						{...props}
					/>
				)}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>{'Navigate'}</Text>
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
