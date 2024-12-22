import React, { useEffect, useState } from 'react'

interface ConfettiPiece {
  left: string
  backgroundColor: string
  width: string
  height: string
  fallDuration: number
  rotationDirection: number
  swayAmount: number
}

const generateVibrantColor = (): string => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 20) + 80 // 80-100%
  const lightness = Math.floor(Math.random() * 30) + 60 // 60-90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const generatePastelColor = (): string => {
  const hue = Math.floor(Math.random() * 360)
  const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
  const lightness = Math.floor(Math.random() * 10) + 85 // 85-95%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const generateColor = (): string => {
  return Math.random() > 0.3 ? generateVibrantColor() : generatePastelColor()
}

export const ConfettiEffect = () => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 100 }, () => ({
      left: `${Math.random() * 100}%`,
      backgroundColor: generateColor(),
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 15 + 10}px`,
      fallDuration: Math.random() * 5 + 10,
      rotationDirection: Math.random() > 0.5 ? 1 : -1,
      swayAmount: Math.random() * 30 + 20,
    }))
    setConfettiPieces(pieces)
  }, [])

  return (
    <>
      <style>{`
        @keyframes fall {
          0% {
            transform: translate(0, -10vh) rotate(0deg);
          }
          100% {
            transform: translate(var(--sway-amount), 110vh) rotate(var(--rotation-amount));
          }
        }
        .confetti-piece {
          position: absolute;
          will-change: transform;
          animation: fall var(--fall-duration) linear infinite;
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {confettiPieces.map((piece, index) => (
          <div
            key={index}
            className="confetti-piece"
            style={
              {
                left: piece.left,
                top: '-20px',
                backgroundColor: piece.backgroundColor,
                width: piece.width,
                height: piece.height,
                '--fall-duration': `${piece.fallDuration}s`,
                '--sway-amount': `${piece.swayAmount * (Math.random() > 0.5 ? 1 : -1)}px`,
                '--rotation-amount': `${720 * piece.rotationDirection}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  )
}
