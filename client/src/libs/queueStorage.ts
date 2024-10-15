export class FixedLengthQueueStorage<T> {
  private queue: T[]
  private maxSize: number
  private storageKey: string

  constructor(maxSize: number, storageKey: string) {
    this.queue = []
    this.maxSize = maxSize
    this.storageKey = storageKey
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    const storedQueue = localStorage.getItem(this.storageKey)
    if (storedQueue) {
      this.queue = JSON.parse(storedQueue)
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.queue))
  }

  enqueue(item: T): void {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift()
    }
    this.queue.push(item)
    this.saveToStorage()
  }

  dequeue(): T | undefined {
    const item = this.queue.shift()
    this.saveToStorage()
    return item
  }

  peek(): T | undefined {
    return this.queue[0]
  }

  size(): number {
    return this.queue.length
  }

  isFull(): boolean {
    return this.queue.length === this.maxSize
  }

  isEmpty(): boolean {
    return this.queue.length === 0
  }

  getLatest(): T | undefined {
    return this.queue[this.queue.length - 1]
  }

  getQueue(): T[] {
    return [...this.queue]
  }
}
