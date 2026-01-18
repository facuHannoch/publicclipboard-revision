import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/boards/[board_number]/page'

jest.mock('next/navigation', () => ({
  useParams: () => ({ board_number: '42' }),
}))

test('Renders board page', () => {
  render(<Page />)
  expect(screen.getByText('Public Clipboard')).toBeInTheDocument()
  expect(screen.getByText('#42')).toBeInTheDocument()
})
