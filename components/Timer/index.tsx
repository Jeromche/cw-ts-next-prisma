import React, { useState, useEffect } from 'react'
import { prisma } from "../../src/prisma";

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const start = async () => {
    console.log('start');

    try {
      await fetch('/api/shift/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      setIsRunning(true);
    } catch (error) {
      console.error(error);
    }
  }

  const stop = async () => {
    console.log('stop');

    try {
      await fetch('/api/shift/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
