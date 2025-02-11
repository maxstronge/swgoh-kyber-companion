'use client';

import Link from 'next/link';
import factions from '@/data/factionGuide.json';
import { Faction } from '@/types';

export default function FactionsPage() {
  // Filter factions that have at least one zeta or omicron
  const filteredFactions = (factions as Faction[]).filter(
    (faction) => faction.zetas.length > 0 || faction.omicrons.length > 0
  );

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Faction Guides</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredFactions.map((faction) => (
          <Link
            key={faction.id}
            href={`/factions/${faction.id}`}
            className="group flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="w-24 h-24 bg-gray-700 border border-gray-600 rounded flex items-center justify-center overflow-hidden">
              <img 
                src={`/factionicons/${faction.id}.png`}
                alt={faction.name}
                className="w-full h-full object-contain" />
            </div>
            <p className="mt-2 text-gray-300 group-hover:text-blue-400">{faction.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
