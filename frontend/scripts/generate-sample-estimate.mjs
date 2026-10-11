/**
 * Regenerates public/samples/sample-estimate.xlsx with live formulas.
 * Keep figures in sync with src/lib/sample-estimate.ts.
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'public/samples/sample-estimate.xlsx');
const staging = join(root, '.tmp-sample-xlsx');

/** Must match src/lib/sample-estimate.ts */
const DIV03_LINES = [
  ['Continuous footings, 24"x12"', 1240, 'LF', 'S-101', 18600, 14880],
  ['Foundation walls, 8" CIP', 3420, 'SF', 'S-102', 27360, 30780],
  ['Wall formwork, two sides', 6840, 'SFCA', 'S-102', 10260, 27360],
  ['Slab on grade, 5" w/ 6x6 WWF', 18650, 'SF', 'S-103', 74600, 46625],
  ['Reinforcing steel, #5, laps incl.', 24800, 'LB', 'S-105', 22320, 14880],
  ['Placement, finish & cure', 464, 'CY', '-', null, 32480],
];

const SUMMARY_OTHER = [
  ['04 Masonry', 48600, 61200],
  ['05 Metals', 86400, 54900],
  ['06 Wood & Plastics', 22100, 31500],
  ['07 Thermal & Moisture', 38750, 29400],
  ['09 Finishes', 41200, 52800],
];

function esc(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function inlineStr(text) {
  return `<c t="inlineStr"><is><t>${esc(text)}</t></is></c>`;
}

function num(value) {
  return `<c t="n"><v>${value}</v></c>`;
}

function formula(expr, cached) {
  return `<c t="n"><f>${esc(expr)}</f><v>${cached}</v></c>`;
}

function cellRef(col, row, content) {
  // content already includes <c ...>
  return content.replace('<c ', `<c r="${col}${row}" `);
}

function buildSummarySheet() {
  const div03Mat = DIV03_LINES.reduce((s, r) => s + (r[4] ?? 0), 0);
  const div03Lab = DIV03_LINES.reduce((s, r) => s + r[5], 0);
  const rows = [];
  rows.push(
    `<row r="1">${cellRef('A', 1, inlineStr('Division'))}${cellRef('B', 1, inlineStr('Material'))}${cellRef('C', 1, inlineStr('Labor'))}${cellRef('D', 1, inlineStr('Total'))}</row>`,
  );
  // Row 2: Div 03 pulls from Div 03 sheet totals
  rows.push(
    `<row r="2">${cellRef('A', 2, inlineStr('03 Concrete'))}${cellRef('B', 2, formula("'Div 03'!E8", div03Mat))}${cellRef('C', 2, formula("'Div 03'!F8", div03Lab))}${cellRef('D', 2, formula('B2+C2', div03Mat + div03Lab))}</row>`,
  );
  let r = 3;
  for (const [name, mat, lab] of SUMMARY_OTHER) {
    rows.push(
      `<row r="${r}">${cellRef('A', r, inlineStr(name))}${cellRef('B', r, num(mat))}${cellRef('C', r, num(lab))}${cellRef('D', r, formula(`B${r}+C${r}`, mat + lab))}</row>`,
    );
    r += 1;
  }
  const lastData = r - 1;
  const matSum =
    div03Mat + SUMMARY_OTHER.reduce((s, row) => s + row[1], 0);
  const labSum =
    div03Lab + SUMMARY_OTHER.reduce((s, row) => s + row[2], 0);
  rows.push(
    `<row r="${r}">${cellRef('A', r, inlineStr('Sample total'))}${cellRef('B', r, formula(`SUM(B2:B${lastData})`, matSum))}${cellRef('C', r, formula(`SUM(C2:C${lastData})`, labSum))}${cellRef('D', r, formula(`SUM(D2:D${lastData})`, matSum + labSum))}</row>`,
  );
  rows.push(`<row r="${r + 2}">${cellRef('A', r + 2, inlineStr('Project'))}${cellRef('B', r + 2, inlineStr('Warehouse shell · 18,650 SF'))}</row>`);
  rows.push(
    `<row r="${r + 3}">${cellRef('A', r + 3, inlineStr('Note'))}${cellRef('B', r + 3, inlineStr('Illustrative sample. Div 03 totals are live formulas from the Div 03 sheet.'))}</row>`,
  );

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:D${r + 3}"/><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="15"/><sheetData>${rows.join('')}</sheetData></worksheet>`;
}

function buildDiv03Sheet() {
  const rows = [];
  rows.push(
    `<row r="1">${['Description', 'Qty', 'Unit', 'Sheet', 'Material', 'Labor', 'Total'].map((h, i) => cellRef(String.fromCharCode(65 + i), 1, inlineStr(h))).join('')}</row>`,
  );
  DIV03_LINES.forEach((line, idx) => {
    const row = idx + 2;
    const [desc, qty, unit, sheet, mat, lab] = line;
    const total = (mat ?? 0) + lab;
    const matCell = cellRef('E', row, num(mat ?? 0));
    const labCell = cellRef('F', row, num(lab));
    const totCell = cellRef('G', row, formula(`E${row}+F${row}`, total));
    rows.push(
      `<row r="${row}">${cellRef('A', row, inlineStr(desc))}${cellRef('B', row, num(qty))}${cellRef('C', row, inlineStr(unit))}${cellRef('D', row, inlineStr(sheet))}${matCell}${labCell}${totCell}</row>`,
    );
  });
  const last = DIV03_LINES.length + 1;
  const matSum = DIV03_LINES.reduce((s, r) => s + (r[4] ?? 0), 0);
  const labSum = DIV03_LINES.reduce((s, r) => s + r[5], 0);
  rows.push(
    `<row r="${last + 1}">${cellRef('A', last + 1, inlineStr('Division 03 subtotal'))}${cellRef('E', last + 1, formula(`SUM(E2:E${last})`, matSum))}${cellRef('F', last + 1, formula(`SUM(F2:F${last})`, labSum))}${cellRef('G', last + 1, formula(`SUM(G2:G${last})`, matSum + labSum))}</row>`,
  );
  rows.push(
    `<row r="${last + 3}">${cellRef('A', last + 3, inlineStr('Basis'))}${cellRef('B', last + 3, inlineStr('Placement CY is the sum of footing, wall, and slab volumes (~92 + 84 + 288 CY = 464 CY). Illustrative pricing.'))}</row>`,
  );

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:G${last + 3}"/><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="15"/><sheetData>${rows.join('')}</sheetData></worksheet>`;
}

function simpleSheet(rowsText, dim) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="${dim}"/><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="15"/><sheetData>${rowsText}</sheetData></worksheet>`;
}

function assumptionsSheet() {
  const lines = [
    'Illustrative warehouse shell sample for QuantSult marketing site.',
    'Div 03 quantities measured from S-101 through S-108.',
    'Placement CY = footing + wall + slab volumes (~92 + 84 + 288).',
    'Other division totals are illustrative for the same warehouse shell.',
    'Pricing should be aligned to the project location before use in a live bid.',
  ];
  const rows = lines
    .map((t, i) => `<row r="${i + 1}">${cellRef('A', i + 1, inlineStr(t))}</row>`)
    .join('');
  return simpleSheet(rows, `A1:A${lines.length}`);
}

function exclusionsSheet() {
  const lines = [
    'Testing and special inspection',
    'Dewatering, shoring and underpinning',
    'Winter protection and heated enclosures',
    'Precast concrete (Division 03 40 00)',
    'Sitework concrete beyond the building line (Division 32)',
    'Permit and impact fees',
  ];
  const rows = lines
    .map((t, i) => `<row r="${i + 1}">${cellRef('A', i + 1, inlineStr(t))}</row>`)
    .join('');
  return simpleSheet(rows, `A1:A${lines.length}`);
}

const CONTENT_TYPES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet3.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet4.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;

const ROOT_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;

const WB_RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet3.xml"/>
  <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet4.xml"/>
  <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

const WORKBOOK = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Summary" sheetId="1" r:id="rId1"/>
    <sheet name="Div 03" sheetId="2" r:id="rId2"/>
    <sheet name="Assumptions" sheetId="3" r:id="rId3"/>
    <sheet name="Exclusions" sheetId="4" r:id="rId4"/>
  </sheets>
  <calcPr calcId="124519" fullCalcOnLoad="1"/>
</workbook>`;

const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
</styleSheet>`;

const CORE = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>QuantSult Sample Estimate</dc:title>
  <dc:creator>QuantSult</dc:creator>
  <cp:lastModifiedBy>QuantSult</cp:lastModifiedBy>
</cp:coreProperties>`;

const APP = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties">
  <Application>QuantSult</Application>
</Properties>`;

rmSync(staging, { recursive: true, force: true });
mkdirSync(join(staging, '_rels'), { recursive: true });
mkdirSync(join(staging, 'docProps'), { recursive: true });
mkdirSync(join(staging, 'xl/_rels'), { recursive: true });
mkdirSync(join(staging, 'xl/worksheets'), { recursive: true });

writeFileSync(join(staging, '[Content_Types].xml'), CONTENT_TYPES);
writeFileSync(join(staging, '_rels/.rels'), ROOT_RELS);
writeFileSync(join(staging, 'docProps/core.xml'), CORE);
writeFileSync(join(staging, 'docProps/app.xml'), APP);
writeFileSync(join(staging, 'xl/workbook.xml'), WORKBOOK);
writeFileSync(join(staging, 'xl/_rels/workbook.xml.rels'), WB_RELS);
writeFileSync(join(staging, 'xl/styles.xml'), STYLES);
writeFileSync(join(staging, 'xl/worksheets/sheet1.xml'), buildSummarySheet());
writeFileSync(join(staging, 'xl/worksheets/sheet2.xml'), buildDiv03Sheet());
writeFileSync(join(staging, 'xl/worksheets/sheet3.xml'), assumptionsSheet());
writeFileSync(join(staging, 'xl/worksheets/sheet4.xml'), exclusionsSheet());

if (existsSync(outPath)) rmSync(outPath);
execFileSync('zip', ['-qr', outPath, '.'], { cwd: staging });
rmSync(staging, { recursive: true, force: true });

console.log(`Wrote ${outPath}`);
