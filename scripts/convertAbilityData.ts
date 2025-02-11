import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

// 1. Read the ability data Excel file
const workbook = xlsx.readFile('src/data/abilityData.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' }) as any[];

// 2. Map each row to an ability data object using the sample column names
const abilityData = rows.map(row => ({
  baseid: row['baseid']?.toString().trim() || '',
  abilityIcon: row['icon-src']?.toString().trim() || '',
  abilityName: row['ab_name']?.toString().trim() || '',
  abilityDescription: row['ab_desc']?.toString().trim() || ''
}));

// 3. Write the output JSON file
const outputPath = path.join(__dirname, '../src/data/abilityData.json');
fs.writeFileSync(outputPath, JSON.stringify(abilityData, null, 2), 'utf-8');

console.log(`Ability data JSON successfully generated at ${outputPath}`);
