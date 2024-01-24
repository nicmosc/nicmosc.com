'use server';

import { prisma, Project } from '@nicmosc/database';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export interface GithubRepository {
  id: string;
  name: string;
  html_url: string;
}

export async function getGithubProjects() {
  try {
    const response: {
      data: GithubRepository[];
    } = await octokit.request<string>('GET /users/{user}/repos', {
      user: 'nicmosc',
      type: 'public',
      sort: 'pushed',
      direction: 'desc',
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export const updateProject = async (data: Project) => {
  const { id, ...rest } = data;
  try {
    const result = await prisma.project.update({
      where: {
        id: id,
      },
      data: rest,
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const createProject = async (data: Omit<Project, 'id'>) => {
  try {
    const result = await prisma.project.create({
      data,
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const result = await prisma.project.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};
