import { prisma } from '@nicmosc/database';
import Link from 'next/link';

import { ProjectCard } from '../../components/ProjectCard';
import { ProjectBreadcrumbs } from './_breadcrumbs';

export default async function Page() {
  const data = await prisma.project.findMany({
    where: {
      draft: false,
    },
  });

  return (
    <main className="p-6">
      <ProjectBreadcrumbs />
      <h1 className="font-bold text-6xl my-10 font-secondary">Projects</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-10 grid-cols-1">
        {data?.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <ProjectCard project={project} />
          </Link>
        ))}
      </div>
    </main>
  );
}
