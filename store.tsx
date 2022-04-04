import { createContext, useContext, useState } from 'react'
import type { Shift } from '.prisma/client'
import { timeUnits } from './lib/time'

interface Timer {
  location: string
  startedAt: number | null
  time: {
    hours: number
    minutes: number
    seconds: number
  }
}

// @todo Read values from enum type.
const locations = ['Australia', 'Uruguay', 'Mexico']

const initialTimerState: Timer = {
  location: locations[0],
  startedAt: null,
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
}

const headers = { 'Content-Type': 'application/json' }

const useShifts = () => {
  const [timer, setTimer] = useState<Timer>(initialTimerState)
  const [shifts, setShifts] = useState<Shift[]>([])

  const setLocation = (location: string) => setTimer({ ...timer, location })

  const startTimer = async () => {
    const response = await fetch('/api/shift/start', {
      method: 'POST',
      headers,
      body: JSON.stringify({ location: timer.location }),
    })
    const { createdAt } = await response.json()
    setTimer({ ...timer, startedAt: createdAt })
  }

  const resetTimer = () => {
    setTimer({
      ...timer,
      startedAt: null,
      time: { hours: 0, minutes: 0, seconds: 0 },
    })
  }

  const stopTimer = async () => {
    const response = await fetch('/api/shift/stop', { method: 'POST', headers })
    const shift = await response.json();

    resetTimer();
    addShift(shift);
  }

  const startTicking = () => {
    const delay = 1000
    const interval = setInterval(() => {
      if (timer.startedAt === null) {
        clearInterval(interval)
        return
      }

      const startTime = new Date(timer.startedAt).getTime()
      const currentTime = new Date().getTime()
      const units = timeUnits(currentTime - startTime)
      const { hours, minutes, seconds } = units

      setTimer({ ...timer, time: { hours, minutes, seconds } })
    }, delay)

    return () => clearInterval(interval)
  }

  const fetchActiveShift = async () => {
    const response = await fetch('/api/shift/active', {
      method: 'GET',
      headers,
    })
    const json = await response.json()
    if (json.shift === null) return;
    setTimer({ ...timer, startedAt: json.shift.createdAt })
  }

  const fetchInactiveShifts = async () => {
    const response = await fetch('/api/shift/inactive', { method: 'GET', headers })
    const json = await response.json()

    setShifts(json.shifts)
  }

  const addShift = (shift: Shift): void => setShifts([shift, ...shifts])

  return {
    timer,
    setLocation,
    startTimer,
    stopTimer,
    startTicking,
    fetchActiveShift,
    fetchInactiveShifts,
    shifts,
    addShift,
    locations
  }
}

const ShiftContext = createContext<ReturnType<typeof useShifts> | null>(null);

export const useShiftContext = () => useContext(ShiftContext)!;

export function ShiftProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShiftContext.Provider value={useShifts()}>{children}</ShiftContext.Provider>
  );
}
