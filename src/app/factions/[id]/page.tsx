import { notFound } from 'next/navigation';
import factions from '@/data/factionGuide.json';
import characters from '@/data/characters.json';
import abilityData from '@/data/abilityData.json';
import { Faction, Character, Ability } from '@/types';

interface FactionPageProps {
  params: { id: string };
}

// Priority mapping: convert numeric strings to descriptive text.
const PRIORITY_MAP: Record<string, string> = {
  "1": "TOP PRIORITY",
  "2": "SECOND PRIORITY",
  "3": "LOW PRIORITY",
  "4": "SKIP",
};

// Helper: get character data by baseid
const getCharacterData = (baseid: string) =>
  (characters as any[]).find((c) => c.baseid === baseid);

// Helper: get character name using character data
const getCharacterName = (baseid: string) => {
  const char = getCharacterData(baseid);
  return char ? char.name : baseid;
};

// Helper: get character icon using character data
const getCharacterIcon = (baseid: string) => {
  const char = getCharacterData(baseid);
  return char ? `/characterprofiles/${char['imageurl-src']}` : '/default_character_icon.png';
};

// Helper: get ability mapping based on character baseid and ability name
const getAbilityMapping = (baseid: string, abilityName: string) =>
  (abilityData as any[]).find(
    (item) =>
      item.baseid === baseid &&
      item.abilityName.toLowerCase() === abilityName.toLowerCase()
  );

export default async function FactionPage({ params }: FactionPageProps) {
  const faction = (factions as Faction[]).find(
    (f) => f.id.toLowerCase() === params.id.toLowerCase()
  );
  if (!faction) {
    return notFound();
  }

  // Transform raw character data to match the Character interface
  const allCharacters = (characters as any[]).map((char) => ({
    id: char.baseid,
    name: char.name,
    portraitUrl: `/characterprofiles/${char['imageurl-src']}`,
    rankTier: char.rank?.trim() || 'Youngling',
  })) as Character[];

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Faction Header */}
      <header className="flex items-center space-x-4 mb-8">
        <img
          src={`/factionicons/${faction.id}.png`}
          alt={faction.name}
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-3xl font-bold">{faction.name}</h1>
      </header>

      {/* Zetas and Omicrons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Zetas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Zetas</h2>
          {faction.zetas.length > 0 ? (
            faction.zetas.map((group) => (
              <div key={group.priority_group} className="mb-6">
                <h3 className="text-lg font-medium text-blue-400 mb-2">
                  {PRIORITY_MAP[group.priority_group] || group.priority_group}
                </h3>
                <ul className="space-y-3">
                  {group.abilities.map((ability: Ability) => {
                    const mapping = getAbilityMapping(
                      ability.character,
                      ability.ability
                    );
                    const abilityIcon =
                      mapping && mapping.abilityIcon
                        ? `/abilityicons/${mapping.abilityIcon}`
                        : ability.ability_icon || '/default_ability_icon.png';

                    return (
                      <li
                        key={ability.priority}
                        className="flex items-center justify-between space-x-4 bg-gray-800 p-3 rounded-lg"
                      >
                        {/* Ability Icon & Name with Tooltip */}
                        <div className="flex items-center space-x-4">
                          <img
                            src={abilityIcon}
                            alt={ability.ability}
                            title={mapping ? mapping.abilityDescription : ''}
                            className="w-10 h-10 rounded"
                          />
                          <div>
                            <p className="text-sm font-bold">{ability.ability}</p>
                            <p className="text-xs text-gray-400">
                              Priority #{ability.priority}
                            </p>
                          </div>
                        </div>

                        {/* Character Name and Icon */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-300">
                            {getCharacterName(ability.character)}
                          </span>
                          <img
                            src={getCharacterIcon(ability.character)}
                            alt={ability.character}
                            className="w-10 h-10 rounded-full border border-gray-600"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No Zetas available for this faction.</p>
          )}
        </section>

        {/* Omicrons */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Omicrons</h2>
          {faction.omicrons.length > 0 ? (
            faction.omicrons.map((group) => (
              <div key={group.priority_group} className="mb-6">
                <h3 className="text-lg font-medium text-green-400 mb-2">
                  {PRIORITY_MAP[group.priority_group] || group.priority_group}
                </h3>
                <ul className="space-y-3">
                  {group.abilities.map((ability: Ability) => {
                    const mapping = getAbilityMapping(
                      ability.character,
                      ability.ability
                    );
                    const abilityIcon =
                      mapping && mapping.abilityIcon
                        ? `/abilityicons/${mapping.abilityIcon}`
                        : ability.ability_icon || '/default_ability_icon.png';

                    return (
                      <li
                        key={ability.priority}
                        className="flex items-center justify-between space-x-4 bg-gray-800 p-3 rounded-lg"
                      >
                        {/* Ability Icon & Name with Tooltip */}
                        <div className="flex items-center space-x-4">
                          <img
                            src={abilityIcon}
                            alt={ability.ability}
                            title={mapping ? mapping.abilityDescription : ''}
                            className="w-10 h-10 rounded"
                          />
                          <div>
                            <p className="text-sm font-bold">{ability.ability}</p>
                            <p className="text-xs text-gray-400">
                              Priority #{ability.priority} – {ability.game_mode}
                            </p>
                          </div>
                        </div>

                        {/* Character Name and Icon */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-300">
                            {getCharacterName(ability.character)}
                          </span>
                          <img
                            src={getCharacterIcon(ability.character)}
                            alt={ability.character}
                            className="w-10 h-10 rounded-full border border-gray-600"
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No Omicrons available for this faction.</p>
          )}
        </section>
      </div>
    </main>
  );
}
