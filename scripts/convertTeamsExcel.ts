import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

// 1) Read the Excel file
//    Change this path to wherever your .xlsx is located.
const workbook = xlsx.readFile('src\\data\\teamdata.xlsx');

// 2) Pick the worksheet you want (first sheet, or by name).
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// 3) Convert to an array of row objects.
//    defval: '' ensures empty cells become '' instead of undefined.
const rows = xlsx.utils.sheet_to_json(sheet, {
  defval: ''
});

// Example of what your Excel columns might be named.
// Adjust them to match EXACTLY what appears in your .xlsx header row.
function mapRowToTeam(row: any) {
  // For generating an ID, do something simple like:
  // Take the team name, force to lowercase, replace spaces/punctuation with underscores, etc.
  const rawName = row['TEAM NAME']?.toString().trim() || 'Unknown Team';
  const generatedId = rawName
    .toLowerCase()
    .replace(/[^\w]+/g, '_') // non-word chars => underscore
    .replace(/^_+|_+$/g, ''); // remove leading/trailing underscores

  return {
    // The final shape you want in teams.json:
    id: generatedId,
    name: rawName,
    
    // If your "TEAM COMPOSITION" column is a comma-separated list, parse it:
    // e.g. "GLAHSOKATANO, EZRAEXILE, PADAWANSABINE"
    composition: row['TEAM COMPOSITION']
      .split(',')
      .map((c: string) => c.trim()),
    options: row['OPTIONS']
      ? row['OPTIONS'].split(',').map((c: string) => c.trim())
      : [],

    // The next fields match your existing interface:
    overallScore: parseFloat(row['TOTAL OVERALL SCORE']) || 0,
    overallRank: row['OVERALL RANK'] || '',
    
    gacOffense: parseFloat(row['GRAND ARENA OFFENSE']) || 0,
    gacDefense: parseFloat(row['GRAND ARENA DEFENSE']) || 0,
    gacOverall: parseFloat(row['GRAND ARENA OVERALL']) || 0,
    gacRank: row['OVERALL GRAND ARENA RANK'] || '',
    gacOmis: parseInt(row['GAC OMICRONS REQUIRED']) || 0,
    twOffense: parseFloat(row['TERRITORY WARS OFFENSE']) || 0,
    twDefense: parseFloat(row['TERRITORY WARS DEFENSE']) || 0,
    twOverall: parseFloat(row['TERRITORY WARS OVERALL']) || 0,
    twRank: row['OVERALL TERRITORY WARS RANK'] || '',
    twOmis: parseInt(row['TW OMICRONS REQUIRED']) || 0
  };
}

// 4) Map every row in the Excel sheet to a Team object
const teams = rows.map(mapRowToTeam);

// 5) Write out to `teams.json` (or wherever you prefer in `src/data/`)
const outputPath = path.resolve(__dirname, '../src/data/teams.json');
fs.writeFileSync(outputPath, JSON.stringify(teams, null, 2), 'utf-8');

console.log(`Excel conversion complete! Check ${outputPath}`);
