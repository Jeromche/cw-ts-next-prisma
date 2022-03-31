import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ShiftStatus } from '.prisma/client'
import { prisma } from '../../../src/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const id = session?.user?.id

  const shift = await prisma.shift.findFirst({
    where: { userId: id, status: ShiftStatus.ACTIVE },
    select: { id: true },
  })

  if (shift === null) {
    res.status(400).json({
      error: 'There are no active shifts.',
    })
    return
  }

  const result = await prisma.shift.update({
    where: { id: shift.id },
    data: { status: ShiftStatus.INACTIVE },
  })

  res.json(result)
}

export default handler
