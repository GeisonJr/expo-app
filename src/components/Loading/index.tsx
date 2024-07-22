import React from 'react'

import { ActivityIndicator } from '../ActivityIndicator'
import { Overlay } from '../Overlay'

export interface LoadingProps {
  isLoading: boolean
}

export function Loading(props: LoadingProps) {

  if (!props.isLoading)
    return null

  return (
    <Overlay>
      <ActivityIndicator />
    </Overlay>
  )
}
