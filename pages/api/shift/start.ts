import type { NextApiRequest, NextApiResponse } from "next";
import { ShiftStatus } from ".prisma/client";

import { getSession } from "next-auth/react";
import { prisma } from "../../../src/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = session?.user?.id;

  const activeShifts = await prisma.shift.findMany({
    where: { status: ShiftStatus.ACTIVE },
    select: { id: true },
  });

  if (activeShifts.length !== 0) {
    res.status(400).json({
      error: "Can't create a shift when shift is already in progress.",
      activeShifts,
    });
    return;
  }

  const result = await prisma.shift.create({
    data: { user: { connect: { id } } },
  });

  res.json(result);
};
