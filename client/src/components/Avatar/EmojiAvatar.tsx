import { emojiAvatarForAddress } from './emojiAvatarForAddress'

const EmojiAvatar = ({
  address,
  ensImage,
  size,
}: {
  address: string
  ensImage?: string | null
  size: number
}) => {
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address)

  return ensImage ? (
    <div
      className='absolute rounded-full bg-cover bg-center'
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `url(${ensImage})`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  ) : (
    <div
      className='flex items-center justify-center overflow-hidden rounded-full'
      style={{
        backgroundColor: backgroundColor,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {emoji}
    </div>
  )
}

export default EmojiAvatar
