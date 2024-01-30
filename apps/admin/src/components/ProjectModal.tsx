import type { Project } from '@nicmosc/database';
import {
  Alert,
  Button,
  ImageUpload,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@nicmosc/ui';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useUploadFile } from '../hooks';
import { GithubRepository } from '../lib';

interface ProjectFormType {
  repository: string;
  title: string;
  description: string;
  imageUrl: string;
  isDraft: boolean;
  isVisibleInCv: boolean;
}

interface ProjectModalProps {
  mode: 'edit' | 'create';
  project?: Partial<Project>;
  repositories: GithubRepository[];
}

export const ProjectModal = ({ project, mode, repositories }: ProjectModalProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const { upload } = useUploadFile();
  const { setValue, watch, handleSubmit, control } = useForm<ProjectFormType>({
    defaultValues: {
      imageUrl: project?.imageUrl,
      repository: project?.githubId ? String(project.githubId) : undefined,
      title: project?.name,
      description: project?.description,
      isDraft: project?.draft,
      isVisibleInCv: project?.showInCv,
    },
  });

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

  const handleCreateProject: SubmitHandler<ProjectFormType> = async (data) => {
    const res = await fetch(`/api/project`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.title,
        description: data.description,
        githubId: Number(data.repository),
        imageUrl: data.imageUrl,
        draft: data.isDraft,
        showInCv: data.isVisibleInCv,
      } satisfies Omit<Project, 'id'>),
    });
    if (res.ok) {
      handleClose();
    } else {
      triggerAlert('Something went wrong');
    }
  };

  const handleUpdateProject: SubmitHandler<ProjectFormType> = async (data) => {
    const res = await fetch(`/api/project/${project!.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.title,
        description: data.description,
        githubId: Number(data.repository),
        imageUrl: data.imageUrl,
        draft: data.isDraft,
        showInCv: data.isVisibleInCv,
      } satisfies Omit<Project, 'id'>),
    });
    if (res.ok) {
      handleClose();
    } else {
      triggerAlert('Something went wrong');
    }
  };

  const handleUploadImage = async (file: File) => {
    setIsUploading(true);
    const { url, error } = await upload(file);
    setIsUploading(false);
    if (error) {
      setError(error);
    } else {
      console.log({ url });
      setValue('imageUrl', url!);
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
    <form
      id="project-form"
      onSubmit={handleSubmit(mode === 'create' ? handleCreateProject : handleUpdateProject)}>
      <Modal size="3xl" isOpen onClose={handleClose} scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="font-bold">
            {mode === 'create' ? 'Add new project' : `Edit ${project?.name}`}
          </ModalHeader>
          <ModalBody>
            <Controller
              name="repository"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isRequired
                  placeholder="Choose a repostitory to highlight"
                  selectedKeys={field.value && [field.value]}
                  onChange={field.onChange}>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.id}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input isRequired label="Project name" className="w-full" {...field} />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea isRequired label="Project description" className="w-full" {...field} />
              )}
            />

            <ImageUpload
              onChange={handleUploadImage}
              value={watch('imageUrl')}
              isUploading={isUploading}
            />
            <Controller
              name="isDraft"
              control={control}
              render={({ field }) => (
                <Switch isSelected={field.value} onValueChange={field.onChange}>
                  Is draft
                </Switch>
              )}
            />
            <Controller
              name="isVisibleInCv"
              control={control}
              render={({ field }) => (
                <Switch isSelected={field.value} onValueChange={field.onChange}>
                  Visible in CV
                </Switch>
              )}
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
              <Button color="primary" type="submit" form="project-form">
                Create
              </Button>
            ) : (
              <Button color="primary" type="submit" form="project-form">
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
        {error && <Alert type="danger" content={error} />}
      </Modal>
    </form>
  );
};
