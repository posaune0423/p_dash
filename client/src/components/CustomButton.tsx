import { forwardRef } from 'react'
import { Button, type ButtonProps } from './ui/button'

const CustomButton = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, className, size, variant, onClick }, ref) => {
    return (
      <div
        className={`rounded-md bg-gradient-to-tr from-pink-700 to-white p-px ${className}`}
        ref={ref}
      >
        <Button
          className='!hover:bg-indigo-800 w-full !bg-indigo-900 !text-gray-50'
          size={size}
          variant={variant}
          onClick={onClick}
        >
          {children}
        </Button>
      </div>
    )
  },
)

CustomButton.displayName = 'CustomButton'
export default CustomButton
