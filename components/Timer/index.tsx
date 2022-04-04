import React, { useEffect } from 'react'
import classnames from 'classnames';
import { useShiftContext } from "../../store";
import styles from './Timer.module.css'

const Timer: React.FC = () => {
  const {
    timer,
    startTicking,
    locations,
    setLocation,
    startTimer,
    stopTimer,
    fetchActiveShift
  } = useShiftContext();

  const { hours, minutes, seconds } = timer.time;

  useEffect(() => {
    fetchActiveShift();
  }, [])

  useEffect(() => {
    if (timer.startedAt === null) return
    return startTicking();
  }, [timer.startedAt])

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className={styles.location}>
        <select onChange={event => setLocation(event.target.value)}>
          {locations.map(location =>
            <option value={location} key={location}>{location}</option>
          )}
        </select>
      </div>
      <div className={classnames({
        [styles.toggle]: true,
        [styles.toggleActive]: timer.startedAt !== null
      })}>
        <button onClick={() => timer.startedAt === null ? startTimer() : stopTimer()}>
          {timer.startedAt === null ? 'Start' : 'Stop'} shift
        </button>
      </div>
    </div>
  )
}

export default Timer
