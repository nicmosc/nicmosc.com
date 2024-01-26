import type { Project } from '@nicmosc/database';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nicmosc/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GithubRepository } from '../lib';

interface ProjectModalProps {
  mode: 'edit' | 'create';
  project?: Partial<Project>;
  repositories: GithubRepository[];
}

export const ProjectModal = ({ project, mode, repositories }: ProjectModalProps) => {
  const router = useRouter();
  const [repository, setRepository] = useState('default');
  const [title, setTitle] = useState(project?.name ?? '');
  const [description, setDescription] = useState(project?.description ?? '');

  const handleClose = () => {
    router.back();
  };

  const handleCreateProject = async () => {
    const res = await fetch(`/api/project`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        description,
      }),
    });
    if (res.ok) {
      handleClose();
    }
  };

  const handleUpdateProject = async () => {
    const res = await fetch(`/api/project/${project!.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        description,
      }),
    });
    if (res.ok) {
      handleClose();
    }
  };

  const handleDeleteProject = async () => {
    const res = await fetch(`/api/project/${project!.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      handleClose();
    }
  };

  return (
    <Modal isOpen onClose={handleClose}>
      <ModalContent>
        <ModalHeader className="font-bold">
          {mode === 'create' ? 'Add new project' : `Edit ${project?.name}`}
        </ModalHeader>
        <ModalBody>
          <Select
            placeholder="Choose a repostitory to highlight"
            value={repository}
            onChange={(event) => setRepository(event.target.value)}>
            {repositories.map((repo) => (
              <SelectItem key={repo.id} value={repo.name}>
                {repo.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Project name"
            className="w-full"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <Textarea
            label="Project description"
            className="w-full"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          {mode === 'edit' && (
            <Button color="danger" onClick={handleDeleteProject}>
              Delete
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="bordered" onClick={handleClose}>
            Close
          </Button>
          {mode === 'create' ? (
            <Button color="primary" onClick={handleCreateProject}>
              Create
            </Button>
          ) : (
            <Button color="primary" onClick={handleUpdateProject}>
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
