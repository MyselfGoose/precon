/**
 * Single source of truth for the homepage warehouse sample estimate.
 * Div 03 line items and summary rollups must stay in sync for the on-page demo.
 */

export type MoneyTriplet = readonly [material: number, labor: number, total: number];

export type SampleLine = {
  description: string;
  qty: string;
  unit: string;
  sheet: string;
  material: number | null;
  labor: number;
  total: number;
};

const DIV03_LINES: readonly SampleLine[] = [
  {
    description: 'Continuous footings, 24"x12"',
    qty: '1,240',
    unit: 'LF',
    sheet: 'S-101',
    material: 18_600,
    labor: 14_880,
    total: 33_480,
  },
  {
    description: 'Foundation walls, 8" CIP',
    qty: '3,420',
    unit: 'SF',
    sheet: 'S-102',
    material: 27_360,
    labor: 30_780,
    total: 58_140,
  },
  {
    description: 'Wall formwork, two sides',
    qty: '6,840',
    unit: 'SFCA',
    sheet: 'S-102',
    material: 10_260,
    labor: 27_360,
    total: 37_620,
  },
  {
    description: 'Slab on grade, 5" w/ 6x6 WWF',
    qty: '18,650',
    unit: 'SF',
    sheet: 'S-103',
    material: 74_600,
    labor: 46_625,
    total: 121_225,
  },
  {
    description: 'Reinforcing steel, #5, laps incl.',
    qty: '24,800',
    unit: 'LB',
    sheet: 'S-105',
    material: 22_320,
    labor: 14_880,
    total: 37_200,
  },
  {
    description: 'Placement, finish & cure',
    qty: '464',
    unit: 'CY',
    sheet: '-',
    material: null,
    labor: 32_480,
    total: 32_480,
  },
];

/** Warehouse shell summary — Div 03 matches line items; other divisions are illustrative for this project only. */
const SUMMARY_DIVISIONS: readonly {
  code: string;
  name: string;
  material: number;
  labor: number;
}[] = [
  { code: '03', name: 'Concrete', material: 153_140, labor: 167_005 },
  { code: '04', name: 'Masonry', material: 48_600, labor: 61_200 },
  { code: '05', name: 'Metals', material: 86_400, labor: 54_900 },
  { code: '06', name: 'Wood, Plastics, and Composites', material: 22_100, labor: 31_500 },
  { code: '07', name: 'Thermal & Moisture Protection', material: 38_750, labor: 29_400 },
  { code: '09', name: 'Finishes', material: 41_200, labor: 52_800 },
];

function sumMoney(lines: readonly SampleLine[]): MoneyTriplet {
  let material = 0;
  let labor = 0;
  let total = 0;
  for (const line of lines) {
    material += line.material ?? 0;
    labor += line.labor;
    total += line.total;
  }
  return [material, labor, total];
}

function assertLineIntegrity(lines: readonly SampleLine[]): void {
  for (const line of lines) {
    const material = line.material ?? 0;
    if (material + line.labor !== line.total) {
      throw new Error(`Sample line total mismatch: ${line.description}`);
    }
  }
}

assertLineIntegrity(DIV03_LINES);

const DIV03_TOTALS = sumMoney(DIV03_LINES);

const SUMMARY_WITH_TOTALS = SUMMARY_DIVISIONS.map((row) => ({
  ...row,
  total: row.material + row.labor,
}));

const SUMMARY_MATERIAL = SUMMARY_WITH_TOTALS.reduce((sum, row) => sum + row.material, 0);
const SUMMARY_LABOR = SUMMARY_WITH_TOTALS.reduce((sum, row) => sum + row.labor, 0);
const SUMMARY_TOTAL = SUMMARY_WITH_TOTALS.reduce((sum, row) => sum + row.total, 0);

if (
  SUMMARY_WITH_TOTALS[0]?.material !== DIV03_TOTALS[0] ||
  SUMMARY_WITH_TOTALS[0]?.labor !== DIV03_TOTALS[1] ||
  SUMMARY_WITH_TOTALS[0]?.total !== DIV03_TOTALS[2]
) {
  throw new Error('Summary Div 03 must match Div 03 line-item totals.');
}

if (SUMMARY_MATERIAL + SUMMARY_LABOR !== SUMMARY_TOTAL) {
  throw new Error('Summary material + labor must equal sample total.');
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatUsdPlain(amount: number): string {
  return amount.toLocaleString('en-US');
}

export const WAREHOUSE_SAMPLE = {
  projectTitle: 'Warehouse shell, 18,650 SF',
  projectLabel: 'Warehouse shell · 18,650 SF',
  filename: 'estimate.xlsx',
  label: 'Sample – illustrative pricing',
  placementCy: 464,
  placementBasis:
    'Quantities measured from sheets S-101 through S-108 in the issued plan set. Placement CY is the sum of footing, wall, and slab volumes shown above (~92 + 84 + 288 CY). Slab on grade shown as 5" (owner may request a 6" alternate). Pricing is illustrative and should be aligned to the project location. 4,000 PSI mix per Spec 03 30 00. Division 08 Openings is omitted from this sample — divisions shown only.',
  columns: ['Division', 'Material', 'Labor', 'Total'] as const,
  detailColumns: ['Description', 'Qty', 'Unit', 'Sheet', 'Material', 'Labor', 'Total'] as const,
  div03Lines: DIV03_LINES,
  div03Totals: DIV03_TOTALS,
  summaryRows: SUMMARY_WITH_TOTALS,
  summaryTotals: [SUMMARY_MATERIAL, SUMMARY_LABOR, SUMMARY_TOTAL] as const,
  included: [
    'Quantity takeoffs',
    'Material & labor pricing',
    'Drawing references',
    'Assumptions',
    'Exclusions',
    'Summary sheet',
    'Editable Excel workbook',
  ] as const,
  tracesBack:
    'Every major quantity references the sheet it came from, so a number questioned in bid review is quick to verify.',
  toolCompatibility:
    'Takeoffs in Bluebeam Revu, PlanSwift, and On-Screen Takeoff. Estimates arrive as editable Excel workbooks with formulas intact.',
} as const;

/** Workbook-compatible Div 03 sample for homepage / how-it-works. */
export function getWarehouseDiv03Sample(): {
  title: string;
  cols: string[];
  rows: string[][];
  total: string[];
  basis: string;
} {
  return {
    title: WAREHOUSE_SAMPLE.projectTitle,
    cols: [...WAREHOUSE_SAMPLE.detailColumns],
    rows: WAREHOUSE_SAMPLE.div03Lines.map((line) => [
      line.description,
      line.qty,
      line.unit,
      line.sheet,
      line.material === null ? '-' : formatUsdPlain(line.material),
      formatUsdPlain(line.labor),
      formatUsdPlain(line.total),
    ]),
    total: [
      'Division 03 subtotal',
      formatUsdPlain(WAREHOUSE_SAMPLE.div03Totals[0]),
      formatUsdPlain(WAREHOUSE_SAMPLE.div03Totals[1]),
      formatUsdPlain(WAREHOUSE_SAMPLE.div03Totals[2]),
    ],
    basis: WAREHOUSE_SAMPLE.placementBasis,
  };
}

export function getWarehouseSummaryDisplay(): {
  label: string;
  project: string;
  filename: string;
  columns: readonly ['Division', 'Material', 'Labor', 'Total'];
  rows: readonly (readonly [string, string, string, string])[];
  total: readonly [string, string, string, string];
  included: readonly string[];
  tracesBack: string;
  toolCompatibility: string;
} {
  return {
    label: WAREHOUSE_SAMPLE.label,
    project: WAREHOUSE_SAMPLE.projectLabel,
    filename: WAREHOUSE_SAMPLE.filename,
    columns: WAREHOUSE_SAMPLE.columns,
    rows: WAREHOUSE_SAMPLE.summaryRows.map(
      (row) =>
        [
          `${row.code} ${row.name}`,
          formatUsd(row.material),
          formatUsd(row.labor),
          formatUsd(row.total),
        ] as const,
    ),
    total: [
      'Subtotal, divisions shown',
      formatUsd(WAREHOUSE_SAMPLE.summaryTotals[0]),
      formatUsd(WAREHOUSE_SAMPLE.summaryTotals[1]),
      formatUsd(WAREHOUSE_SAMPLE.summaryTotals[2]),
    ],
    included: WAREHOUSE_SAMPLE.included,
    tracesBack: WAREHOUSE_SAMPLE.tracesBack,
    toolCompatibility: WAREHOUSE_SAMPLE.toolCompatibility,
  };
}
