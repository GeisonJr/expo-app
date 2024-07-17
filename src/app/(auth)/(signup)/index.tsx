import { StyleSheet } from 'react-native'

import { Header, Link, Separator, Text, View } from '@/components'

export default function AuthSignupScreen() {
	return (
		<>
			<Header
				title={'Menu - Signup'}
				isHidden
			/>
			<View style={styles.container}>
				<Text style={styles.title}>{'Signup'}</Text>
				<Separator />
				<Link href={'/(signin)'}>{'Signin'}</Link>
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
