import { useState } from 'react'
import Timer from '../components/Timer';
import ShiftList from '../components/ShiftList';
import { locations } from '../constants/locations'

export interface State {
  location: string
  startedAt: number | null
  time: {
    hours: number
    minutes: number
    seconds: number
  }
}

const initialState: State = {
  location: locations[0],
  startedAt: null,
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
}

const Shifts: React.FC = () => {
  const [state, setState] = useState<State>(initialState)

  return (
    <>
      <Timer state={state} setState={setState} />
      <ShiftList state={state} />
    </>
  )
}

export default Shifts
