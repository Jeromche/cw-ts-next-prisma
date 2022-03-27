import React, { useState, useEffect } from 'react'
import { timeUnits } from '../../lib/time'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }

const Timer: React.FC = () => {
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

  const fetchShift = async () => {
    try {
      const response = await fetch('/api/shift/active', {
        method: 'GET',
        headers
      });

      const { shift } = await response.json();
      const creationDate = new Date(shift.createdAt);
      const creationTime = creationDate.getTime();
      const currentDate = new Date();
      const currentTime = currentDate.getTime();
      const elapsedTime = currentTime - creationTime;
      const units = timeUnits(elapsedTime)

      setTime({
        hours: units?.hours || 0,
        minutes: units?.minutes || 0,
        seconds: units?.seconds || 0
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchShift();
  }, [])

  return (
    <div>
      <div>{`${time.hours}:${time.minutes}:${time.seconds}`}</div>
      <button onClick={() => isRunning ? stop() : start()}>
        {isRunning ? 'Stop' : 'Start'} shift
      </button>
    </div>
  )
}

export default Timer
