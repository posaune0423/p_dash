'use client'

import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

const ImportButton = () => {
  const [file, setFile] = useState<File>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      console.log(file)
    }
  }

  const fileUpload = () => {
    inputRef.current?.click()
  }
  return (
    <Button
      className='w-60 cursor-pointer border-2 !bg-gray-800 !text-white'
      size='xl'
      variant='outline'
      disabled
      onClick={fileUpload}
    >
      <input hidden ref={inputRef} type='file' accept='.json' onChange={onFileInputChange} />
      <Upload className='mr-2' />
      Import
    </Button>
  )
}

export default ImportButton
