export type RankTier = 'Carbonite' | 'Bronzium' | 'Chromium' |   'Aurodium' | 'Beskar' | 'Kyber' | 'Galactic Legend' 

export interface Team {
  id: string;               // Unique identifier for the team
  name: string;             // e.g. "Galactic Legends Rey"
  composition: string[];    // Array of character IDs for the 5 units
  options?: string[];        // Array of character IDs for optional units
  overallScore: number;     // 1-10
  overallRank: RankTier;    // from enum
  gacOffense: number;       // 1-10
  gacDefense: number;       // 1-10
  gacOverall: number;       // 1-10
  gacRank: RankTier;        // same enum as overallRank
  twOffense: number;        // 1-10
  twDefense: number;        // 1-10
  twOverall: number;        // 1-10
  twRank: RankTier;  // same enum
  twOmis: number; // e.g. 0, 1, 2
  gacOmis: number; // e.g. 0, 1, 2
}

export type CharacterRankTier = 'Youngling' | 'Padawan' | 'Knight' | 'Master' | 'Grand Master' | 'Galactic Legend'

export interface Character {
  id: string;                  // Unique identifier for the character, e.g. "luke_skywalker"
  name: string;                // e.g. "Luke Skywalker"
  portraitUrl: string;         // Could be "/images/luke_skywalker.png" or something similar
  rankTier: CharacterRankTier; // e.g. "Padawan"
}


export interface Faction {
  id: string;                // Unique identifier, e.g. "rebel_alliance"
  name: string;              // e.g. "Rebel Alliance"
  iconUrl?: string;          // optional faction banner/logo
  members: string[];         // array of character IDs for that faction
  zetas: ZetaRecommendation[];
  omicrons: OmicronRecommendation[];
}

export interface ZetaRecommendation {
  id: string;                // e.g. "luke_skywalker_lead_zeta"
  characterId: string;       // "luke_skywalker"
  abilityName: string;       // e.g. "Leader Ability: Return of the Jedi"
  abilityIconUrl?: string;   // optional
  priorityGroup: 'Top' | 'Second' | 'Third' | 'Low/Skippable';
}

export interface OmicronRecommendation {
  id: string;
  characterId: string;
  abilityName: string;
  abilityIconUrl?: string;
  priorityGroup: 'Top' | 'Second' | 'Third' | 'Low/Skippable';
  gameMode: 'GAC' | 'TW' | 'TB' | 'Raid' | 'Conquest' | 'Galactic Challenges';
}
