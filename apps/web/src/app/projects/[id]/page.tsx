import { prisma } from "@nicmosc/database";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>a single project: {data?.name}</h1>
      <h2>{data?.description}</h2>
    </main>
  );
}
