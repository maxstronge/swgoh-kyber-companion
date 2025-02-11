import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { Faction, Ability } from '@/types';

// Import character data to build a lookup for image filenames and names
import characterData from '../src/data/characters.json';

const charactersMap: Record<string, any> = {};
for (const char of characterData as any[]) {
  charactersMap[char.baseid] = char;
}

// Read the Excel file
const excelFilePath = path.join(__dirname, '../src/data/factionGuide.xlsx');
const workbook = xlsx.readFile(excelFilePath);

const factions: Faction[] = [];

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  const factionId = sheetName.toLowerCase().replace(/\s+/g, '');
  const faction: Faction = {
    id: factionId,
    name: sheetName,
    icon: `/factionicons/${factionId}.png`,
    zetas: [],
    omicrons: []
  };

  const groupedAbilities: Record<'Zeta' | 'Omicron', Record<string, Ability[]>> = {
    Zeta: {},
    Omicron: {}
  };

  rows.forEach((row: any) => {
    const type = row['Type'] as 'Zeta' | 'Omicron';
    const priorityGroup = row['Priority Group'];
    if (!groupedAbilities[type][priorityGroup]) {
      groupedAbilities[type][priorityGroup] = [];
    }

    // Here we enhance the lookup:
    const charIdentifier = row['Character'].toString().trim();
    let baseid = charIdentifier;
    if (!charactersMap[baseid]) {
      const found = Object.values(charactersMap).find(
        (char) => char.name.toLowerCase() === charIdentifier.toLowerCase()
      );
      if (found) {
        baseid = found.baseid;
      }
    }

    // Use the resolved baseid to get the character icon:
    let characterIcon = row['Character Icon']?.toString().trim();
    if (!characterIcon) {
      const charData = charactersMap[baseid];
      characterIcon = charData ? `/characterprofiles/${charData['imageurl-src']}` : `/characterprofiles/${baseid}.png`;
    }

    const ability: Ability = {
      priority: parseInt(row['Priority'], 10),
      character: baseid,
      character_icon: characterIcon,
      ability: row['Ability Name'].toString().trim(),
      ability_icon: row['Ability Icon']?.toString().trim() || '/default_ability_icon.png',
      game_mode: row['Game Mode'] ? row['Game Mode'].toString().trim() : undefined
    };

    groupedAbilities[type][priorityGroup].push(ability);
  });

  faction.zetas = Object.entries(groupedAbilities.Zeta).map(([priorityGroup, abilities]) => ({
    priority_group: priorityGroup,
    abilities: abilities.sort((a, b) => a.priority - b.priority)
  }));

  faction.omicrons = Object.entries(groupedAbilities.Omicron).map(([priorityGroup, abilities]) => ({
    priority_group: priorityGroup,
    abilities: abilities.sort((a, b) => a.priority - b.priority)
  }));

  factions.push(faction);
});

const outputPath = path.join(__dirname, '../src/data/factionGuide.json');
fs.writeFileSync(outputPath, JSON.stringify(factions, null, 2), 'utf-8');

console.log(`Factions JSON successfully generated at ${outputPath}`);
