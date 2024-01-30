import { prisma } from '@nicmosc/database';

import { ProjectContent } from '../../../../components/ProjectContent';
import { Modal } from './modal';

export default async function ProjectModal({ params: { id } }: { params: { id: string } }) {
  const data = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  if (!data) {
    return null;
  }
  return (
    <Modal>
      <ProjectContent project={data} />
    </Modal>
  );
}
