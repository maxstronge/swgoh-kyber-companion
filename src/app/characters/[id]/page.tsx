import { notFound } from 'next/navigation';
import characters from '@/data/characters.json';
import abilityData from '@/data/abilityData.json';

interface CharacterPageProps {
  params: { id: string };
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const character = (characters as any[]).find(
    (char) => char.baseid.toLowerCase() === params.id.toLowerCase()
  );
  if (!character) return notFound();

  const abilities = (abilityData as any[]).filter(
    (ability) => ability.baseid.toLowerCase() === character.baseid.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left column: Profile picture and name */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative h-48 w-48 bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={`/characterprofiles/${character["imageurl-src"]}`}
              alt={character.name}
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold">{character.name}</h1>
        </div>
        {/* Right column: Abilities box */}
        <div className="md:w-2/3 bg-gray-800 border border-gray-700 rounded-lg p-6 mt-8 md:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
          {abilities.length > 0 ? (
            <ul className="space-y-4">
              {abilities.map((ability, index) => (
                <li key={index} className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 bg-gray-700 border border-gray-600 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={`/abilityicons/${ability.abilityIcon}`}
                      alt={ability.abilityName}
                      className="relative h-18 w-18 object-contain"
                      title={ability.abilityDescription}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{ability.abilityName}</p>
                    <p className="text-sm text-gray-400">{ability.abilityDescription}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No abilities found for this character.</p>
          )}
        </div>
      </div>
    </main>
  );
}
