'use client';

import { Project } from '@nicmosc/database';
import { Button, Card, CardFooter, Image } from '@nicmosc/ui';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import NextImage from 'next/image';
import { MouseEvent } from 'react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const x = useMotionValue(100);
  const y = useMotionValue(100);

  const rotateX = useTransform(y, [0, 200], [5, -5]);
  const rotateY = useTransform(x, [0, 200], [-5, 5]);

  const handleMouseMove = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    animate(x, 100);
    animate(y, 100);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}>
      <Card
        isPressable
        as={motion.div}
        // @ts-ignore
        style={{ rotateX, rotateY }}
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7">
        <Image
          as={NextImage}
          width={700}
          height={700}
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={project.imageUrl}
        />
        <CardFooter className="absolute bg-black/40 bottom-[10px] left-[10px] w-[calc(100%-20px)] z-10 border-t-1 rounded-large border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <h4 className="text-white/90 font-medium text-xl">{project.name}</h4>
          </div>
          <Button radius="full" size="sm">
            View project
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
