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

declare module 'idle-task' {
  export const setIdleTask: (task: IdleTaskFunction, options?: SetIdleTaskOptions) => IdleTaskKey
}
