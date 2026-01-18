import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/privacy/page'

test('Renders privacy policy page', () => {
  render(<Page />)
  expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
})
