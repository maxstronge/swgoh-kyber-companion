'use client';

import Link from 'next/link';
import rawCharacterData from '@/data/characters.json';
import { Character, CharacterRankTier } from '@/types';

// The rank order from top to bottom
const rankOrder: CharacterRankTier[] = [
  'Galactic Legend',
  'Grand Master',
  'Master',
  'Knight',
  'Padawan',
  'Youngling',
];

export default function AllCharactersPage() {
  // Transform your raw JSON into the Character interface
  const allCharacters = (rawCharacterData as any[]).map((row) => ({
    id: row.baseid,
    name: row.name,
    portraitUrl: `/characterprofiles/${row['imageurl-src']}`,
    rankTier: row.rank?.trim() || 'Youngling',
  })) as Character[];

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <header className="p-6 pb-2">
        <h1 className="text-2xl font-bold mb-2">All Characters Ranked</h1>
      </header>

      <div className="p-6 space-y-6">
        {rankOrder.map((tier) => {
          // Filter out characters in this rank tier
          const charsInTier = allCharacters.filter((c) => c.rankTier === tier);
          if (charsInTier.length === 0) return null;

          return (
            <section
              key={tier}
              className="border border-gray-700 bg-gray-800 p-4 rounded"
            >
              <h2 className="text-lg font-semibold mb-3">{tier}</h2>

              {/* 
                Instead of a grid, use flex + wrap:
                Each item is a fixed 22×22 card, same as Teams. 
                gap-4 ensures spacing between items.
              */}
              <div className="flex flex-wrap gap-4">
                {charsInTier.map((char) => (
                  <Link
                    key={char.id}
                    href={`/characters/${char.id}`}
                    className="group text-center"
                  >
                    {/* EXACT Teams icon styling */}
                    <div
                      className="
                        relative
                        h-24 w-24
                        bg-gray-700
                        border border-gray-600
                        rounded
                        flex items-center justify-center
                        overflow-hidden
                        transition-transform duration-200
                        group-hover:scale-105
                      "
                    >
                      <img
                        src={char.portraitUrl}
                        alt={char.name}
                        className="h-22 w-22 object-contain"
                      />
                    </div>
                    
                    {/* Name below, forced to 22 wide, matching the icon container */}
                    <span className="
                      mt-1
                      block
                      w-24
                      text-xs text-gray-300
                      group-hover:text-blue-400
                      leading-tight
                      mx-auto
                      break-words
                      whitespace-normal
                    ">
                      {char.name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
