import { StyleSheet } from 'react-native'

import { Header, Separator, Text, View } from '@/components'

export default function ModalScreen() {
	return (
		<>
			<Header title={'Menu - Modal'} />
			<View style={styles.container}>
				<Text style={styles.title}>{'Modal'}</Text>
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
