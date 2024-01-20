'use client';

import type { Project } from '@nicmosc/database';
import { Button, Modal } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';

interface ProjectModalProps {
  mode: 'edit' | 'create';
  project?: Partial<Project>;
}

export const ProjectModal = ({ project, mode }: ProjectModalProps) => {
  const router = useRouter();
  return (
    <Modal open>
      <Modal.Header className="font-bold">
        {mode === 'create' ? 'Add new project' : `Edit ${project?.name}`}
      </Modal.Header>
      <Modal.Body>Press ESC key or click the button below to close</Modal.Body>
      <Modal.Actions>
        <Button onClick={() => router.back()}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
};
