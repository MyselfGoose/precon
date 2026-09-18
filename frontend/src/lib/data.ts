export type MeasureGroup = { group: string; unit: string; items: [string, string][] };
export type Sample = { title: string; cols: string[]; rows: string[][]; total: string[]; basis: string };
export type Trade = { slug: string; art: string; noun: string; div: string; name: string; short: string; lede: string; intro: [string,string]; sheets: string; measure: MeasureGroup[]; sample: Sample; exclusions: string[]; faq: [string,string][] };
export type Service = { slug: string; code: string; ico: string; name: string; short: string; desc: string; points: string[]; who: string };
export const TRADES: Trade[] =
[
{ slug:'concrete', art:'a', noun:'concrete', div:'03', name:'Concrete', short:'Footings, slabs, walls, formwork, rebar, finishes',
  lede:'Cast-in-place concrete quantities and pricing measured from your structural set, reported in the units your ready-mix supplier, rebar fabricator and finishing crew actually quote in.',
  intro:['A concrete takeoff is only as good as its separation of scope. We break every pour into its own line — footings, walls, piers, slabs on grade, elevated decks, toppings — and carry formwork, reinforcing, placement, finishing and curing as separate items so labor and material can be priced independently and swapped for your own rates.',
         'Quantities are measured from the structural drawings (S-series), coordinated against architectural plans for slab depressions, curbs and housekeeping pads, and checked against the specification for mix designs, finish tolerances and curing requirements. Every line carries the sheet and detail it was measured from.'],
  sheets:'S-100 series foundation plans, S-500 series details, A-100 slab depressions and curbs, Spec 03 30 00',
  measure:[
    {group:'Foundations',unit:'CY · LF · EA',items:[['Continuous wall footings by size','LF / CY'],['Spread footings and pile caps','EA / CY'],['Foundation and stem walls by thickness','SF / CY'],['Grade beams and tie beams','LF / CY'],['Piers, pilasters and columns','EA / CY'],['Elevator pits, sump pits, equipment pads','EA / CY']]},
    {group:'Slabs',unit:'SF · CY',items:[['Slab on grade by thickness and mix','SF / CY'],['Elevated slabs on metal deck','SF / CY'],['Topping slabs and depressed slabs','SF / CY'],['Thickened slab edges and interior footings','LF / CY'],['Vapor retarder by mil thickness','SF'],['Granular sub-base under slab','CY / TON']]},
    {group:'Formwork',unit:'SFCA · LF',items:[['Wall forms, contact area, by height','SFCA'],['Footing edge forms and keyways','LF'],['Column and pier forms','SFCA'],['Slab edge forms and bulkheads','LF'],['Blockouts, boxouts and sleeves','EA'],['Form ties, release agent and reshoring','allowance']]},
    {group:'Reinforcing',unit:'LB · TON · SF',items:[['Rebar by bar size, with laps and hooks','LB / TON'],['Welded wire fabric by gauge','SF'],['Dowels, corner bars and hairpins','EA / LB'],['Chairs, bolsters and accessories','allowance'],['Fiber reinforcement in mix','CY'],['Post-tension tendons where shown','LF / LB']]},
    {group:'Placement & finish',unit:'CY · SF',items:[['Placement by method — chute, pump, crane','CY'],['Finishing by type — trowel, broom, float','SF'],['Control and construction joints, saw cut','LF'],['Curing compound or wet cure','SF'],['Sealers, hardeners and densifiers','SF'],['Pump and vibrator equipment time','HR / DAY']]},
    {group:'Embeds & misc.',unit:'EA · LF',items:[['Anchor bolts and embed plates','EA'],['Waterstop at cold joints','LF'],['Expansion joint material','LF'],['Weld plates and column base plates','EA'],['Housekeeping pads and curbs','EA / LF'],['Concrete washout and testing allowance','LS']]}],
  sample:{title:'Warehouse shell — 18,650 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['Continuous footings — 24"×12"','1,240','LF','S-101','18,600','14,880','33,480'],['Foundation walls — 8" CIP','3,420','SF','S-102','27,360','30,780','58,140'],['Wall formwork — two sides','6,840','SFCA','S-102','10,260','27,360','37,620'],['Slab on grade — 5" w/ 6×6 WWF','18,650','SF','S-103','74,600','46,625','121,225'],['Reinforcing steel — #5, laps incl.','24,800','LB','S-105','22,320','14,880','37,200'],['Placement, finish & cure','742','CY','—','—','51,940','51,940']],
    total:['Division 03 subtotal','153,140','186,465','339,605'],basis:'Quantities measured from sheets S-101 through S-108 in the issued plan set. Pricing is illustrative and should be aligned to the project location. 4,000 PSI mix per Spec 03 30 00.'},
  exclusions:['Testing and special inspection','Dewatering, shoring and underpinning','Winter protection and heated enclosures','Precast concrete (Division 03 40 00)','Sitework concrete beyond the building line (Division 32)','Permit and impact fees'],
  faq:[['Do you include laps, hooks and waste in the rebar weight?','Yes. Reinforcing is reported by weight with laps, hooks and bends calculated in per ACI 318 and the structural general notes, so the tonnage matches what a fabricator will quote rather than the theoretical bar length on the schedule. A stated waste percentage is applied to WWF and stock bar.'],
       ['Can you price to my own crew productivity?','Send your production rates and we build labor around them. Labor is carried in its own column precisely so your numbers can be substituted without touching the quantities.'],
       ['What if the structural drawings are incomplete?','We measure what is drawn and list what is not as an assumption or exclusion. You will see exactly which items were estimated from incomplete information rather than discovering it at buyout.'],
       ['Do you separate pump placement from chute placement?','Yes, where the site logistics make it clear. If the plans do not indicate access, we state the placement method assumed so you can adjust for your pump contractor.']] },

{ slug:'masonry', art:'a', noun:'masonry', div:'04', name:'Masonry', short:'CMU, brick veneer, mortar, grout, reinforcing, lintels',
  lede:'Unit masonry takeoffs for CMU, brick and stone — counted by the unit and reported by the square foot, with grout, mortar, reinforcing and accessories carried separately.',
  intro:['Masonry estimates go wrong in the accessories, not the block. We count units by size and type, then carry mortar, grout by cell spacing, horizontal joint reinforcement, vertical bars, bond beams, lintels, flashing, weeps, wall ties and control joints as their own lines so nothing hides inside a per-square-foot allowance.',
         'Quantities come from the architectural elevations and wall sections, coordinated with the structural drawings for reinforcing and bond beam locations and the specification for unit type, mortar type and grout lift requirements. Openings are deducted at the unit level, not by a blanket percentage.'],
  sheets:'A-200 elevations, A-300 wall sections, S-400 masonry reinforcing, Spec 04 20 00',
  measure:[
    {group:'Concrete masonry units',unit:'EA · SF',items:[['CMU by size — 8", 12", split-face, etc.','EA / SF'],['Bond beam and lintel units','EA / LF'],['Half-high, bullnose and special shapes','EA'],['Openings deducted at unit level','EA'],['Waste factor by unit type','%'],['Wall area by type for labor','SF']]},
    {group:'Brick & stone',unit:'EA · SF',items:[['Modular brick at 6.75 / SF','EA / SF'],['Utility, king and queen sizes','EA / SF'],['Soldier, header and rowlock courses','LF'],['Cast stone sills, bands and caps','LF / EA'],['Thin brick and adhered veneer','SF'],['Cleaning and sealing','SF']]},
    {group:'Mortar & grout',unit:'CY · BAG',items:[['Mortar by type (N, S, M)','BAG / CY'],['Grout for cells at spacing shown','CY'],['Grout for bond beams and lintels','CY'],['High-lift vs. low-lift grouting','CY'],['Grout pump time','HR'],['Sand and admixtures','TON / LS']]},
    {group:'Reinforcing',unit:'LB · LF',items:[['Vertical bars at spacing shown','LB'],['Bond beam bars','LB'],['Ladder or truss joint reinforcement','LF'],['Dowels from foundation','EA'],['Lintel reinforcing','LB'],['Positioners and accessories','allowance']]},
    {group:'Accessories',unit:'LF · EA',items:[['Through-wall flashing and drip edge','LF'],['Weeps and vents','EA'],['Wall ties and anchors','EA'],['Control and expansion joints','LF'],['Steel lintels (coordinate Div 05)','LF / EA'],['Cavity insulation and drainage mat','SF']]},
    {group:'Labor & equipment',unit:'SF · LS',items:[['Laying by wall type and height','SF'],['Scaffolding by wall area and height','SF / LS'],['Mortar mixer and grout pump','DAY'],['Cold-weather protection where required','LS'],['Cleaning and pointing','SF'],['Sample panel / mock-up','EA']]}],
  sample:{title:'Retail shell — CMU back-up with brick veneer',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['8" CMU, running bond, normal weight','14,200','EA','A-201','21,300','35,500','56,800'],['Modular brick veneer, 6.75 / SF','9,450','SF','A-202','37,800','56,700','94,500'],['Grout, cells @ 32" O.C. + bond beams','38','CY','S-401','7,600','9,120','16,720'],['#5 vertical @ 32" O.C., laps incl.','3,640','LB','S-401','3,276','2,548','5,824'],['9 ga ladder reinf. @ 16" O.C.','6,300','LF','A-301','2,520','1,890','4,410'],['Flashing, weeps, ties, control joints','1','LS','A-301','6,800','4,200','11,000']],
    total:['Division 04 subtotal','79,296','109,958','189,254'],basis:'Quantities from A-201 through A-302 and S-401 in the issued plan set. Type S mortar per Spec 04 20 00. 5% waste on brick, 3% on CMU.'},
  exclusions:['Structural steel lintels and shelf angles (Division 05)','Stone veneer unless specifically detailed','Foundation dowels (Division 03)','Scaffolding beyond stated allowance','Winter protection unless required by schedule','Cleaning of adjacent surfaces'],
  faq:[['What waste factor do you apply?','Typically 3% on CMU and 5% on brick, adjusted for cut-heavy patterns, curved walls, or special shapes. The percentage used is stated on the estimate so you can change it.'],
       ['How do you calculate grout quantity?','From the cell spacing on the structural drawings and the unit\'s published core volume, plus bond beams and lintels at their full section. We state whether the estimate assumes high-lift or low-lift grouting because the labor differs.'],
       ['Is scaffolding included?','As an allowance based on wall area and height, clearly separated. If you own or rent scaffolding on your own terms, delete the line.']] },

{ slug:'metals', art:'a', noun:'structural steel', div:'05', name:'Metals', short:'Structural steel, joists, metal deck, misc. metals, railings',
  lede:'Structural and miscellaneous steel takeoffs by weight and piece count, from the framing plans and details, ready for a fabricator or erector to price.',
  intro:['Steel is estimated by weight and by piece, because both matter — the fabricator prices tonnage and connections, the erector prices picks. We list every member by designation and length, roll it up to weight per shape and grade, and carry connections, bar joists, deck, misc. metals, primer and erection as separate lines.',
         'Quantities come from the structural framing plans and column schedules, coordinated with the architectural set for stairs, railings and miscellaneous metals that often sit in the A-series but price in Division 05.'],
  sheets:'S-200 framing plans, S-300 sections, S-600 column & beam schedules, A-500 stair & railing details, Spec 05 12 00 / 05 21 00 / 05 31 00',
  measure:[
    {group:'Structural steel',unit:'TON · LB · EA',items:[['Columns by shape, grade and length','EA / TON'],['Beams and girders by designation','EA / TON'],['Bracing, kickers and struts','EA / TON'],['Base plates, cap plates, stiffeners','EA / LB'],['Connection allowance by % of weight','%'],['Moment connections counted separately','EA']]},
    {group:'Open-web joists',unit:'EA · LF',items:[['Bar joists by designation and span','EA / LF'],['Joist girders','EA'],['Bridging, rows and type','LF'],['Joist seats and extensions','EA'],['Headers and frames at openings','EA'],['Joist weight for freight and erection','TON']]},
    {group:'Metal deck',unit:'SF · SQ',items:[['Roof deck by profile and gauge','SF'],['Composite floor deck by depth and gauge','SF'],['Form deck','SF'],['Pour stops, closures and edge angles','LF'],['Shear studs by size','EA'],['Deck openings and reinforcement','EA']]},
    {group:'Miscellaneous metals',unit:'EA · LF',items:[['Stairs by flight and landing','EA'],['Handrails and guardrails','LF'],['Ladders, cages and platforms','EA'],['Loose lintels and angles','LF'],['Bollards and pipe guards','EA'],['Embeds, sleeves and anchor bolts','EA']]},
    {group:'Finish & fabrication',unit:'SF · TON',items:[['Shop primer by surface area','SF'],['Galvanizing where specified','TON / LB'],['Intumescent or field paint (coordinate Div 09)','SF'],['Shop drawings and detailing','LS'],['Freight to site','LOAD / TON'],['Mill certifications and testing','LS']]},
    {group:'Erection',unit:'TON · PICK',items:[['Erection by tonnage','TON'],['Crane by size and duration','DAY'],['Field welding and bolting','allowance'],['Plumb, align and shim','LS'],['Deck installation and fastening','SF'],['Safety cable and edge protection','LF']]}],
  sample:{title:'Single-story warehouse — 66,000 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['W10×33 columns, 22\' — 12 EA','4.4','TON','S-601','12,320','4,400','16,720'],['W16×31 beams, 30\' — 24 EA','11.2','TON','S-201','31,360','11,200','42,560'],['24K7 joists @ 5\'-0" — 132 EA','3,960','LF','S-201','43,560','19,800','63,360'],['1½" Type B roof deck, 20 ga','66,000','SF','S-201','118,800','59,400','178,200'],['Connections — 12% of weight','1.9','TON','—','7,600','—','7,600'],['Erection — crane, crew, 8 days','19.5','TON','—','—','27,300','27,300']],
    total:['Division 05 subtotal','213,640','122,100','335,740'],basis:'Members from S-201 and S-601 in the issued plan set. A992 W-shapes, K-series joists per SJI. Connection allowance at 12%.'},
  exclusions:['Fireproofing and intumescent coatings (Division 07 / 09)','Shop drawings unless requested','Field testing and inspection','Ornamental metals and architectural railings unless detailed','Pre-engineered metal buildings (Division 13)','Crane mats and access road improvements'],
  faq:[['How do you handle connections?','As a percentage of main member weight, typically 10 to 15% depending on connection type, stated on the estimate. Moment connections are counted individually because they price very differently from shear tabs.'],
       ['Do you count pieces as well as tonnage?','Yes. Piece count drives erection productivity and crane time. A building with many light members costs more to erect per ton than one with fewer heavy ones, and the estimate reflects that.'],
       ['Is deck included with the joists?','They are carried as separate lines because different suppliers usually furnish them and the erector prices deck by the square, not by the piece.']] },

{ slug:'wood', art:'a', noun:'wood framing', div:'06', name:'Wood & Plastics', short:'Framing, sheathing, engineered lumber, trusses, millwork',
  lede:'Rough and finish carpentry takeoffs — framing lumber by board foot and piece, sheathing by sheet, engineered products by length, hardware by count.',
  intro:['Framing lumber is priced by the board foot but bought by the piece, so we report both. Studs, plates, headers, joists, rafters and blocking are listed by size and length with a stated waste factor, then rolled up to board feet for pricing and to piece counts for ordering.',
         'Engineered lumber, trusses, sheathing, hardware and fasteners each get their own lines. Finish carpentry and millwork are measured from the architectural details and schedules so casework and trim do not get lost in a per-square-foot allowance.'],
  sheets:'S-200 framing plans, A-300 wall sections, A-600 interior elevations & millwork, Spec 06 10 00 / 06 41 00',
  measure:[
    {group:'Wall framing',unit:'BF · EA · LF',items:[['Studs by size, spacing and height','EA / BF'],['Bottom plates, P.T. where required','LF / BF'],['Double top plates','LF / BF'],['Headers by size and span','EA / BF'],['King, jack and cripple studs','EA / BF'],['Blocking, backing and fire blocking','LF / BF']]},
    {group:'Floor & roof framing',unit:'BF · LF · EA',items:[['Joists and rafters by size and length','EA / BF'],['I-joists and LVL by designation','LF'],['Rim board and ledgers','LF'],['Beams and girders, sawn or engineered','LF / EA'],['Roof and floor trusses','EA'],['Bridging, blocking and hangers','LF / EA']]},
    {group:'Sheathing & decking',unit:'SF · SHEET',items:[['Wall sheathing by type and thickness','SF / SHT'],['Roof sheathing','SF / SHT'],['Subfloor and underlayment','SF / SHT'],['Exterior gypsum sheathing','SF / SHT'],['Wood decking and porch framing','SF / BF'],['Waste by panel layout','%']]},
    {group:'Hardware & fasteners',unit:'EA · LB',items:[['Joist hangers and hurricane ties','EA'],['Hold-downs and straps','EA'],['Anchor bolts and sill plate anchors','EA'],['Nails and screws by type','LB / BOX'],['Construction adhesive','TUBE'],['Post bases and caps','EA']]},
    {group:'Finish carpentry',unit:'LF · EA',items:[['Base, casing and crown by profile','LF'],['Door and window trim sets','EA'],['Wood doors and frames (coordinate Div 08)','EA'],['Stair parts — treads, risers, rails','EA / LF'],['Wood paneling and wainscot','SF'],['Shelving and closet systems','LF']]},
    {group:'Millwork & casework',unit:'LF · EA',items:[['Base and wall cabinets by elevation','LF'],['Countertops by material','LF / SF'],['Reception desks and custom units','EA'],['Laminate vs. wood veneer by finish schedule','SF'],['Hardware — pulls, hinges, slides','EA'],['Installation labor by unit','LF / EA']]}],
  sample:{title:'Two-story wood-frame office — 9,600 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['2×6 studs @ 16" O.C., 9\'-1⅛"','1,480','EA','S-201','13,320','11,840','25,160'],['Plates, headers, blocking — 2× material','9,800','BF','S-201','9,310','5,880','15,190'],['11⅞" I-joists @ 16" O.C.','4,320','LF','S-202','15,120','8,640','23,760'],['7/16" OSB wall sheathing','8,900','SF','A-301','6,230','4,450','10,680'],['Roof trusses, 32\' span, 4:12','62','EA','S-203','24,800','9,300','34,100'],['Hangers, straps, hold-downs, fasteners','1','LS','S-501','5,400','2,700','8,100']],
    total:['Division 06 subtotal','74,180','42,810','116,990'],basis:'Quantities from S-201 through S-203 and A-301 in the issued plan set. SPF #2 framing, 10% waste on studs, 8% on sheathing.'},
  exclusions:['Doors, windows and hardware (Division 08)','Insulation and weather barrier (Division 07)','Gypsum board (Division 09)','Structural steel members within wood framing (Division 05)','Truss engineering and stamped drawings','Temporary bracing and shoring beyond standard practice'],
  faq:[['Why report both board feet and piece count?','Suppliers quote framing by the thousand board feet, but crews order and carry pieces. You need the board-foot number to price material and the piece count to order it and estimate handling labor.'],
       ['What waste factor do you use on studs?','Typically 10% on studs and plates, 8% on sheathing, adjusted for complex layouts or non-standard heights. The percentage is stated on the estimate.'],
       ['Do you price trusses or stick framing?','Whichever the drawings show. If the set leaves it open, we price the option stated in the structural notes and flag the alternative as a voluntary alternate.']] },

{ slug:'thermal', art:'a', noun:'roofing and envelope', div:'07', name:'Thermal & Moisture Protection', short:'Roofing, insulation, waterproofing, air barriers, sealants',
  lede:'Roofing, insulation, waterproofing and sealant takeoffs measured from roof plans, wall sections and details, with every assembly layer carried as its own line.',
  intro:['Division 07 is layered work, and the estimate has to be layered too. A roof is not a square-foot number — it is deck prep, vapor retarder, insulation by layer and thickness, tapered systems by average thickness, cover board, membrane, flashing by linear foot, and accessories by count. We measure each one.',
         'Below-grade waterproofing, wall insulation, air and vapor barriers, fireproofing, firestopping, siding, metal panels, gutters and sealants are measured from the wall sections and details, so the envelope estimate is complete rather than a roofing number with an allowance underneath it.'],
  sheets:'A-110 roof plan, A-300 wall sections, A-510 roof details, A-520 flashing details, Spec 07 20 00 / 07 50 00 / 07 60 00 / 07 90 00',
  measure:[
    {group:'Low-slope roofing',unit:'SQ · SF · LF',items:[['Membrane by type — TPO, EPDM, mod-bit, PVC','SQ / SF'],['Attachment — adhered, mechanically fastened, ballasted','SF'],['Base flashing at walls and curbs','LF'],['Parapet cap and coping','LF'],['Walkway pads','SF'],['Roof drains, scuppers and overflows','EA']]},
    {group:'Roof insulation',unit:'SF · BF',items:[['Flat polyiso by layer and thickness','SF'],['Tapered insulation by average thickness','SF / BF'],['Crickets and saddles','EA / BF'],['Cover board by type','SF'],['Vapor retarder','SF'],['Fastening pattern by wind zone','allowance']]},
    {group:'Steep-slope roofing',unit:'SQ · LF',items:[['Shingles, tile, slate or metal by type','SQ'],['Underlayment and ice-and-water shield','SQ / SF'],['Ridge, hip and starter','LF'],['Valley flashing and step flashing','LF'],['Roof vents and penetration boots','EA'],['Gutters and downspouts','LF']]},
    {group:'Wall insulation & barriers',unit:'SF',items:[['Batt insulation by R-value','SF'],['Rigid continuous insulation','SF'],['Spray foam by depth','SF / BF'],['Air and weather-resistive barrier','SF'],['Vapor retarder','SF'],['Sound attenuation batts','SF']]},
    {group:'Waterproofing & damproofing',unit:'SF · LF',items:[['Below-grade sheet or fluid waterproofing','SF'],['Drainage board and protection course','SF'],['Damproofing','SF'],['Plaza deck and split-slab waterproofing','SF'],['Bentonite panels','SF'],['Termination bar and sealant','LF']]},
    {group:'Fire, sealants & cladding',unit:'SF · LF · EA',items:[['Spray fireproofing by hour rating','SF'],['Firestopping at penetrations and joints','EA / LF'],['Joint sealants by location and type','LF'],['Metal wall panels and siding','SF'],['Soffit and fascia','SF / LF'],['Expansion joint covers','LF']]}],
  sample:{title:'Single-story warehouse — 66,000 SF roof',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['60 mil TPO, fully adhered','660','SQ','A-110','92,400','66,000','158,400'],['(2) 2.6" polyiso — R-30, mech. fastened','66,000','SF','A-511','118,800','33,000','151,800'],['Tapered polyiso crickets, ¼"/ft','4,200','SF','A-110','9,240','2,520','11,760'],['½" HD cover board','66,000','SF','A-511','36,300','19,800','56,100'],['Base flashing at parapet & curbs','1,240','LF','A-521','12,400','18,600','31,000'],['Roof drains, overflows, curbs — 14 EA','14','EA','A-110','8,400','4,200','12,600']],
    total:['Division 07 subtotal','277,540','144,120','421,660'],basis:'Roof area from A-110 in the issued plan set. Assembly per A-511. 20-year NDL manufacturer warranty assumed.'},
  exclusions:['Rooftop equipment curbs furnished by mechanical (coordinate)','Wood blocking and nailers (Division 06)','Roof deck repairs or replacement','Lightning protection','Snow retention and fall protection anchors unless detailed','Warranty inspections beyond manufacturer standard'],
  faq:[['Why squares and square feet both?','Roofing suppliers and crews price by the square (100 SF); everyone else on the job thinks in square feet. We report both so the number reconciles across trades.'],
       ['How is tapered insulation quantified?','By average thickness across the tapered area, converted to board feet for purchasing, with crickets and saddles counted separately. The tapered manufacturer\'s layout is the basis when one is included in the set.'],
       ['Is the warranty type accounted for?','Yes. A 20-year NDL warranty changes fastening pattern, seam requirements and inspection cost. We state the warranty assumed and price to it.']] },

{ slug:'finishes', art:'an', noun:'interior finishes', div:'09', name:'Finishes', short:'Drywall, metal framing, ceilings, flooring, tile, paint',
  lede:'Interior finish takeoffs from partition types, finish schedules and reflected ceiling plans — framing, gypsum, ceilings, flooring, tile and paint each measured in the unit its installer prices.',
  intro:['Finishes carry the widest range of units of any division: studs by linear foot, gypsum by sheet and square foot, ceilings by square foot and grid length, carpet by square yard, tile by square foot with base by the foot, paint by square foot with doors and frames by the each. We measure each finish in the unit its subcontractor actually uses.',
         'Quantities are built from the partition schedule, room finish schedule, reflected ceiling plans and finish plans, cross-checked against the specification for finish levels, fire ratings and product basis of design. Room-by-room breakdowns are available where the schedule supports them.'],
  sheets:'A-100 floor plans, A-120 reflected ceiling plans, A-600 partition types, A-601 room finish schedule, Spec 09 21 16 / 09 51 13 / 09 65 00 / 09 91 00',
  measure:[
    {group:'Metal framing',unit:'LF · SF',items:[['Studs by width, gauge and spacing','LF'],['Top and bottom track','LF'],['Deflection track and slip connections','LF'],['Headers, jambs and bracing at openings','EA / LF'],['Furring channel and hat channel','LF'],['Shaft wall studs and J-runner','LF']]},
    {group:'Gypsum board',unit:'SF · SHT',items:[['GWB by type and thickness, each side','SF / SHT'],['Type X and Type C at rated walls','SF'],['Moisture and mold resistant board','SF'],['Shaft liner panels','SF'],['Corner bead, trim and control joints','LF'],['Taping and finishing by level','SF']]},
    {group:'Ceilings',unit:'SF · LF',items:[['Acoustical tile by product','SF'],['Suspension grid by profile','SF / LF'],['Wall angle and edge trim','LF'],['Hard-lid gypsum ceilings and soffits','SF'],['Specialty ceilings — wood, metal, felt','SF'],['Seismic bracing and hangers','SF / EA']]},
    {group:'Flooring',unit:'SF · SY · LF',items:[['Carpet tile and broadloom','SY / SF'],['LVT, VCT and sheet vinyl','SF'],['Wood and laminate','SF'],['Epoxy and resinous flooring','SF'],['Floor prep, patching and moisture mitigation','SF'],['Base by type and height','LF']]},
    {group:'Tile & stone',unit:'SF · LF',items:[['Floor tile by size and type','SF'],['Wall tile','SF'],['Tile base and cove','LF'],['Waterproofing membrane at wet areas','SF'],['Thresholds, trim and edge profiles','LF / EA'],['Grout and setting materials','SF']]},
    {group:'Paint & coatings',unit:'SF · EA',items:[['Walls by paint system and coats','SF'],['Ceilings','SF'],['Doors and frames','EA'],['Exposed structure and deck','SF'],['Exterior paint and stain','SF'],['Wall coverings and specialty finishes','SF / LY']]}],
  sample:{title:'Tenant improvement — 12,400 SF office',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['3⅝" 20 ga studs @ 16" O.C. + track','9,600','LF','A-600','7,680','9,600','17,280'],['5/8" Type X GWB, both sides, Level 4','24,800','SF','A-600','13,640','29,760','43,400'],['2×4 ACT, 15/16" grid','10,900','SF','A-120','27,250','16,350','43,600'],['Carpet tile, 24×24','1,020','SY','A-601','35,700','9,180','44,880'],['LVT at break rooms and corridors','1,850','SF','A-601','8,325','5,550','13,875'],['Paint P-1 walls, 2 coats + doors & frames','26,400','SF','A-601','6,600','19,800','26,400']],
    total:['Division 09 subtotal','99,195','90,240','189,435'],basis:'Quantities from A-100, A-120, A-600 and A-601 in the issued plan set. Finish products per basis of design; alternates not priced.'},
  exclusions:['Floor prep beyond stated allowance','Moisture mitigation unless test results provided','Furniture, fixtures and equipment','Signage and graphics','Window treatments','Access flooring'],
  faq:[['What finish level is assumed on gypsum board?','Whatever the specification calls for by location — commonly Level 4 at painted walls and Level 5 where critical lighting or high-gloss finishes are scheduled. If the spec is silent, we assume Level 4 and say so.'],
       ['What waste do you apply on flooring?','Carpet tile 5 to 8%, broadloom 10 to 15% depending on pattern repeat, LVT 8 to 10%, ceramic tile 10% plus extra at diagonal layouts. The percentage is stated per product.'],
       ['Do you count doors and frames for painting?','Yes, by the each, separated from wall area. A door and frame takes far more labor per square foot than a wall, and lumping them together distorts the paint estimate.']] },

{ slug:'plumbing', art:'a', noun:'plumbing', div:'22', name:'Plumbing', short:'Fixtures, waste & vent, domestic water, gas, equipment',
  lede:'Plumbing takeoffs from plans and riser diagrams — fixtures by the each, piping by size and material, insulation, valves, equipment and underslab work all carried separately.',
  intro:['Plumbing estimates are counts and lengths: fixtures and their carriers by the each, then waste, vent, domestic water, gas and storm piping by diameter and material, with fittings, hangers, valves and insulation carried as their own lines. We measure runs from the plans and check them against the riser diagrams so vertical piping is not missed.',
         'Underslab work, equipment, testing and connections to site utilities at the five-foot line are separated so you can see where labor sequencing and trench coordination with other trades will affect cost.'],
  sheets:'P-100 plumbing plans, P-200 underslab plans, P-500 riser diagrams, P-600 schedules & details, Spec 22 05 00 / 22 11 00 / 22 13 00 / 22 40 00',
  measure:[
    {group:'Fixtures',unit:'EA',items:[['Water closets by type and flush valve','EA'],['Urinals','EA'],['Lavatories and faucets','EA'],['Sinks — kitchen, service, mop, hand','EA'],['Showers, tubs and trim','EA'],['Drinking fountains, bottle fillers, eyewash','EA']]},
    {group:'Sanitary waste & vent',unit:'LF · EA',items:[['Waste piping by size and material','LF'],['Vent piping by size','LF'],['Vent terminations through roof','EA'],['Cleanouts by type and location','EA'],['Floor drains, trench drains, floor sinks','EA'],['Fittings allowance by pipe length','%']]},
    {group:'Domestic water',unit:'LF · EA',items:[['Cold water by size and material','LF'],['Hot water and recirculation','LF'],['Pipe insulation by size and thickness','LF'],['Valves — shutoff, balancing, check','EA'],['Backflow preventers and PRVs','EA'],['Hose bibbs, wall hydrants, trap primers','EA']]},
    {group:'Equipment',unit:'EA',items:[['Water heaters by type and capacity','EA'],['Expansion tanks and mixing valves','EA'],['Booster and circulation pumps','EA'],['Sump and sewage ejector pumps','EA'],['Grease and oil interceptors','EA'],['Water softeners and filtration','EA']]},
    {group:'Gas & storm',unit:'LF · EA',items:[['Natural gas piping by size','LF'],['Gas valves, regulators and meters','EA'],['Roof drains and overflow drains','EA'],['Storm leaders and horizontals','LF'],['Condensate drains (coordinate Div 23)','LF'],['Fuel oil piping where shown','LF']]},
    {group:'Rough-in & labor',unit:'LF · LS',items:[['Underslab trenching and backfill','LF / CY'],['Sleeves, inserts and hangers','EA'],['Fixture carriers and supports','EA'],['Pressure testing and disinfection','LS'],['Core drilling and firestopping','EA'],['Permit and inspection allowance','LS']]}],
  sample:{title:'Three-story office — 36,000 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['Fixtures — WC, urinal, lav, sink, EWC — 48 EA','48','EA','P-601','38,400','19,200','57,600'],['Sanitary waste & vent, PVC, 1½"–4"','2,860','LF','P-501','20,020','42,900','62,920'],['Domestic CW/HW, Type L copper, ½"–2"','3,120','LF','P-502','34,320','46,800','81,120'],['Pipe insulation, 1" fiberglass','2,400','LF','P-502','9,600','7,200','16,800'],['Water heaters (2), circ pump, exp. tank','1','LS','P-601','14,800','4,400','19,200'],['Roof drains & storm leaders, 4"–6"','620','LF','P-100','9,300','12,400','21,700']],
    total:['Division 22 subtotal','126,440','132,900','259,340'],basis:'Fixtures per P-601 and P-100 series in the issued plan set. Piping measured from plans and P-501/P-502 risers. Fittings at 18% of pipe.'},
  exclusions:['Site utilities beyond 5\'-0" from building (Division 33)','Fire protection sprinklers and standpipes (Division 21)','Medical gas and lab gas systems unless shown','Owner-furnished equipment connections beyond stub-outs','Electrical connections to equipment (Division 26)','Utility tap and connection fees'],
  faq:[['Do you measure vertical piping from the risers?','Yes. Plans show horizontal runs; riser diagrams show the vertical. Both are measured and reconciled so stacks and risers are not under-counted.'],
       ['How are fittings and hangers handled?','As a stated percentage of pipe length by system, typically 15 to 20% for fittings, with hangers by count from the support spacing in the specification. Both are visible and adjustable on the estimate.'],
       ['Is underslab rough-in separated from above-slab work?','Always. Underslab work happens on a different schedule, with a different crew and trench coordination. Keeping it separate lets you sequence and price it correctly.']] },

{ slug:'hvac', art:'an', noun:'HVAC', div:'23', name:'HVAC', short:'Equipment, ductwork, piping, insulation, controls, TAB',
  lede:'Mechanical takeoffs from plans and schedules — equipment by the each, ductwork by the pound and the foot, piping by size, plus insulation, controls, testing and balancing.',
  intro:['HVAC pricing lives in the ductwork and the equipment schedule. We count every unit on the schedule by tag, then measure ductwork by size and gauge and convert to pounds of sheet metal — the way fabrication shops actually price it — while also reporting linear feet so field labor can be checked.',
         'Hydronic and refrigerant piping, duct and pipe insulation, diffusers and grilles by count, dampers, controls points, rigging, and testing and balancing are each carried separately so the estimate maps directly onto the subcontractors and suppliers who will furnish them.'],
  sheets:'M-100 HVAC plans, M-200 piping plans, M-500 details, M-600 equipment schedules, Spec 23 05 00 / 23 31 00 / 23 37 00 / 23 09 00',
  measure:[
    {group:'Equipment',unit:'EA',items:[['Rooftop units by tonnage and configuration','EA'],['Air handlers, condensing units, heat pumps','EA'],['VAV and fan-powered boxes','EA'],['Exhaust fans by type and CFM','EA'],['Unit heaters, cabinet heaters, radiant panels','EA'],['Boilers, chillers, cooling towers and pumps','EA']]},
    {group:'Ductwork',unit:'LB · LF · SF',items:[['Rectangular duct by size and gauge','LB / LF'],['Round and spiral duct by diameter','LB / LF'],['Flexible duct by diameter','LF'],['Fittings, transitions and elbows','allowance / EA'],['Duct liner and external wrap','SF'],['Hangers, supports and seismic bracing','EA / LF']]},
    {group:'Air distribution',unit:'EA',items:[['Supply diffusers by size and type','EA'],['Return and exhaust grilles','EA'],['Volume, fire and smoke dampers','EA'],['Louvers and intake hoods','EA'],['Access doors','EA'],['Sound attenuators','EA']]},
    {group:'Piping',unit:'LF · EA',items:[['Chilled and hot water piping by size','LF'],['Refrigerant line sets by size','LF'],['Condensate drain piping','LF'],['Valves, strainers and specialties','EA'],['Pipe insulation by size and thickness','LF'],['Expansion tanks, air separators, glycol feed','EA']]},
    {group:'Controls & TAB',unit:'PT · LS',items:[['DDC controller and points by type','PT'],['Thermostats and sensors','EA'],['Control wiring and conduit','LF'],['BMS integration and graphics','LS'],['Testing, adjusting and balancing','LS / EA'],['Commissioning support','LS']]},
    {group:'Installation',unit:'LS · EA',items:[['Rigging and crane for rooftop equipment','EA / DAY'],['Roof curbs and supports (coordinate Div 07)','EA'],['Startup and manufacturer services','EA'],['Duct pressure testing and cleaning','LS'],['Core drilling, sleeves and firestopping','EA'],['Permits and inspections allowance','LS']]}],
  sample:{title:'Single-story retail — 18,650 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['RTU-1 through RTU-4, 7.5–15 ton, gas heat','4','EA','M-601','96,000','12,000','108,000'],['Rectangular duct, 26 ga galv., 8"–24"','6,850','LB','M-101','27,400','41,100','68,500'],['Flex duct 8"Ø, max 5\'-0"','620','LF','M-101','2,480','3,720','6,200'],['Diffusers, grilles, dampers — 96 EA','96','EA','M-101','9,600','5,760','15,360'],['Duct wrap, 1½" — supply & return','5,200','SF','M-101','6,240','7,800','14,040'],['Controls, thermostats, TAB, startup','1','LS','M-500','14,500','9,800','24,300']],
    total:['Division 23 subtotal','156,220','80,180','236,400'],basis:'Equipment per M-601 in the issued plan set. Ductwork measured from M-101 and converted to pounds per SMACNA gauge schedule. Fittings at 25% of straight duct.'},
  exclusions:['Electrical power and disconnects to equipment (Division 26)','Structural supports and roof openings','Gas piping to equipment (Division 22)','Fire and smoke damper wiring to fire alarm (Division 28)','Utility company service upgrades','Extended warranties beyond manufacturer standard'],
  faq:[['Why is ductwork priced by the pound?','Sheet metal shops fabricate by weight — gauge, size and length convert to pounds of galvanized steel. Linear feet are reported alongside so field labor productivity can be checked, but the pound is the purchasing unit.'],
       ['How are fittings handled?','As a percentage of straight duct weight, typically 20 to 30% depending on layout complexity, stated on the estimate. Runs with many elbows and transitions get the higher end.'],
       ['Is testing and balancing included?','As a separate line, because TAB is usually a third-party contractor and its cost depends on the number of terminals, not the size of the equipment.']] },

{ slug:'electrical', art:'an', noun:'electrical', div:'26', name:'Electrical', short:'Service, distribution, feeders, branch, devices, lighting',
  lede:'Electrical takeoffs from plans, one-line diagrams and schedules — gear by the each, feeders by size and length, branch circuits, devices, fixtures and low-voltage rough-in all counted separately.',
  intro:['Electrical estimating is a count-and-measure discipline. Devices, fixtures, boxes and gear are counted by the each from the plans and schedules; feeders and branch circuits are measured by size and length from the plans and one-line, with conduit and wire carried separately so material can be priced against current copper cost.',
         'Home-run lengths, panel schedules, lighting fixture schedules and the one-line diagram are reconciled against each other so the feeder count matches the breaker count and the fixture count matches the circuiting. Low-voltage rough-in is included where the electrical contractor typically carries it.'],
  sheets:'E-100 lighting plans, E-200 power plans, E-500 one-line & panel schedules, E-600 fixture schedule, Spec 26 05 00 / 26 24 00 / 26 27 00 / 26 51 00',
  measure:[
    {group:'Service & distribution',unit:'EA',items:[['Service entrance by amperage and voltage','EA'],['Switchboards and distribution panels','EA'],['Panelboards by type and circuit count','EA'],['Transformers by kVA','EA'],['Motor control centers and starters','EA'],['Generator, ATS and paralleling gear','EA']]},
    {group:'Feeders',unit:'LF',items:[['Conduit by size and type — EMT, RMC, PVC','LF'],['Conductors by size and count, copper or aluminum','LF / CLF'],['Ground conductors','LF'],['Pull boxes and junction boxes','EA'],['Busway by amperage','LF'],['Underground duct bank and manholes','LF / EA']]},
    {group:'Branch circuits',unit:'LF · EA',items:[['Branch conduit by size','LF'],['Branch wire by gauge','LF / CLF'],['MC cable where permitted','LF'],['Home runs by length band','EA'],['Boxes, covers and fittings','EA'],['Wire management and supports','allowance']]},
    {group:'Devices',unit:'EA',items:[['Receptacles by type — standard, GFCI, isolated ground','EA'],['Switches, dimmers and occupancy sensors','EA'],['Special outlets and disconnects','EA'],['Floor boxes and poke-throughs','EA'],['Equipment connections by amperage','EA'],['Device plates by finish','EA']]},
    {group:'Lighting',unit:'EA',items:[['Fixtures by type from schedule','EA'],['Emergency and exit fixtures','EA'],['Lighting controls — panels, relays, sensors','EA'],['Exterior and site lighting with poles and bases','EA'],['Dimming and daylight harvesting','EA / ZONE'],['Lamps, drivers and spares','allowance']]},
    {group:'Systems & misc.',unit:'EA · LF · LS',items:[['Fire alarm devices and rough-in','EA'],['Data, voice and AV rough-in','EA / LF'],['Security and access control rough-in','EA'],['Grounding and bonding electrode system','LS'],['Lightning protection where shown','LS'],['Temporary power and testing','LS']]}],
  sample:{title:'Single-story retail — 18,650 SF',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['400A 208Y/120V service, CT cabinet, MDP','1','LS','E-501','28,000','9,600','37,600'],['Feeders — 4#3 to 4#500 kcmil, EMT/PVC','1,120','LF','E-501','22,400','16,800','39,200'],['Panelboards LP-1/2/3, 75 kVA xfmr','4','EA','E-502','18,400','6,400','24,800'],['Branch circuits, ¾" EMT + #12 THHN','9,600','LF','E-201','19,200','43,200','62,400'],['Devices — recept., switches, sensors — 214 EA','214','EA','E-201','6,420','12,840','19,260'],['Lighting — 2×4 LED troffers, EM, exit — 148 EA','148','EA','E-601','37,000','17,760','54,760']],
    total:['Division 26 subtotal','131,420','106,600','238,020'],basis:'Gear per E-501/E-502 in the issued plan set. Branch lengths measured from E-201 with home runs from panel locations. Pricing should be aligned to current project conditions.'},
  exclusions:['Utility company fees and primary service','Telecommunications cabling and termination (Division 27) unless included','Fire alarm system design and programming','Owner-furnished equipment beyond connection','Site lighting foundations and trenching (coordinate Div 31/33)','Temporary lighting beyond stated allowance'],
  faq:[['How do you estimate home-run lengths?','From the panel location on the plans to each circuit\'s first device, measured along the likely conduit route, grouped into length bands. The method is stated so it can be checked against your own routing.'],
       ['Are lighting fixtures priced or by others?','Priced from the fixture schedule when a basis of design is listed. When the schedule is a performance spec or the fixture package is owner-furnished, we carry installation only and say so.'],
       ['Do you reconcile the one-line with the panel schedules?','Yes. Feeder count must match breaker count and panel schedules must match device circuiting. Mismatches in the drawings are flagged as assumptions rather than silently resolved.']] },

{ slug:'earthwork', art:'an', noun:'earthwork', div:'31', name:'Earthwork', short:'Clearing, cut & fill, excavation, backfill, grading, erosion control',
  lede:'Earthwork quantities from grading plans and sections — clearing, topsoil strip, cut, fill, import or export, structural excavation, backfill and erosion control, with swell and shrink stated.',
  intro:['Earthwork is where estimates swing the most, because the quantity depends on the method. We calculate cut and fill from the existing and proposed grading surfaces — by grid or by digital terrain model when the civil set includes one — and state the swell and shrink factors used so the haul and import numbers can be checked.',
         'Building pad preparation, structural excavation for footings and utilities, backfill and compaction, rough and fine grading, and erosion control are each carried separately, with the geotechnical report\'s requirements for over-excavation and select fill reflected where the report is provided.'],
  sheets:'C-100 existing conditions, C-200 demolition, C-300 grading plan & sections, C-500 erosion control, geotechnical report, Spec 31 10 00 / 31 20 00 / 31 23 00 / 31 25 00',
  measure:[
    {group:'Site preparation',unit:'AC · SF · CY',items:[['Clearing and grubbing','AC / SF'],['Tree removal by size','EA'],['Topsoil strip and stockpile by depth','CY'],['Demolition of pavement and structures','SF / CY'],['Construction entrance and staging','EA / SF'],['Site fencing and tree protection','LF']]},
    {group:'Mass grading',unit:'CY',items:[['Cut to grade, bank measure','CY'],['Fill from on-site material, compacted','CY'],['Import fill with shrink factor','CY'],['Export with swell factor and haul distance','CY / MI'],['Rock excavation where indicated','CY'],['Unsuitable material removal allowance','CY']]},
    {group:'Building pad',unit:'CY · SF',items:[['Pad over-excavation per geotech','CY'],['Structural fill, select, compacted in lifts','CY'],['Moisture conditioning','CY'],['Proof-rolling and testing coordination','SF'],['Pad fine grading','SF'],['Sub-slab granular base (coordinate Div 03)','CY / TON']]},
    {group:'Structural excavation',unit:'CY · LF',items:[['Footing and grade beam excavation','CY / LF'],['Elevator pit and deep excavation','CY'],['Trenching for utilities by depth','LF / CY'],['Backfill and compaction','CY'],['Bedding and pipe zone material','CY / TON'],['Shoring, sloping and trench boxes','LF / LS']]},
    {group:'Finish grading',unit:'SF · SY',items:[['Rough grading','SY'],['Fine grading at pavement and building','SY'],['Topsoil respread by depth','CY / SF'],['Slope grading and benching','SF'],['Swales and ditches','LF'],['Final dressing at landscape areas','SF']]},
    {group:'Erosion & sediment control',unit:'LF · EA',items:[['Silt fence','LF'],['Inlet protection','EA'],['Stabilized construction entrance','EA'],['Sediment basins and traps','EA / CY'],['Seeding, mulch and matting for stabilization','SF / SY'],['SWPPP inspections and maintenance','MO']]}],
  sample:{title:'Warehouse site — 5.2 acres',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['Clearing & grubbing, light brush','4.1','AC','C-201','—','14,350','14,350'],['Topsoil strip, 6", stockpile on site','3,420','CY','C-301','—','10,260','10,260'],['Cut to grade, bank measure','12,400','CY','C-301','—','37,200','37,200'],['Fill, on-site, compacted 95%','8,600','CY','C-301','—','34,400','34,400'],['Export, 20% swell, 8 mi haul','4,560','CY','C-301','—','41,040','41,040'],['Silt fence, inlet protection, entrance','1','LS','C-501','8,900','7,600','16,500']],
    total:['Division 31 subtotal','8,900','144,850','153,750'],basis:'Cut/fill by DTM comparison of C-101 and C-301 in the issued plan set. Shrink 15%, swell 20%. No rock assumed where geotechnical information is not provided.'},
  exclusions:['Rock excavation unless indicated on the drawings or geotech','Contaminated or hazardous soil handling','Dewatering beyond sump pumping','Unsuitable soils beyond stated allowance','Off-site improvements and right-of-way work','Survey, staking and testing fees'],
  faq:[['How do you calculate cut and fill?','By comparing existing and proposed surfaces — a grid method on simple sites, a digital terrain model where the civil set provides surfaces. The method is stated on the estimate with the shrink and swell factors applied.'],
       ['What if there is no geotechnical report?','We estimate to the drawings and flag pad preparation, over-excavation and fill quality as assumptions. When the report arrives, those lines are revised.'],
       ['Is rock included?','Only when the drawings or geotech indicate it. If borings show rock within the excavation depth, it is priced as a separate line so the risk is visible.']] },

{ slug:'exterior', art:'a', noun:'site paving and landscape', div:'32', name:'Exterior Improvements', short:'Paving, curbs, walks, striping, fencing, retaining walls, landscape',
  lede:'Site improvement takeoffs from civil and landscape plans — asphalt and concrete paving by section, curb and gutter, sidewalks, striping, fencing, walls and planting.',
  intro:['Paving is measured in the units each layer is bought in: aggregate base by ton or cubic yard, asphalt by ton from the section thickness, concrete paving by square foot with thickness noted, curb and gutter by linear foot with the profile identified. We build each pavement section from the civil details rather than pricing lots by the square yard.',
         'Sidewalks, ADA ramps, striping and signage, fencing and gates, retaining walls, site furnishings and the full landscape and irrigation scope are each carried on their own lines, measured from the site plan, landscape plan and details.'],
  sheets:'C-100 site plan, C-400 paving plan & details, L-100 landscape plan, L-200 irrigation, L-500 details, Spec 32 12 16 / 32 13 13 / 32 16 13 / 32 31 13 / 32 90 00',
  measure:[
    {group:'Asphalt paving',unit:'TON · SY',items:[['Aggregate base by thickness','TON / CY'],['Asphalt binder course by thickness','TON'],['Asphalt surface course','TON'],['Tack and prime coat','SY / GAL'],['Milling and overlay where shown','SY'],['Subgrade preparation','SY']]},
    {group:'Concrete paving & flatwork',unit:'SF · LF · CY',items:[['Concrete pavement by thickness','SF / CY'],['Sidewalks by width','SF'],['Curb and gutter by profile','LF'],['ADA ramps with detectable warnings','EA'],['Dumpster pads and approaches','SF'],['Joints, dowels and reinforcement','LF / LB']]},
    {group:'Markings & signage',unit:'LF · EA',items:[['Parking stall striping','LF'],['Accessible stalls with symbols','EA'],['Directional arrows and stop bars','EA'],['Signs, posts and bollards','EA'],['Wheel stops','EA'],['Fire lane markings','LF']]},
    {group:'Fencing & walls',unit:'LF · SF · EA',items:[['Chain link fencing by height','LF'],['Ornamental or wood fencing','LF'],['Gates by type and width','EA'],['Segmental or CIP retaining walls by face area','SF'],['Guardrail and handrail at site','LF'],['Screen walls and enclosures','SF / EA']]},
    {group:'Landscape',unit:'EA · SF · CY',items:[['Trees by caliper and species','EA'],['Shrubs and perennials by container size','EA'],['Sod','SF / SY'],['Seed and hydroseed','SF / AC'],['Mulch and planting soil','CY'],['Edging and weed barrier','LF / SF']]},
    {group:'Irrigation & furnishings',unit:'ZONE · EA',items:[['Irrigation by zone and head count','ZONE / EA'],['Mainline, laterals and controller','LF / EA'],['Backflow and point of connection','EA'],['Benches, bike racks, receptacles','EA'],['Site lighting bases (coordinate Div 26)','EA'],['Maintenance period and warranty','MO']]}],
  sample:{title:'Warehouse site — 5.2 acres',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['8" aggregate base, compacted','3,860','TON','C-401','61,760','23,160','84,920'],['3" HMA — 2" binder + 1" surface','1,540','TON','C-401','138,600','46,200','184,800'],['6" concrete curb & gutter','2,180','LF','C-402','26,160','30,520','56,680'],['5" concrete sidewalk w/ ADA ramps','6,400','SF','C-402','25,600','22,400','48,000'],['Striping, symbols, signs, wheel stops','1','LS','C-101','6,200','4,800','11,000'],['Trees, shrubs, sod, mulch, irrigation','1','LS','L-101','48,500','32,000','80,500']],
    total:['Division 32 subtotal','306,820','159,080','465,900'],basis:'Paving areas from C-101 and sections from C-401 in the issued plan set. HMA at 110 lb/SY-in. Planting per L-101 schedule.'},
  exclusions:['Site lighting fixtures and wiring (Division 26)','Site utilities (Division 33)','Off-site and right-of-way improvements','Permit, bond and inspection fees','Soil amendment beyond specification','Plant establishment beyond stated maintenance period'],
  faq:[['How is asphalt tonnage calculated?','Area in square yards multiplied by thickness in inches multiplied by 110 pounds per square yard-inch, adjusted for the mix density in the specification. The factor is stated so it can be checked against your supplier.'],
       ['Are ADA ramps and detectable warnings separated?','Yes, by the each. They carry significantly more labor and material than the equivalent area of plain sidewalk and are a frequent inspection item.'],
       ['Do you price landscape from the plant schedule?','From the schedule when one is provided, by species, size and count. When only symbols are shown, we count symbols and state the assumed size.']] },

{ slug:'utilities', art:'a', noun:'site utility', div:'33', name:'Utilities', short:'Site water, sanitary, storm, gas, electrical duct bank, structures',
  lede:'Site utility takeoffs from civil plans and profiles — pipe by size, material and depth, structures by the each, with trenching, bedding, backfill, connections and testing carried separately.',
  intro:['Site utilities are priced by depth as much as by length. We measure water, sanitary, storm, gas and electrical duct bank from the utility plans and profiles, band each run by depth, and carry trench excavation, bedding, pipe zone backfill and surface restoration as separate lines because they usually cost more than the pipe.',
         'Manholes, catch basins, valves, hydrants, cleanouts and detention structures are counted by the each with depth or size noted. Connections to existing mains, tapping sleeves, and utility company requirements are separated so tap and connection fees can be tracked against the owner\'s budget.'],
  sheets:'C-400 utility plan, C-410 utility profiles, C-500 storm drainage plan, C-600 utility details, Spec 33 11 00 / 33 31 00 / 33 41 00 / 33 71 00',
  measure:[
    {group:'Water distribution',unit:'LF · EA',items:[['Water main by size and material, depth banded','LF'],['Domestic and fire services','LF'],['Gate valves and valve boxes','EA'],['Fire hydrant assemblies','EA'],['Tapping sleeves and connections','EA'],['Thrust blocks, restraints and testing','EA / LS']]},
    {group:'Sanitary sewer',unit:'LF · EA · VF',items:[['Gravity main by size and material','LF'],['Depth bands for trenching','LF'],['Manholes by diameter and depth','EA / VF'],['Cleanouts and laterals','EA / LF'],['Force main and lift station where shown','LF / EA'],['Connection to existing and core drilling','EA']]},
    {group:'Storm drainage',unit:'LF · EA',items:[['Storm pipe by size and material','LF'],['Catch basins, inlets and area drains','EA'],['Storm manholes and junction boxes','EA / VF'],['Headwalls, end sections and rip-rap','EA / CY'],['Underground detention or retention systems','CY / EA'],['Water quality units and outlet structures','EA']]},
    {group:'Dry utilities',unit:'LF · EA',items:[['Electrical duct bank by conduit count','LF'],['Pull boxes, vaults and transformer pads','EA'],['Gas service by size','LF'],['Telecom and fiber conduit','LF'],['Site lighting conduit (coordinate Div 26)','LF'],['Utility company coordination allowance','LS']]},
    {group:'Trenching & backfill',unit:'LF · CY',items:[['Trench excavation by depth band','LF / CY'],['Bedding and pipe zone material','CY / TON'],['Backfill — native or select','CY'],['Compaction and testing','CY'],['Shoring and trench safety','LF'],['Dewatering allowance','LS']]},
    {group:'Restoration & testing',unit:'SF · LS',items:[['Pavement cut and patch','SF'],['Curb, walk and landscape restoration','LF / SF'],['Pressure testing and disinfection','LS'],['CCTV inspection of gravity lines','LF'],['Mandrel and air testing','LF'],['As-built survey','LS']]}],
  sample:{title:'Warehouse site — 5.2 acres',cols:['Description','Qty','Unit','Sheet','Material','Labor','Total'],rows:[
    ['12" DIP water main, 4\'–6\' depth','640','LF','C-401','44,800','32,000','76,800'],['Hydrants (2), valves (4), tapping sleeve','1','LS','C-601','21,400','9,800','31,200'],['8" PVC sanitary @ 0.5%, 6\'–10\' depth','820','LF','C-411','16,400','45,100','61,500'],['Sanitary manholes, 48" dia. — 4 EA, 32 VF','32','VF','C-601','12,800','9,600','22,400'],['15" RCP storm, 3\'–5\' depth','1,140','LF','C-501','31,920','39,900','71,820'],['Catch basins & storm structures — 9 EA','9','EA','C-501','27,000','13,500','40,500']],
    total:['Division 33 subtotal','154,320','149,900','304,220'],basis:'Pipe lengths from C-401/C-501 with depths from C-411 profiles in the issued plan set. Class B bedding, native backfill. Rock not assumed.'},
  exclusions:['Utility company tap, connection and capacity fees','Rock excavation unless indicated','Dewatering beyond stated allowance','Work within public right-of-way requiring traffic control','Building plumbing within 5\'-0" of the structure (Division 22)','Easement acquisition and permitting'],
  faq:[['Why are pipes banded by depth?','Because trench cost rises sharply with depth — more excavation, more shoring, more backfill, slower production. A 10-foot-deep sanitary run costs far more per foot than a 4-foot water line of the same diameter.'],
       ['Are connection fees included?','No. Tap fees, capacity charges and utility company work are owner costs that vary by jurisdiction. They are listed as exclusions so they are not forgotten in the owner\'s budget.'],
       ['Do you read the profiles or just the plan?','Both. The plan gives horizontal length; the profiles give invert elevations, depth and slope. Estimating from the plan alone under-prices deep runs.']] }
];
export const SERVICES: Service[] =
[
{ slug:'takeoffs', code:'SVC-01', ico:'takeoff', name:'Material takeoffs', short:'Quantities measured from your drawings, organized by CSI division or your own cost codes.',
  desc:'Every quantity in the plan set, measured digitally and organized the way your team reads an estimate — by CSI MasterFormat division, by location, or by your own cost code structure. Each line carries the sheet and detail it came from.',
  points:['Digital measurement from PDF or CAD backgrounds in Bluebeam, Planswift or On-Screen Takeoff','Waste, lap and overage factors applied by material and stated on the estimate','Openings deducted at the unit level, not by blanket percentage','Sheet and detail reference on every line','Delivered as an editable Excel workbook with formulas intact'],
  who:'Subcontractors who price their own labor and just need accurate quantities; suppliers building material quotes; general contractors checking sub bids.' },
{ slug:'estimating', code:'SVC-02', ico:'estimate', name:'Cost estimating', short:'Takeoff quantities priced with material, labor and equipment broken out separately.',
  desc:'Quantities become a priced estimate with material, labor and equipment in separate columns, so you can substitute your own rates without rebuilding anything. Regional labor rates, current material pricing, crew productivity and stated overhead and profit assumptions.',
  points:['Material priced at current supplier or published cost, dated on the estimate','Labor by crew productivity and regional wage rates — union, prevailing or open shop as specified','Equipment by duration and type','General conditions, overhead and profit as visible, adjustable lines','Exclusions, assumptions and clarifications documented on every estimate'],
  who:'Contractors bidding work who need a complete, defensible number; owners and developers checking budgets; contractors validating an in-house estimate.' },
{ slug:'bid-prep', code:'SVC-03', ico:'bid', name:'Bid preparation', short:'Bid-ready documents formatted to the owner\'s or GC\'s requirements.',
  desc:'The paperwork around the number. We format the submission to the bid documents\' requirements so nothing gets thrown out on a technicality — bid forms, schedules of values, unit price sheets, scope letters, alternates and bid-day pricing updates.',
  points:['Bid forms and schedules of values completed to the bid instructions','Scope letters defining inclusions, exclusions and clarifications','Base bid, alternates and voluntary alternates priced separately','Unit prices and allowances as required','Bid-day support for addenda and last-minute quote changes'],
  who:'Contractors submitting formal bids to GCs, owners or public agencies where format compliance matters.' },
{ slug:'precon', code:'SVC-04', ico:'precon', name:'Preconstruction budgets', short:'Order-of-magnitude and design-phase budgets before drawings are complete.',
  desc:'Numbers before there are complete drawings — so an owner can decide whether a project is viable before spending more on design, and so the design team can be steered toward the budget rather than surprised by it at bid.',
  points:['Conceptual and square-foot budgeting from program and massing','Budget updates at schematic, design development and construction documents','Value engineering options with cost deltas','Cost comparison between design alternatives and systems','Budget-to-bid reconciliation when bids come in'],
  who:'Design-build contractors, developers, owners and architects who need cost input during design.' },
{ slug:'drafting', code:'SVC-05', ico:'draft', name:'Drafting support', short:'Shop drawings, as-builts and markups when the estimate needs drawings that don\'t exist yet.',
  desc:'Sometimes the estimate needs a drawing that does not exist — a shop drawing to confirm a fabrication quantity, a marked-up plan for the field, an as-built for a change order. We produce them in AutoCAD or Revit to your standards.',
  points:['Shop and fabrication drawings for steel, millwork and specialty items','Redline incorporation and as-built drawings','Takeoff markups exported for field use','Coordination drawings for MEP conflicts','Sketch-to-CAD conversion for change orders'],
  who:'Subcontractors and fabricators needing submittals; contractors documenting changes; anyone whose estimate depends on a drawing the design team has not produced.' }
];
export const AUDIENCES = [
  { slug:'general-contractors', code:'GC', icon:'gc', name:'General contractors', intro:'Full-building budgets and multi-division estimates when your in-house team is already committed to another pursuit.', details:'We produce the complete estimate — every division, general conditions and markups — organized so you can drop subcontractor quotes in as they arrive and see where they land against our number.', items:['Complete hard-bid estimates, all divisions','Conceptual and design-development budgets','Sub bid leveling and scope gap analysis','Self-perform trade takeoffs (concrete, carpentry)','Change order pricing and quantity verification','Overflow capacity during heavy bid seasons'] },
  { slug:'subcontractors', code:'SUB', icon:'sub', name:'Subcontractors', intro:'Single-trade takeoffs priced to your own labor rates and production factors, not generic book values.', details:'You know what your crews produce; we measure the work and build the estimate around your numbers so the result is a bid you can actually execute.', items:['Trade-specific takeoffs from any of our twelve divisions','Estimates priced to your labor and productivity rates','Quantity-only takeoffs when you price in-house','Scope letters and bid form preparation','Recurring capacity — a set number of bids per month','Second-opinion review before bid day'] },
  { slug:'suppliers-fabricators', code:'SUPPLY', icon:'supplier', name:'Suppliers & fabricators', intro:'Material quantity lists pulled straight from the plan set so your quote goes out with the bid instead of after it.', details:'Rebar by size and weight, lumber by piece and board foot, steel by member, roofing by square, finishes by product — organized the way your order desk needs it.', items:['Rebar takeoffs with bar lists','Lumber and panel packages','Structural steel and joist packages','Roofing and insulation material lists','Flooring, tile and ceiling quantities','Site pipe and structure lists'] },
  { slug:'architects-owners', code:'DESIGN', icon:'arch', name:'Architects & owners', intro:'Cost input during design, before the bids reveal the problem.', details:'Square-foot budgets from program and massing, updated at each design phase, with value-engineering options priced so decisions can be made on numbers rather than instinct.', items:['Conceptual budgets from program','Schematic and DD estimate updates','System and material comparisons','Value engineering with cost deltas','Bid reconciliation when bids arrive','Independent cost checks on proposals'] },
] as const;
export const NAV_ITEMS = [
  ['Services', '/services'],
  ['Estimation', '/estimation'],
  ['Trades', '/trades'],
  ['Markets', '/markets'],
  ['How It Works', '/how-it-works'],
  ['Who We Serve', '/who-we-serve'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const;
export const FOOTER_NAV_ITEMS = [
  ['About', '/about'],
  ['Estimation', '/estimation'],
  ['Markets', '/markets'],
  ['How it works', '/how-it-works'],
  ['Who we serve', '/who-we-serve'],
  ['Contact', '/contact'],
  ['Send your plans', '/quote'],
] as const;
export const CSI_TRADE_LIST = [
  'General Construction-GC',
  'Remodeling',
  'Restoration',
  'Marine work',
  'Glazing',
  'Paving',
  'Roofing',
  'Metal framing',
  'Government Infrastructure',
  'HVAC-Heating cooling and ventilation',
  'MEP-Mechanical Electrical Plumbing',
  'Ceiling/drywall',
  'Excavation',
  'Insulation',
  'Demolition',
  'Structural',
  'Landscaping',
  'Bridge work',
  'Airport construction',
  'Roads & Tenders Governmental',
  'Flooring',
  'Bath & Tiles',
  'Lumber wood work',
  'Fencing',
] as const;
export const LEGAL = {
  "privacy": [
    [
      "1. Who we are",
      "PreCon Ext (“we,” “us”) provides construction estimating, quantity takeoff and related preconstruction services to contractors, suppliers, design professionals and owners. This policy applies to our website and to information we collect when you request or receive our services."
    ],
    [
      "2. Information we collect",
      "We collect information you provide directly: your name, company, email address, phone number, project location, bid dates, scope notes and any files you upload or link. We collect information automatically when you visit the website, such as IP address, browser type, pages viewed and referring site, through standard server logs and analytics tools described in Section 7. We do not collect payment card numbers on the website."
    ],
    [
      "3. How we use information",
      "We use your information to respond to quote requests, produce and deliver estimates, communicate about your projects, invoice for services, improve the website and our services, and comply with legal obligations. If you opt in, we use your email to send occasional updates about our services; every such email includes an unsubscribe link."
    ],
    [
      "4. Plan sets and project documents",
      "Drawings, specifications, pricing and other project documents you send us are treated as confidential business information. We use them only to understand and produce the services you request, and do not sell or publish them."
    ],
    [
      "5. Text messaging (SMS)",
      "This website does not currently request SMS consent or send text messages. If that changes, the privacy and consent language will be updated before the feature is enabled."
    ],
    [
      "6. How we share information",
      "We share information with service providers who help us operate — hosting, email delivery, SMS delivery, file storage, analytics, invoicing and payment processing — each bound to use it only on our behalf. We may disclose information to comply with law, enforce our agreements, or protect rights and safety. If the business is sold or merged, information may transfer to the successor under this policy. We do not sell personal information and we do not share it for cross-context behavioral advertising."
    ],
    [
      "7. Cookies and analytics",
      "The website uses essential cookies to function and may use analytics tools to understand how visitors use the site. You can control cookies through your browser settings."
    ],
    [
      "8. Data retention",
      "We retain quote requests, contact information, project documents, and estimates only as long as needed to respond, support an engagement, satisfy legal obligations, resolve disputes, or maintain appropriate business records."
    ],
    [
      "9. Security",
      "We protect information with access controls, encryption in transit, and confidentiality obligations on our personnel. No system is perfectly secure; if we learn of a breach affecting your information, we will notify you as required by law."
    ],
    [
      "10. Your rights — including California residents",
      "You may ask us to access, correct, or delete personal information we hold about you, and to opt out of marketing communications. Use the project request form to make a request; we will verify it and respond within the time required by law."
    ],
    [
      "11. Children",
      "Our services are for businesses and are not directed to anyone under 18. We do not knowingly collect information from minors."
    ],
    [
      "12. Changes to this policy",
      "We may update this policy. The effective date at the top reflects the latest version. Material changes will be noted on the website."
    ],
    [
      "13. Contact",
      "Use the project request form to contact PreCon Ext about privacy questions or requests."
    ]
  ],
  "terms": [
    [
      "1. Acceptance",
      "By requesting a quote, approving a quote, or using this website, you agree to these Terms. If you are acting for a company, you represent that you are authorized to bind it. If you do not agree, do not use the services or the website."
    ],
    [
      "2. Services and quotes",
      "We provide construction quantity takeoffs, cost estimates, bid preparation, preconstruction budgets and drafting support (“Services”) as described on this website. Each engagement begins with a written quote stating scope, price and delivery date. Work begins only after you approve the quote in writing (email is sufficient). The quote and these Terms together form the agreement for that engagement. If they conflict, the quote controls for that engagement."
    ],
    [
      "3. Client responsibilities",
      "You are responsible for providing complete and current drawings, specifications, addenda and project information, and for telling us the bid due date, project location and any scope you want included or excluded. Delays or errors caused by incomplete or outdated documents are not our responsibility, and revisions required by documents provided after quote approval may be charged as additional work."
    ],
    [
      "4. Nature of estimates — no guarantee",
      "An estimate is a professional opinion of probable quantities and cost based on the documents provided and the assumptions stated in the deliverable. It is not a guarantee of actual quantities, costs, bid results, or project outcomes. Market prices, labor availability, site conditions, design changes and bidding strategy are outside our control. You are responsible for reviewing the deliverable, verifying it against your own knowledge and the bid documents, applying your own markups and judgment, and deciding whether and how to bid."
    ],
    [
      "5. Revisions and addenda",
      "Addenda and revisions issued during the bid period for the same project are included in the engagement at no additional charge, provided they are sent to us promptly and do not materially change the scope quoted. Changes after bid, redesigns, or requests to re-scope the estimate are new work and will be quoted separately. Rush revisions may carry a rush fee stated at the time of request."
    ],
    [
      "6. Fees and payment",
      "Fees and payment timing are stated in the applicable written quote or agreement. Fees exclude applicable taxes unless the agreement says otherwise."
    ],
    [
      "7. Confidentiality",
      "Each party will keep the other’s non-public information confidential and use it only for the engagement. Your drawings, specifications, pricing and bid information are your confidential information; our methods, templates, pricing databases, and workbook structures remain ours. These obligations do not apply to information that is public, independently developed, or required to be disclosed by law."
    ],
    [
      "8. Intellectual property and deliverables",
      "On payment in full, you own the deliverable for the project it was prepared for and may use it for bidding, budgeting and construction of that project. We retain ownership of our templates, methods, pricing data, software and any pre-existing materials incorporated into the deliverable, and may reuse them for other clients. You may not resell or redistribute the deliverable as a stand-alone product or represent it as prepared by another estimator."
    ],
    [
      "9. Limitation of liability",
      "To the fullest extent permitted by law, our total liability for any claim arising from an engagement is limited to the fees paid for that engagement. We are not liable for lost profits, lost bids, consequential, incidental, special or punitive damages, or for costs arising from your reliance on the estimate in bidding or performing work. Some jurisdictions do not allow certain limitations; in those, our liability is limited to the extent permitted."
    ],
    [
      "10. Indemnification",
      "You will defend and indemnify us against third-party claims arising from your bids, contracts, or construction work, except to the extent caused by our gross negligence or willful misconduct."
    ],
    [
      "11. SMS terms",
      "This website does not currently offer SMS messaging. No text-message consent is collected through the project request form."
    ],
    [
      "12. Website use",
      "The website and its content are ours or our licensors’ and are for your business use in evaluating and requesting our services. Do not scrape, copy for republication, reverse-engineer, or use the site to send spam or unlawful content. Sample estimates, figures and drawings on the site are illustrative and are not offers or guarantees. Links to third-party sites are provided for convenience; we are not responsible for their content."
    ],
    [
      "13. Governing law and disputes",
      "These Terms are governed by applicable law. Any engagement-specific dispute process or forum will be stated in the applicable written agreement."
    ],
    [
      "14. General",
      "These Terms and the applicable quote are the entire agreement for an engagement and supersede prior discussions. If any provision is unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver. You may not assign the agreement without our consent; we may assign to a successor. Notices go to the addresses in the quote or on the Contact page. We may update these Terms for future engagements by posting the revised version with a new effective date."
    ]
  ]
} as const;
