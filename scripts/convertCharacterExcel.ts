// scripts/exceltojson.ts
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const workbook = xlsx.readFile('src\\data\\chardata.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet, {
    defval: '',
});

console.log(rows);

const outputFile = path.join(__dirname, '../src/data/characters.json');
fs.writeFileSync(outputFile, JSON.stringify(rows, null, 2));
console.log(`Wrote data to ${outputFile}`);
