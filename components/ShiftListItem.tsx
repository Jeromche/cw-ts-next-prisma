import React from 'react'
import { Shift } from '.prisma/client'
import { timeUnits } from '../lib/time'

interface ShiftListItemProps {
  shift: Shift
}

const ShiftListItem: React.FC<ShiftListItemProps> = ({ shift }) => {
  const formatDate = (datetime: Date) => {
    const date = new Date(datetime);
    return date.toLocaleDateString();
  }

  const startTime = new Date(shift.createdAt).getTime();
  const currentTime = new Date(shift.updatedAt).getTime();
  const units = timeUnits(currentTime - startTime)
  const { hours, minutes, seconds } = units;
  const startDate = formatDate(shift.createdAt);
  const endDate = formatDate(shift.updatedAt);

  return (
    <li>
      <div>{shift.location}</div>
      <div>{startDate}</div>
      {startDate !== endDate && (
        <div>{endDate}</div>
      )}
      {units && (
        <div>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      )}
    </li>
  )
}

export default ShiftListItem
