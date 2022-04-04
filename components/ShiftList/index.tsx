import React, { useEffect, useState } from 'react'
import { useShiftContext } from "../../store";
import Item from './../ShiftListItem'
import styles from './ShiftList.module.css'

const ShiftList: React.FC = () => {
  const {
    shifts,
    fetchInactiveShifts,
  } = useShiftContext();

  const [isLoading, setIsLoading] = useState(false);

  const fetchShifts = async () => {
    setIsLoading(true);
    await fetchInactiveShifts();
    setIsLoading(false)
  }

  useEffect(() => {
    fetchShifts()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className='text-1.5xl font-bold mb-2'>Finished Shifts</h2>
      {isLoading && shifts.length === 0 ? (
        <div>Loading previous shifts&hellip;</div>
      ) : (
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
