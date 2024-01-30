import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-24">
      <h1 className="font-bold text-6xl mb-3 font-secondary">Hello there</h1>
      <p className="mb-10 text-lg text-neutral-600">
        I'm Nic, and I do frontend stuff. This is my personal website.
      </p>
      <div className="flex flex-1 min-h-0 w-full gap-80">
        <Link className="flex-1 p-10 rounded border border-white" href="/projects">
          <div>Projects</div>
        </Link>
        <Link className="flex-1 p-10 rounded border border-white" href="/about">
          <div>About</div>
        </Link>
      </div>
    </main>
  );
}
