import { prisma } from '@nicmosc/database';

import { ProjectContent } from '../../../components/ProjectContent';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!data) {
    return null;
  }
  return <ProjectContent project={data} />;
}
