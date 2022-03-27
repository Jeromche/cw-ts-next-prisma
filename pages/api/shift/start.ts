import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ShiftStatus } from ".prisma/client";
import { prisma } from "../../../src/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = session?.user?.id;

  const activeShift = await prisma.shift.findFirst({
    where: {
      userId: id,
      status: ShiftStatus.ACTIVE,
    },
    select: { id: true },
  });

  if (activeShift !== null) {
    res.status(400).json({
      error: "Can't create a shift when shift is already in progress.",
      activeShift,
    });
    return;
  }

  const result = await prisma.shift.create({
    data: { user: { connect: { id } } },
  });

  res.json(result);
};
