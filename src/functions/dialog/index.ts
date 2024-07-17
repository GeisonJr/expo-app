/* Dependencies */
import { isString } from '@geisonjr/typefy'
import { Alert as NativeAlert } from 'react-native'

/* Project */
import type { AbortProps, AlertProps, ConfirmProps, ErrorProps } from './types'

/**
 * Opens native dialog to abort.
 *
 * @returns Promise<boolean | null>
 */
export async function abort({
  title,
  message,
  positiveText = 'Yes',
  negativeText = 'No',
  abortText = 'Cancel',
}: AbortProps): Promise<boolean | null> {
  return new Promise((resolve) => {
    NativeAlert.alert(
      title,
      message,
      [
        {
          text: positiveText,
          onPress: () => {
            resolve(true)
          },
        },
        {
          text: negativeText,
          onPress: () => {
            resolve(false)
          },
        },
        {
          text: abortText,
          onPress: () => {
            resolve(null)
          },
        },
      ],
      { cancelable: false },
    )
  })
}

/**
 * Opens native dialog to alert.
 *
 * @returns Promise<void>
 */
export async function alert({
  title,
  message,
  neutralText = 'OK',
}: AlertProps): Promise<void> {
  return new Promise((resolve) => {
    NativeAlert.alert(
      title,
      message,
      [
        {
          text: neutralText,
          onPress: () => {
            resolve()
          },
        },
      ],
      { cancelable: false },
    )
  })
}

/**
 * Opens a native dialog to confirm.
 *
 * Behavior:
 * - Returns `true` if the user pressed the positive button.
 * - Returns `false` if the user pressed the negative button.
 */
export async function confirm({
  title,
  message,
  positiveText = 'Yes',
  negativeText = 'No',
}: ConfirmProps): Promise<boolean> {
  return new Promise((resolve) => {
    NativeAlert.alert(
      title,
      message,
      [
        {
          text: positiveText,
          onPress: () => {
            resolve(true)
          },
        },
        {
          text: negativeText,
          onPress: () => {
            resolve(false)
          },
        },
      ],
      { cancelable: false },
    )
  })
}

/**
 * Opens a native dialog to error.
 *
 * @returns Promise<void>
 */
export async function error({
  title: _title,
  error: _error,
  neutralText = 'OK',
}: ErrorProps) {
  let title = 'Erro desconhecido!'
  let message = 'Não foi possível identificar a causa do erro.'

  if (_error?.title) title = _error.title
  else if (_title) title = _title

  if (_error?.message) message = _error.message
  else if (isString(_error)) message = _error
  else message = JSON.stringify(_error)

  return await alert({
    title,
    message,
    neutralText,
  })
}
