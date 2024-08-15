'use client'

import { useEffect } from 'react'
import init, { greet } from '../../wasm/pkg'

// INFO: NOT USED YET
const WasmTest = () => {
  useEffect(() => {
    const loadWasm = async () => {
      await init();
      greet('hello')
    }
    loadWasm()
  }, [])

  return <></>
}

export { WasmTest }
