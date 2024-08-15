import { GridBoard } from '@/components/GridBoard'
import { WasmTest } from '@/components/WasmTest'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GridBoard />
      <WasmTest />
    </div>
  )
}
