import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { ShiftStatus } from '.prisma/client'
import { prisma } from '../../../src/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const id = session?.user?.id
  const shifts = await prisma.shift.findMany({
    where: {
      userId: id,
      status: ShiftStatus.INACTIVE,
    },
    select: {
      location: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: 'desc' }],
  })
  res.json({ shifts })
}
