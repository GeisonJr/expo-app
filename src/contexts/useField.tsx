import { useEffect, useMemo } from 'react'
import { useField } from './useForm'

export function useField(name: string) {
  const { registerField, unregisterField } = useField()

  if (!name)
    throw new Error('You need to provide the "name" prop.')

  const fieldName = useMemo(() => {
    return name
  }, [name])

  useEffect(() => {
    return () => unregisterField(fieldName)
  }, [fieldName, unregisterField])

  return {
    registerField,
  }
}
