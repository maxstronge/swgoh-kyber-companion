'use client';

import { useState } from 'react';
import Link from 'next/link';
import teamData from '@/data/teams.json';
import { Team, Character } from '@/types';
import rawCharacterData from '@/data/characters.json';

export default function TeamsPage() {
  // 1) Build character lookup
  const allCharacters = (rawCharacterData as any[]).map((row) => ({
    id: row.baseid,
    name: row.name,
    portraitUrl: `/characterprofiles/${row['imageurl-src']}`,
    rankTier: row.rank?.trim() ?? 'Youngling',
  })) as Character[];

  const characterMap: Record<string, Character> = {};
  for (const char of allCharacters) {
    characterMap[char.id] = char;
  }

  // 2) Teams data
  const [teams] = useState<Team[]>(teamData as Team[]);

  // 3) Global tab state: either "GAC" or "TW"
  const [activeGlobalTab, setActiveGlobalTab] = useState<'GAC' | 'TW'>('GAC');

  // Pick the relevant stats for a given team based on activeTab
  function getModeStats(team: Team) {
    if (activeGlobalTab === 'GAC') {
      return {
        rank: team.gacRank,
        offense: team.gacOffense,
        defense: team.gacDefense,
        overall: team.gacOverall,
        omis: team.gacOmis,
      };
    } else {
      return {
        rank: team.twRank,
        offense: team.twOffense,
        defense: team.twDefense,
        overall: team.twOverall,
        omis: team.twOmis,
      };
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Page title */}
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold mb-2">All Teams Ranked</h1>
      </div>

      {/* Sticky container for the global toggle */}
      <div className="sticky top-0 z-50 bg-gray-900 shadow-sm border-b border-gray-700 p-3 flex justify-end">
        <span className="mr-3 text-sm text-gray-300">All Teams Mode:</span>
        <button
          onClick={() => setActiveGlobalTab('GAC')}
          className={`px-3 py-1 rounded mr-2 text-sm ${
            activeGlobalTab === 'GAC'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          GAC
        </button>
        <button
          onClick={() => setActiveGlobalTab('TW')}
          className={`px-3 py-1 rounded text-sm ${
            activeGlobalTab === 'TW'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          TW
        </button>
      </div>

      <div className="p-6">
        {teams.map((team, index) => {
          const modeStats = getModeStats(team);

          return (
            <div key={team.id} className="flex items-start space-x-4">
              {/* Ordinal number */}
              <div className="flex items-center justify-center w-10 text-xl font-bold text-gray-400">
                {index + 1}
              </div>

              <div className="w-full flex-shrink-0">
                <div
                  className="border border-gray-700 rounded bg-gray-800 p-4
                             hover:border-blue-600 transition-colors"
                >
                  <div className="grid grid-cols-[1.5fr_1fr_1fr] items-start gap-x-6 gap-y-4">
                    {/* LEFT COLUMN: Team name, overall info, main composition */}
                    <div>
                      <h2 className="text-lg font-semibold">{team.name}</h2>
                      <p className="mt-1 text-sm text-gray-400">
                        <span className="font-medium">Score:</span> {team.overallScore} {' | '}
                        <span className="font-medium">Rank:</span> {team.overallRank}
                      </p>

                      {/* Main composition icons */}
                      <div className="flex mt-3 space-x-4">
                        {team.composition.map((charId) => {
                          const char = characterMap[charId];
                          if (!char) return <span key={charId}>Missing {charId}</span>;

                          return (
                            <Link
                              href={`/characters/${char.id}`}
                              key={char.id}
                              className="group w-20 text-center"
                            >
                              <div className="relative h-22 w-22 bg-gray-700 border border-gray-600 rounded flex items-center justify-center overflow-hidden">
                                <img
                                  src={char.portraitUrl}
                                  alt={char.name}
                                  className="h-20 w-20 object-contain transition-transform duration-200 group-hover:scale-105"
                                />
                              </div>
                              <span className="mt-1 block text-xs text-gray-300 group-hover:text-blue-400 leading-tight">
                                {char.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* MIDDLE COLUMN: Optional Characters (centered) */}
                    <div className="flex flex-col h-full items-center justify-center">
                      {team.options && team.options.length > 0 && (
                        <>
                          <div className="flex w-full justify-center mb-2">
                            <h3 className="text-sm font-medium text-gray-300">Options:</h3>
                          </div>
                          <div className="w-full bg-gray-900 p-2 rounded flex flex-wrap gap-2 justify-center">
                            {team.options.map((charId) => {
                              const char = characterMap[charId];
                              if (!char) return <span key={charId}>{charId}</span>;

                              return (
                                <Link
                                  href={`/characters/${char.id}`}
                                  key={char.id}
                                  className="group w-16 text-center"
                                >
                                  <div className="relative h-16 w-16 bg-gray-800 border border-gray-600 rounded flex items-center justify-center overflow-hidden">
                                    <img
                                      src={char.portraitUrl}
                                      alt={char.name}
                                      className="h-14 w-14 object-contain transition-transform duration-100 group-hover:scale-105"
                                    />
                                  </div>
                                  <p className="mt-1 text-xs text-gray-300 group-hover:text-blue-400 leading-tight">
                                    {char.name}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* RIGHT COLUMN: rank on top, then vertical stats */}
                    <div className="flex flex-col items-end">
                      {/* Keep rank at the top */}
                      <p className="text-base font-semibold text-right mb-2">
                        {modeStats.rank}
                      </p>

                      {/* OFF, DEF, OVR, OMIS in a vertical column */}
                      <div className="flex flex-col items-end space-y-2 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">OFF</p>
                          <p className="text-right">{modeStats.offense}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">DEF</p>
                          <p className="text-right">{modeStats.defense}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">OVR</p>
                          <p className="text-right">{modeStats.overall}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">OMIS</p>
                          <p className="text-right">{modeStats.omis}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="my-3 border-gray-600" />

                  {/* NOTES Section Below Icons & Stats */}
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">Notes:</h4>
                    <p className="text-xs text-gray-400 italic">
                      No notes yet. Click to add or edit...
                    </p>
                  </div>
                </div>

                {/* ALWAYS show a divider after each card */}
                <div className="border-t border-gray-700 mt-4" />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
