import { prisma } from '@nicmosc/database';
import { Button, Divider } from '@nicmosc/ui';
import Link from 'next/link';

import { ProjectCard, ProjectModal } from '../../components';

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string> | null | undefined;
}) {
  const projects = await prisma.project.findMany();

  const activeProjectId = searchParams?.activeId;
  const isModalShown = activeProjectId != null;

  const activeProject = projects.find((project) => project.id === activeProjectId);

  return (
    <div className="p-6">
      <div className="flex justify-end">
        <Link href="?activeId=new">
          <Button color="primary">+ Add new project</Button>
        </Link>
      </div>
      <div className="my-4">
        <Divider />
      </div>
      <div className="grid grid-cols-5 gap-3">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {isModalShown && (
        <ProjectModal mode={activeProject == null ? 'create' : 'edit'} project={activeProject} />
      )}
    </div>
  );
}
