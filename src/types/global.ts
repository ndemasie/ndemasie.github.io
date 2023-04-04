// Import in a single file, then across your whole project...
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
      'my-button': MyButton
    }
  }
}
