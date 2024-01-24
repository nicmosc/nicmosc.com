'use client';

import type { Project } from '@nicmosc/database';
import { Button, Input, Modal, Select, Textarea } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  createProject,
  deleteProject,
  GithubRepository,
  updateProject,
} from '../app/projects/actions';

interface ProjectModalProps {
  mode: 'edit' | 'create';
  project?: Partial<Project>;
  repositories: GithubRepository[];
  onClose: VoidFunction;
}

export const ProjectModal = ({ project, mode, repositories, onClose }: ProjectModalProps) => {
  const router = useRouter();
  const [repository, setRepository] = useState('default');
  const [title, setTitle] = useState(project?.name ?? '');
  const [description, setDescription] = useState(project?.description ?? '');

  const handleClose = () => {
    router.back();
  };

  const handleCreateProject = async () => {
    const res = await createProject({
      name: title,
      description,
    });
    if (res != null) {
      handleClose();
      onClose();
    }
  };

  const handleUpdateProject = async () => {
    const res = await updateProject({
      id: project?.id!,
      name: title,
      description,
    });
    if (res != null) {
      handleClose();
      onClose();
    }
  };

  const handleDeleteProject = async () => {
    const res = await deleteProject(project?.id!);
    if (res != null) {
      handleClose();
      onClose();
    }
  };

  return (
    <Modal open>
      <Modal.Header className="font-bold">
        {mode === 'create' ? 'Add new project' : `Edit ${project?.name}`}
      </Modal.Header>
      <Modal.Body>
        <span className="mr-5">Select project</span>
        <Select value={repository} onChange={(event) => setRepository(event.target.value)}>
          <option value={'default'} disabled>
            Choose a repostitory to highlight
          </option>
          {repositories.map((repo) => (
            <option key={repo.id} value={repo.id}>
              {repo.name}
            </option>
          ))}
        </Select>
        <div className="my-4" />
        <label className="label">
          <span className="label-text">Project name</span>
        </label>
        <Input className="w-full" value={title} onChange={(e: any) => setTitle(e.target.value)} />

        <div className="my-4" />
        <label className="label">
          <span className="label-text">Project description</span>
        </label>
        <Textarea
          className="w-full"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Actions>
        {mode === 'edit' && (
          <Button color="error" onClick={handleDeleteProject}>
            Delete
          </Button>
        )}
        <div className="flex-1" />
        <Button variant="outline" onClick={handleClose}>
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
      </Modal.Actions>
    </Modal>
  );
};
