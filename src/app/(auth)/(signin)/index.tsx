import { StyleSheet } from 'react-native'

import { Button, Header, Link, Separator, Text, TextInput, View } from '@/components'
import { FormProvider, useForm } from '@/contexts'
import { alert } from '@/functions'
import { router } from 'expo-router'
import { useEffect } from 'react'

export default function AuthSigninScreen() {

	return (
		<>
			<Header
				title={'Menu - Signin'}
				isHidden
			/>
			<FormProvider>
				<View style={styles.container}>
					<Fields />
				</View >
			</FormProvider>
		</>
	)
}

function Fields() {
	const { fields } = useForm()

	async function onSubmit() {
		for (const field of fields)
			if (!field.valid()) {
				alert({
					title: `Required field`,
					message: `The field "${field.placeholder}" is required`
				})
				return field.focus()
			}

		// TODO: Signin
		// const response = await fetch('...')

		router.replace('/(tabs)')
	}

	useEffect(() => {
		console.log(fields)

	}, [fields])

	return (
		<>
			<Text style={styles.title}>{'Signin'}</Text>
			<TextInput
				name={'username'}
				placeholder={'Username'}
				next={'password'}
				required
			/>
			<TextInput
				name={'password'}
				placeholder={'Password'}
				required
				// multiline
				secureTextEntry
			/>
			<Separator />
			<Button
				title={'Signin'}
				onPress={onSubmit} />
			<Link href={'/(signup)'}>{'Signup'}</Link>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		gap: 10,
		justifyContent: 'center',
		padding: 10,
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
	},
})
