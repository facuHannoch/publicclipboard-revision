import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/terms/page'

test('Renders terms of service page', () => {
  render(<Page />)
  expect(screen.getByText('Terms of Service')).toBeInTheDocument()
})
