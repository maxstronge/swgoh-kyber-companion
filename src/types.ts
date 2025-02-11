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



// New Ability interface for Zetas and Omicrons
export interface Ability {
  priority: number;
  character: string;
  character_icon: string;
  ability: string;
  ability_icon: string;
  game_mode?: string;  // Only present for Omicrons
}

// Grouped abilities by priority (for Zetas & Omicrons)
export interface AbilityGroup {
  priority_group: string;
  abilities: Ability[];
}

// Faction interface
export interface Faction {
  id: string;
  name: string;
  icon: string;
  zetas: AbilityGroup[];
  omicrons: AbilityGroup[];
}