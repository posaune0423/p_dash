import copy from 'copy-to-clipboard'
import { Check, Copy } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  const onClick = useCallback(() => {
    setCopied(true)
    copy(value)
  }, [])

  return (
    <button disabled={copied} onClick={onClick} className="text-white">
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

export default CopyButton
