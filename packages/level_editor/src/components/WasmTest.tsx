'use client'

import { useEffect } from 'react'
import init, { greet } from '../../wasm/pkg'

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
