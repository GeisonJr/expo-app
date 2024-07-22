import { StyleSheet } from 'react-native'

import { BRValueTextInput, Button, CNPJTextInput, CPFTextInput, Header, Link, Separator, Text, TextInput, View } from '@/components'
import { FormProvider, useForm } from '@/contexts/useForm'

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
				</View>
			</FormProvider >
		</>
	)
}

function Fields() {
	const form = useForm()

	async function onSubmit() {
		for (const field of form.fields)
			console.log(field.value, field.display)

		// for (const field of form.fields)
		// 	if (!field.valid()) {
		// 		if (field.props.required)
		// 			alert({
		// 				title: `Required field`,
		// 				message: `The field "${field.name}" is required`
		// 			})
		// 		else
		// 			alert({
		// 				title: `Invalid field`,
		// 				message: `The field "${field.name}" is invalid`
		// 			})

		// 		return field.focus()
		// 	}

		// TODO: Signin
		// const response = await fetch('...')

		// router.replace('/(tabs)')
	}

	return (
		<>
			<Text style={styles.title}>{'Signin'}</Text>
			<TextInput
				id={'username'}
				name={'Username'}
				nextFieldId={'password'}
				onDisplay={(display) => {
					return display
				}}
				onValue={(value) => {
					return value
				}}
				onChangeText={(value, {
					setDisplay, setValue
				}) => {
					setDisplay(value.toUpperCase())
					setValue(value.toLowerCase())
				}}
				required
				defaultDisplay={'aasfafasfas'}
			/>
			<TextInput
				id={'password'}
				name={'Password'}
				secureTextEntry
			/>
			<CPFTextInput
				id={'cpf'}
				name={'CPF'}
			/>
			<CNPJTextInput
				id={'cnpj'}
				name={'CNPJ'}
			/>
			<BRValueTextInput
				id={'brvalue'}
				name={'Value'}
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
