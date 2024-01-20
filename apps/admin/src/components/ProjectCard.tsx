'use client';

import type { Project } from '@nicmosc/database';
import { Button, Card } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  return (
    <Card>
      {/* <Card.Image
    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
    alt="Shoes"
  /> */}
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">{project.name}</Card.Title>
        <p>{project.description}</p>
        <Card.Actions className="justify-end">
          <Button color="secondary" onClick={() => router.push(`?activeId=${project.id}`)}>
            Edit
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
};
