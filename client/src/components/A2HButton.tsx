'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CustomButton from './CustomButton'
import InstructionDrawer from './InstructionDrawer'
import { APP_DESCRIPTION, APP_NAME } from '@/constants'
import { useA2HS } from '@/hooks/useA2HS'
import { detectiOS } from '@/utils/devices'
import { isPWA } from '@/utils/pwa'

const A2HButton = () => {
  const router = useRouter()

  useEffect(() => {
    if (isPWA()) router.push('/home')
  }, [router])

  const { promptToInstall } = useA2HS()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isiOS = useMemo(() => detectiOS(), [])

  const handleAddToHomeScreen = useCallback(() => {
    if (isiOS) {
      setIsDrawerOpen(true)
    } else {
      promptToInstall()
    }
  }, [promptToInstall, isiOS])

  return (
    <>
      <CustomButton size='lg' variant='outline' onClick={handleAddToHomeScreen}>
        Add to Home Screen
      </CustomButton>
      <InstructionDrawer
        open={isDrawerOpen}
        appName={APP_NAME}
        appDescription={APP_DESCRIPTION}
        handleCloseClick={() => {
          setIsDrawerOpen(false)
        }}
      />
    </>
  )
}

export default A2HButton
