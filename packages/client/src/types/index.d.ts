type OrientationLockType =
  | 'any'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'natural'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
interface ScreenOrientation extends EventTarget {
  lock(orientation: OrientationLockType): Promise<void>
}

type GameResult = {
  id: string
  stage: 'easy' | 'normal' | 'hard'
  date: Date
  result: 'clear' | 'death'
}
