import React from 'react'
import { timeUnits } from '../../lib/time'
import { Shift } from '.prisma/client'

interface ShiftListItemProps {
  shift: Shift
}

const ShiftListItem: React.FC<ShiftListItemProps> = ({ shift }) => {
  const formatDate = (datetime: Date) => {
    const date = new Date(datetime);
    return date.toLocaleDateString();
  }

  const startDate = formatDate(shift.createdAt);
  const endDate = formatDate(shift.updatedAt);

  const startTime = new Date(shift.createdAt).getTime();
  const currentTime = new Date(shift.updatedAt).getTime();
  const units = timeUnits(currentTime - startTime)

  return (
    <li>
      <div>{shift.location}</div>
      <div>{startDate}</div>
      {startDate !== endDate && (
        <div>{endDate}</div>
      )}
      {units && (
        <div>
          {units.hours < 10 ? `0${units.hours}` : units.hours}:
          {units.minutes < 10 ? `0${units.minutes}` : units.minutes}:
          {units.seconds < 10 ? `0${units.seconds}` : units.seconds}
        </div>
      )}
    </li>
  )
}

export default ShiftListItem
