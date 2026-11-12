import Link from "next/link";

export default function Nav() {
  return (
    <ol className="flex gap-3 justify-center items-center">
      <li>
        <Link href="/">Home</Link>
      </li>
    </ol>
  );
}
