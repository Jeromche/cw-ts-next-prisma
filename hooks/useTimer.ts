import React, { useEffect } from 'react'
import { timeUnits } from '../lib/time'
import type { State } from '../components/Shifts'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }

export default function useTimer(
  state: State,
  setState: React.Dispatch<React.SetStateAction<State>>
): {
  start: () => void
  stop: () => void
} {
  const start = async () => {
    try {
      const response = await fetch('/api/shift/start', {
        ...fetchInit,
        body: JSON.stringify({ location: state.location }),
      })
      const { createdAt } = await response.json()
      setState({ ...state, startedAt: createdAt })
    } catch (error) {
      console.error(error)
    }
  }

  const stop = async () => {
    try {
      await fetch('/api/shift/stop', fetchInit)
      setState({
        ...state,
        startedAt: null,
        time: { hours: 0, minutes: 0, seconds: 0 },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchActiveShift = async () => {
    try {
      const response = await fetch('/api/shift/active', {
        method: 'GET',
        headers,
      })
      const json = await response.json()
      if (json.shift === null) return
      const {
        shift: { createdAt },
      } = json
      setState({ ...state, startedAt: createdAt })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchActiveShift()
  }, [])

  useEffect(() => {
    if (state.startedAt === null) return
    const delay = 1000
    const interval = setInterval(() => {
      if (state.startedAt === null) {
        clearInterval(interval)
        return
      }
      const startTime = new Date(state.startedAt).getTime()
      const currentTime = new Date().getTime()
      const units = timeUnits(currentTime - startTime)
      const { hours, minutes, seconds } = units
      setState({ ...state, time: { hours, minutes, seconds } })
    }, delay)
    return () => clearInterval(interval)
  }, [state.startedAt])

  return { start, stop } as const
}
