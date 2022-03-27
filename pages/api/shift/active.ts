import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { ShiftStatus } from ".prisma/client";
import { prisma } from "../../../src/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const id = session?.user?.id;

  const shift = await prisma.shift.findFirst({
    where: {
      userId: id,
      status: ShiftStatus.ACTIVE,
    },
    select: {
      createdAt: true,
    },
  });

  res.json({ shift });
};
