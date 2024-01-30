import { Project } from '@nicmosc/database';
import { Image } from '@nicmosc/ui';

interface ProjectContentProps {
  project: Project;
}

export const ProjectContent = ({ project }: ProjectContentProps) => {
  return (
    <main className="p-10 flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl mb-10 font-secondary">{project.name}</h1>
      <div className="p-5">
        <Image isBlurred src={project.imageUrl} />
      </div>
      <p className="mt-10" dangerouslySetInnerHTML={{ __html: project.description }} />
    </main>
  );
};
