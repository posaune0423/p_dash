export const getPinchDistance = (touches: React.TouchList) => {
  return Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY,
  )
}

export const getTouchPositions = (touches: React.TouchList) => {
  return [
    { x: touches[0].clientX, y: touches[0].clientY },
    { x: touches[1].clientX, y: touches[1].clientY },
  ]
}
