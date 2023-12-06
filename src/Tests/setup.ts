import '@testing-library/jest-dom/vitest'
import { cleanup, render } from '@testing-library/vue'
import { afterEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import merge from 'lodash/merge'

export * from '@testing-library/vue'
afterEach(() => {
  cleanup()
})

export function renderComponent(element: any, options = {}) {
  const pinia = createTestingPinia({ stubActions: false })

  const defaultOptions = {
    global: {
      plugins: [pinia]
    }
  }
  const mergedOptions = merge(defaultOptions, options)

  return { ...render(element, mergedOptions) }
}
