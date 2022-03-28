import React, { useState, useEffect } from 'react'

type status = 'idle' | 'loading' | 'data' | 'error'

const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'GET', headers }

const ShiftList: React.FC = () => {
  const [status, setStatus] = useState<status>('idle')
  const [shifts, setShifts] = useState([]);

  const fetchShifts = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/shift/inactive', fetchInit)
      const json = await response.json();
      setStatus('data');
      setShifts(json.shifts);
    } catch (error) {
      setStatus('error')
    }
  }

  useEffect(() => {
    fetchShifts();
  }, [])

  return (
    <div>
      <h2>Finished Shifts</h2>
    </div>
  )
}

export default ShiftList
