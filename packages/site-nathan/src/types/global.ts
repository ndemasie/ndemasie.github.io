// Affects whole project
import '@total-typescript/ts-reset'

/* eslint-disable @typescript-eslint/no-namespace */
import 'react'

declare global {
  namespace JSX {
    interface Element {
      children?: React.ReactNode
    }

    interface IntrinsicElements {
      // JSX should recognize webcomponents
      'base-button': BaseButton
    }
  }
}
