import type { Project } from '@nicmosc/database';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from '@nicmosc/ui';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{project.name}</p>
      </CardHeader>
      <CardBody className="overflow-visible">
        <Image alt="Card background" className="object-cover rounded-xl" src={project.imageUrl} />
      </CardBody>
      <CardFooter className="justify-end">
        <Button variant="faded" onClick={() => router.push(`?activeId=${project.id}`)}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
