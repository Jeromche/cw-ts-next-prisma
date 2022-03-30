import React, { useState, useEffect } from 'react'
import type { Shift } from '.prisma/client'
import type { State } from '../../pages/index'
import Item from './Item'

type status = 'idle' | 'loading' | 'data' | 'error'

interface Props {
  state: State
}


const headers = { 'Content-Type': 'application/json' }
const fetchInit = { method: 'GET', headers }

const ShiftList: React.FC<Props> = ({ state }) => {
  const [status, setStatus] = useState<status>('idle')
  const [shifts, setShifts] = useState<Shift[]>([]);

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
    if (state.startedAt !== null) return;
    fetchShifts();
  }, [state.startedAt])

  return (
    <div>
      <h2>Finished Shifts</h2>
      {status === 'loading' && shifts.length === 0 ? (
        <div>Loading&hellip;</div>
      ) : status === 'data' && (
        <ul>
          {shifts.map((shift, index) => (
            <Item shift={shift} key={index} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ShiftList
