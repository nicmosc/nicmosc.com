import { prisma } from '@nicmosc/database';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="font-bold text-4xl mb-10">a single project: {data?.name}</h1>
      <h2 className="font-bold text-2xl">{data?.description}</h2>
    </main>
  );
}
