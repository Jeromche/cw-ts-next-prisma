import React, { useState, useEffect } from 'react'
import { timeUnits } from '../../lib/time'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }
const locations = ['Australia', 'Uruguay', 'Mexico']

const Timer: React.FC = () => {
  const [location, setLocation] = useState(locations[0])
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const start = async () => {
    try {
      const response = await fetch('/api/shift/start', {
        ...fetchInit,
        body: JSON.stringify({ location })
      })
      const { createdAt } = await response.json()
      setStartedAt(createdAt)
    } catch (error) {
      console.error(error)
    }
  }

  const stop = async () => {
    try {
      await fetch('/api/shift/stop', fetchInit)
      setStartedAt(null)
      setTime({ hours: 0, minutes: 0, seconds: 0 })
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
      setStartedAt(createdAt)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchActiveShift();
  }, [])

  /**
   * @todo Stop the interval when stopping as well.
   */
  useEffect(() => {
    if (startedAt === null) return;
    const delay = 1000;
    const interval = setInterval(() => {
      const startTime = new Date(startedAt).getTime();
      const currentTime = new Date().getTime();
      const units = timeUnits(currentTime - startTime)
      if (units === null) return;
      const { hours, minutes, seconds, ...rest } = units;
      setTime({ hours, minutes, seconds })
    }, delay)
    return () => clearInterval(interval);
  }, [startedAt])

  return (
    <div>
      <div>
        {time.hours < 10 ? `0${time.hours}` : time.hours}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </div>
      <div>
        <select onChange={event => setLocation(event.target.value)}>
          {locations.map(location =>
            <option value={location} key={location}>{location}</option>
          )}
        </select>
      </div>
      <button onClick={() => startedAt === null ? start() : stop()}>
        {startedAt === null ? 'Start' : 'Stop'} shift
      </button>
    </div>
  )
}

export default Timer
