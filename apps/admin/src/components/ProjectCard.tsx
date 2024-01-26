import type { Project } from '@nicmosc/database';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nicmosc/ui';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>{project.name}</CardHeader>
      <CardBody className="items-center text-center">
        <p>{project.description}</p>
        <CardFooter className="justify-end">
          <Button variant="faded" onClick={() => router.push(`?activeId=${project.id}`)}>
            Edit
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};
