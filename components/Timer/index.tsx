import React, { useState, useEffect } from 'react'
import { timeUnits } from '../../lib/time'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }

const Timer: React.FC = () => {
  const [timeFrom, setTimeFrom] = useState<number | null>(null);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRunning, setIsRunning] = useState(false);

  const start = async () => {
    try {
      await fetch('/api/shift/start', fetchInit);
      setIsRunning(true);
    } catch (error) {
      console.error(error);
    }
  }

  const stop = async () => {
    try {
      await fetch('/api/shift/stop', fetchInit);
      setIsRunning(false);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchActiveShift = async () => {
    try {
      const response = await fetch('/api/shift/active', {
        method: 'GET',
        headers
      });
      const { shift: { createdAt } } = await response.json();
      setTimeFrom(createdAt);
      setIsRunning(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchActiveShift();
  }, [])

  useEffect(() => {
    if (timeFrom === null) return;
    const delay = 1000;
    const interval = setInterval(() => {
      const startTime = new Date(timeFrom).getTime();
      const currentTime = new Date().getTime();
      const units = timeUnits(currentTime - startTime)
      if (units === null) return;
      setTime({
        hours: units?.hours,
        minutes: units?.minutes,
        seconds: units?.seconds
      })
    }, delay)
    return () => clearInterval(interval);
  }, [timeFrom])

  return (
    <div>
      <div>
        {time.hours < 10 ? `0${time.hours}` : time.hours}:
        {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </div>
      <button onClick={() => isRunning ? stop() : start()}>
        {isRunning ? 'Stop' : 'Start'} shift
      </button>
    </div>
  )
}

export default Timer
