import React from 'react'
import classnames from 'classnames';
import { locations } from '../../constants/locations'
import useTimer from '../../hooks/useTimer';
import type { State } from '../Shifts'
import styles from './Timer.module.css'

interface Props {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

const Timer: React.FC<Props> = ({ state, setState }) => {
  const { start, stop } = useTimer(state, setState)
  const { hours, minutes, seconds } = state.time;

  return (
    <div className={styles.container}>
      <div className={styles.time}>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className={styles.location}>
        <select onChange={event => setState({ ...state, location: event.target.value })}>
          {locations.map(location =>
            <option value={location} key={location}>{location}</option>
          )}
        </select>
      </div>
      <div className={classnames({
        [styles.toggle]: true,
        [styles.toggleActive]: state.startedAt !== null
      })}>
        <button onClick={() => state.startedAt === null ? start() : stop()}>
          {state.startedAt === null ? 'Start' : 'Stop'} shift
        </button>
      </div>
    </div>
  )
}

export default Timer
