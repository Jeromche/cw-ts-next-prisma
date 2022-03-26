import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { prisma } from "../../../src/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const userId = session?.user.id;

  // @todo Check if there is already a shift in progress.

  const result = await prisma.shift.create({
    data: { user: { connect: { id: userId } } },
  });
  res.json(result);
};
