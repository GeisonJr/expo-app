import React from 'react'

import { ActivityIndicator } from '../ActivityIndicator'
import { Overlay } from '../Overlay'

export function Loading({ isLoading }: { isLoading: boolean }) {

  if (!isLoading)
    return null

  return (
    <Overlay>
      <ActivityIndicator />
    </Overlay>
  )
}
