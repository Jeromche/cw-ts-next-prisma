import React from 'react'
import { locations } from '../constants/locations'
import useTimer from '../hooks/useTimer';
import type { State } from './Shifts'

interface Props {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

const Timer: React.FC<Props> = ({ state, setState }) => {
  const { start, stop } = useTimer(state, setState)
  const { hours, minutes, seconds } = state.time;

  return (
    <div>
      <div data-testid="timer-value">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        <select onChange={event => setState({ ...state, location: event.target.value })}>
          {locations.map(location =>
            <option value={location} key={location}>{location}</option>
          )}
        </select>
      </div>
      <button onClick={() => state.startedAt === null ? start() : stop()}>
        {state.startedAt === null ? 'Start' : 'Stop'} shift
      </button>
    </div>
  )
}

export default Timer
