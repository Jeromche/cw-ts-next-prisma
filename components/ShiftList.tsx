import React from 'react'
import type { State } from './Shifts'
import useShiftList from '../hooks/useShiftList'
import Item from './ShiftListItem'

interface Props {
  state: State
}

const ShiftList: React.FC<Props> = ({ state }) => {
  const { status, shifts } = useShiftList(state)

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
