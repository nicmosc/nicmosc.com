import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1>Website</h1>
      <br />
      <Link href="/projects">Projects</Link>

      <Link href="/cv">CV</Link>
    </main>
  );
}
