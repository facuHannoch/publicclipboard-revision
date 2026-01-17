import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('Renders page', () => {
  render(<Page />)
  expect(true).toBe(true)
})
