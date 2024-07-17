export interface BasicProps {
  /**
   * Defines the dialog title.
   */
  title: string
}

export interface AbortProps extends BasicProps {
  /**
   * Defines the text of the message.
   * @default undefined
   */
  message?: string
  /**
   * Define the text of the abort button.
   * @default 'Cancelar'
   */
  abortText?: string
  /**
   * Define the text of the negative button.
   * @default 'Não'
   */
  negativeText?: string
  /**
   * Define the text of the positive button.
   * @default 'Sim'
   */
  positiveText?: string
}

export interface AlertProps extends BasicProps {
  /**
   * Defines the text of the message.
   * @default undefined
   */
  message?: string
  /**
   * Define the text of the neutral button.
   * @default 'OK'
   */
  neutralText?: string
}

export interface ConfirmProps extends BasicProps {
  /**
   * Defines the text of the message.
   * @default undefined
   */
  message?: string
  /**
   * Define the text of the negative button.
   * @default 'Não'
   */
  negativeText?: string
  /**
   * Define the text of the positive button.
   * @default 'Sim'
   */
  positiveText?: string
}

export interface ErrorProps extends BasicProps {
  /**
   * Defines the error property.
   * @default undefined
   */
  error?: any
  /**
   * Define the text of the neutral button.
   * @default 'OK'
   */
  neutralText?: string
}
