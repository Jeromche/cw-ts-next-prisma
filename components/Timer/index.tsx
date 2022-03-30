import React, { useEffect } from 'react'
import { timeUnits } from '../../lib/time'
import { locations } from '../../constants/locations'
import type { State } from '../../pages/index'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }

interface Props {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

const Timer: React.FC<Props> = ({ state, setState }) => {

  const start = async () => {
    try {
      const response = await fetch('/api/shift/start', {
        ...fetchInit,
        body: JSON.stringify({ location: state.location })
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
        time: { hours: 0, minutes: 0, seconds: 0 }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const fetchActiveShift = async () => {
    try {
      const response = await fetch('/api/shift/active', {
        method: 'GET',
        headers
      })
      const json = await response.json()
      if (json.shift === null) return
      const { shift: { createdAt } } = json
      setState({ ...state, startedAt: createdAt })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchActiveShift();
  }, [])

  useEffect(() => {
    if (state.startedAt === null) return;
    const delay = 1000;
    const interval = setInterval(() => {
      if (state.startedAt === null) {
        clearInterval(interval);
        return;
      }
      const startTime = new Date(state.startedAt).getTime();
      const currentTime = new Date().getTime();
      const units = timeUnits(currentTime - startTime)
      if (units === null) return;
      const { hours, minutes, seconds } = units;
      setState({ ...state, time: { hours, minutes, seconds } })
    }, delay)
    return () => clearInterval(interval);
  }, [state.startedAt])

  return (
    <div>
      <div>
        {state.time.hours < 10 ? `0${state.time.hours}` : state.time.hours}:
        {state.time.minutes < 10 ? `0${state.time.minutes}` : state.time.minutes}:
        {state.time.seconds < 10 ? `0${state.time.seconds}` : state.time.seconds}
      </div>
      <div>
        <select onChange={event => setState({ ...state, location: event.target.value })}>
          {locations.map(location =>
            <option value={location} key={location}>{location}</option>
          )}
        </select>
      </div>
      <button onClick={() => state.startedAt === null ? start() : stop()}>
        {state.startedAt === null ? 'Start' : 'Stop'} shift
      </button>
    </div>
  )
}

export default Timer
