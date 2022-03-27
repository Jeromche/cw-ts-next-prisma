import React, { useState } from 'react'
// import { useSession } from 'next-auth/react'

const Timer: React.FC = () => {
  // const { data: session } = useSession()

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

  const stop = () => {
    console.log('stop');
    setIsRunning(false);
  }

  const toggle = () => {
    if (isRunning) {
      stop();
      return;
    }

    start();
  }

  return (
    <div>
      <div>00:00</div>
      <button onClick={toggle}>{isRunning ? 'Stop' : 'Start'} shift</button>
    </div>
  )
}

export default Timer