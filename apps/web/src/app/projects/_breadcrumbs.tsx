'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nicmosc/ui';

export const ProjectBreadcrumbs = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
    </Breadcrumbs>
  );
};
