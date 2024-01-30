import type { Project } from '@nicmosc/database';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image } from '@nicmosc/ui';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  return (
    <Card className="h-[250px]">
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{project.name}</p>
      </CardHeader>
      <CardBody className="overflow-hidden ">
        <Image
          removeWrapper
          alt="Card background"
          className="object-cover rounded-xl h-full min-h-0 flex-1"
          src={project.imageUrl}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <Chip size="sm" color={project.draft ? 'default' : 'success'}>
          {project.draft ? 'Draft' : 'Published'}
        </Chip>
        <Button variant="faded" onClick={() => router.push(`?activeId=${project.id}`)}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
