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

  if (req.method === 'PUT') {
    const data = req.body as Omit<Project, 'id'>;
    try {
      const result = await prisma.project.create({
        data,
      });
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }
}
