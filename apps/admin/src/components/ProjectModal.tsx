import type { Project } from '@nicmosc/database';
import {
  Alert,
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
  const [repository, setRepository] = useState(
    project?.githubId ? String(project?.githubId) : undefined,
  );
  const [title, setTitle] = useState(project?.name ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [imageUrl, setImageUrl] = useState(
    'https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg?w=680',
  );

  console.log({ repository, repositories });

  const [error, setError] = useState<string>();

  const triggerAlert = (error: string) => {
    setError(error);

    setTimeout(() => {
      setError(undefined);
    }, 2000);
  };

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
        githubId: Number(repository),
        imageUrl,
      }),
    });
    if (res.ok) {
      handleClose();
    } else {
      triggerAlert('Something went wrong');
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
        githubId: Number(repository),
        imageUrl,
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
            isRequired
            placeholder="Choose a repostitory to highlight"
            selectedKeys={repository && [repository]}
            onChange={(event) => setRepository(event.target.value)}>
            {repositories.map((repo) => (
              <SelectItem key={repo.id} value={repo.id}>
                {repo.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            isRequired
            label="Project name"
            className="w-full"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <Textarea
            isRequired
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
      {error && <Alert type="danger" content={error} />}
    </Modal>
  );
};
