import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Page from '../app/page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

test('Renders page', () => {
  render(<Page />)
  expect(true).toBe(true)
})
