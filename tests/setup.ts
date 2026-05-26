import '@testing-library/jest-dom'

// BroadcastChannel não existe no jsdom — mock mínimo para o cart store
if (typeof globalThis.BroadcastChannel === 'undefined') {
  class BroadcastChannelMock {
    name: string
    onmessage: ((ev: MessageEvent) => void) | null = null
    constructor(name: string) { this.name = name }
    postMessage(_data: unknown) {}
    addEventListener(_type: string, _listener: EventListenerOrEventListenerObject) {}
    removeEventListener(_type: string, _listener: EventListenerOrEventListenerObject) {}
    close() {}
    dispatchEvent(_event: Event): boolean { return true }
  }
  // @ts-expect-error mock
  globalThis.BroadcastChannel = BroadcastChannelMock
}
