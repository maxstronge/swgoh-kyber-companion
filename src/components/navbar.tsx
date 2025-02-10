import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Kyber Companion
        </Link>
        <div className="space-x-4">
          <Link href="/teams" className="hover:underline">
            All Teams Ranked
          </Link>
          <Link href="/characters" className="hover:underline">
            All Characters Ranked
          </Link>
          <Link href="/factions" className="hover:underline">
            Faction Guides
          </Link>
        </div>
      </div>
    </nav>
  );
}
