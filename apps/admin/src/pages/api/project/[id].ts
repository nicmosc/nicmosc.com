import { prisma, Project } from '@nicmosc/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';

type Response = Project | { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const session = await getServerSession(req, res, authOptions);

  if (session == null) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  if (req.method === 'POST') {
    const id = req.query.id as string;
    const { id: _, ...rest } = req.body as Project;
    try {
      const result = await prisma.project.update({
        where: {
          id: id,
        },
        data: rest,
      });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = req.query.id as string;
      const result = await prisma.project.delete({
        where: {
          id,
        },
      });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }
}
