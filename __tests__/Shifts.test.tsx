import { render, screen } from '@testing-library/react'
import Shifts from '../components/Shifts'
import "@testing-library/jest-dom";

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { id: '123' },
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {
        data: mockSession,
        status: 'authenticated',
      }
    }),
  }
})

describe('Shifts App', () => {
  it('renders a timer at 00:00:00 on first load', () => {
    render(<Shifts />)
    expect(screen.getByText('00:00:00')).toBeVisible()
  })
})