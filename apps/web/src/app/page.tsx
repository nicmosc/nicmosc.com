import { Button } from '@nicmosc/ui';
import Link from 'next/link';

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="font-bold text-4xl mb-10">Website</h1>
      <div className="flex gap-3">
        <Link href="/projects">
          <Button color="primary">Projects</Button>
        </Link>
        <Link href="/cv">
          <Button color="primary">CV</Button>
        </Link>
      </div>
    </main>
  );
}
