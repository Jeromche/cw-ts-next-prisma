import { useState, useEffect } from 'react'
import type { Shift } from '.prisma/client'
import type { State } from '../pages/index'

type Status = 'idle' | 'loading' | 'data' | 'error'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'GET', headers }

export default function useShiftList(state: State): {
  status: Status
  shifts: Shift[]
} {
  const [status, setStatus] = useState<Status>('idle')
  const [shifts, setShifts] = useState<Shift[]>([])

  const fetchShifts = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/shift/inactive', fetchInit)
      const json = await response.json()
      setStatus('data')
      // @todo would be nice to merge the new shifts with the old.
      setShifts(json.shifts)
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (state.startedAt !== null) return
    fetchShifts()
  }, [state.startedAt])

  return { status, shifts } as const
}
