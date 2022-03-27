import React, { useState, useEffect } from 'react'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'POST', headers }

const Timer: React.FC = () => {
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

  const toggle = () => {
    if (isRunning) {
      stop();
      return;
    }
    start();
  }

  const fetchShift = async () => {
    try {
      const result = await fetch('/api/shift/active', {
        method: 'GET',
        headers
      });
      console.log({ result })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchShift();
  }, [])

  return (
    <div>
      <div>00:00</div>
      <button onClick={toggle}>{isRunning ? 'Stop' : 'Start'} shift</button>
    </div>
  )
}

export default Timer
