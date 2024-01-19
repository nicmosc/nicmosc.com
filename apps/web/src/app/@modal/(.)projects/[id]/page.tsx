import { prisma } from '@nicmosc/database';

import { Modal } from './modal';

export default async function ProjectModal({ params: { id } }: { params: { id: string } }) {
  const data = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <Modal>
      <main className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mb-10">a single project: {data?.name}</h1>
        <h2 className="font-bold text-2xl">{data?.description}</h2>
      </main>
    </Modal>
  );
}
