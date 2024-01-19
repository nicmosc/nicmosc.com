import { prisma } from '@nicmosc/database';
import { Button } from '@nicmosc/ui';
import Link from 'next/link';

export default async function Page() {
  const data = await prisma.project.findMany();
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="font-bold text-4xl mb-10">Projects</h1>
      <div className="flex flex-col gap-3">
        {data?.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <Button color="primary">{project.name}</Button>
          </Link>
        ))}
      </div>
    </main>
  );
}
