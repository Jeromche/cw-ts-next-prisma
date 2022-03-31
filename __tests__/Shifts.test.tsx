import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import mockFetchPromise from '../jest/fetch'
import Shifts from '../components/Shifts'
import "@testing-library/jest-dom";

function mockNextAuth() {
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
}

// Mock fetch and useSession.
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
jest.mock('next-auth/react', mockNextAuth)

// describe('Shifts App', () => {
//   it('renders a timer at 00:00:00 on first load', () => {
//     act(() => {
//       render(<Shifts />)
//     });
//     expect(screen.getByText('00:00:00')).toBeVisible()
//   })
// })
