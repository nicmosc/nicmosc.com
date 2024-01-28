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
      <CardHeader>{project.name}</CardHeader>
      <Divider />
      <CardBody className="items-center text-center p-0">
        <p>{project.description}</p>
        <Image
          alt="Card background"
          className="w-full object-cover rounded-none"
          src={project.imageUrl}
        />
        <CardFooter className="justify-end">
          <Button variant="faded" onClick={() => router.push(`?activeId=${project.id}`)}>
            Edit
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};
