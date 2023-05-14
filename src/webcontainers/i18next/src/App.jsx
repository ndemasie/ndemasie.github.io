import { useEffect } from 'react'

import packageJson from '../package.json'

import Context from './components/Context'
import Essentials from './components/Essentials'
import Fallback from './components/Fallback'
import Interpolation from './components/Interpolation'
import Namespaces from './components/Namespaces'
import Nesting from './components/Nesting'
import ObjectsAndArrays from './components/ObjectsAndArrays'
import Plurals from './components/Plurals'

export default function App() {
  // Message listener
  useEffect(() => {
    const onMessageEvent = (event) => {
      // if (event.origin !== 'http://localhost:3000') return

      if (event.data?.type === 'webpackOk') {
        const message = {
          source: packageJson.name,
          payload: structuredClone(event.data ?? {}),
        }
        window.top.postMessage(message, '*')
      }

      if (event?.data?.payload?.hash) {
        window.location.hash = event.data.payload.hash
      }
    }

    window.addEventListener(
      'message',
      onMessageEvent,
      false,
    )
    return () =>
      window.removeEventListener(
        'message',
        onMessageEvent,
        false,
      )
  })

  return (
    <>
      <Context />
      <Essentials />
      <Fallback />
      <Interpolation />
      <Namespaces />
      <Nesting />
      <ObjectsAndArrays />
      <Plurals />
    </>
  )
}
