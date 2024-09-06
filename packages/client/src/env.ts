import { vercel } from '@t3-oss/env-core/presets'
import { createEnv } from '@t3-oss/env-nextjs'
import { type ZodError, z } from 'zod'

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_MASTER_ADDRESS: z.custom<`0x${string}`>(),
    NEXT_PUBLIC_MASTER_PRIVATE_KEY: z.custom<`0x${string}`>(),
    NEXT_PUBLIC_NODE_URL: z.string().url(),
    NEXT_PUBLIC_TORII: z.string().url(),
    NEXT_PUBLIC_DEBUG: z.boolean(),
    NEXT_PUBLIC_PROFILE: z.enum(['dev', 'slot']),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NEXT_PUBLIC_MASTER_ADDRESS: process.env.NEXT_PUBLIC_MASTER_ADDRESS,
    NEXT_PUBLIC_MASTER_PRIVATE_KEY: process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY,
    NEXT_PUBLIC_NODE_URL: process.env.NEXT_PUBLIC_NODE_URL,
    NEXT_PUBLIC_TORII: process.env.NEXT_PUBLIC_TORII,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG === 'true',
    NEXT_PUBLIC_PROFILE: process.env.NEXT_PUBLIC_PROFILE,
  },
  extends: [vercel()],
  onValidationError: (error: ZodError) => {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
    throw new Error('Invalid environment variables')
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    console.error(
      '❌ Attempted to access a server-side environment variable on the client:',
      variable,
    )
    throw new Error('❌ Attempted to access a server-side environment variable on the client')
  },
})
