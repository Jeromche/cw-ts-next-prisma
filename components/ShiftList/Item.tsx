import React from 'react'
import { Shift } from '.prisma/client'

interface ShiftListItemProps {
  shift: Shift
}

const ShiftListItem: React.FC<ShiftListItemProps> = ({ shift }) => {
  return (
    <li>
      {shift.createdAt} - {shift.updatedAt} - {shift.status} - {shift.location}
    </li>
  )
}

export default ShiftListItem
