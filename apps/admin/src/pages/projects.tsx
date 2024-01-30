import { prisma } from '@nicmosc/database';
import { Button } from '@nicmosc/ui';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { getGithubProjects } from '../lib';

export const getServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  const githubProjects = await getGithubProjects();

  return { props: { projects, githubProjects } };
};

export default function Projects({
  projects,
  githubProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();

  const activeProjectId = searchParams.get('activeId');
  const isModalShown = activeProjectId != null;

  const activeProject = projects.find((project) => project.id === activeProjectId);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <Link shallow href="?activeId=new">
          <Button color="primary">+ Add new project</Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {isModalShown && (
        <ProjectModal
          repositories={githubProjects ?? []}
          mode={activeProject == null ? 'create' : 'edit'}
          project={activeProject}
        />
      )}
    </div>
  );
}
