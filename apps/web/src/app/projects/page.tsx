import { prisma } from "@nicmosc/database";
import Link from "next/link";

export default async function Page() {
  const data = await prisma.project.findMany();
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1>projects index</h1>
      {data.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          {project.name}
        </Link>
      ))}
    </main>
  );
}
