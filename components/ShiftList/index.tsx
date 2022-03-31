import React from 'react'
import type { State } from '../../pages/index'
import useShiftList from '../../hooks/useShiftList'
import Item from './../ShiftListItem'
import styles from './ShiftList.module.css'

interface Props {
  state: State
}

const ShiftList: React.FC<Props> = ({ state }) => {
  const { status, shifts } = useShiftList(state)

  return (
    <div>
      <h2 className='text-1.5xl font-bold mb-2'>Finished Shifts</h2>
      {status === 'loading' && shifts.length === 0 ? (
        <div>Loading previous shifts&hellip;</div>
      ) : status === 'data' && (
        <ul className={styles.list}>
          {shifts.map((shift, index) => (
            <Item shift={shift} key={index} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ShiftList
