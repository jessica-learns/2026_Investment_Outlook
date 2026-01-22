import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, ResponsiveContainer, Cell, ReferenceLine, Tooltip, ScatterChart, Scatter, ZAxis, CartesianGrid } from 'recharts';

// ============================================================================
// AI MARKET THEMES REPORT V8 - OPTIMIZED
// Architecture: Data-driven rendering for High Conviction + Deep Dive sections
// ============================================================================

export default function AIMarketThemesReportV8() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeView, setActiveView] = useState('momentum');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Silver & Gold chart state (must be at component level, not nested)
  const [chartAnimationPhase, setChartAnimationPhase] = useState(0);
  const [chartHoveredSeries, setChartHoveredSeries] = useState(null);
  const [chartVisibleSeries, setChartVisibleSeries] = useState({ gold: true, silver: true, sp500: true });
  
  // Chart animation effect
  useEffect(() => {
    if (activeSection === 8) { // Silver & Gold section
      setChartAnimationPhase(0);
      const timer1 = setTimeout(() => setChartAnimationPhase(1), 100);
      const timer2 = setTimeout(() => setChartAnimationPhase(2), 300);
      const timer3 = setTimeout(() => setChartAnimationPhase(3), 500);
      const timer4 = setTimeout(() => setChartAnimationPhase(4), 1200);
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
    }
  }, [activeSection]);

  // ==========================================================================
  // COLOR SYSTEM & STYLES
  // ==========================================================================
  const p = {
    surface1: '#FFFFFF', surface2: '#F0F1F4', border: '#C1C7D4',
    neutral: '#657085', strong: '#0b0c0e', action: '#FE4207',
    positive: '#059669', negative: '#DC2626', accent: '#0077B6', gold: '#B8860B', warning: '#D97706',
  };

  // Category colors per user request: orange for High Conviction (energy), navy for Watchlist, muted for others
  const catColors = { 'High Conviction': '#FE4207', 'Watchlist': '#0077B6', 'Avoid': '#9CA3AF', 'Excluded': '#C1C7D4' };

  // Theme data from V14
  const themeData = [
    { theme: "Data Storage", category: "Watchlist", stockCount: 5, medianReturn6M: 122.74, medianReturn3M: 44.66, medianRevGrowth: 21.26, pctMarginImproving: 100.0 },
    { theme: "Precious Metals", category: "Watchlist", stockCount: 12, medianReturn6M: 102.35, medianReturn3M: 15.75, medianRevGrowth: 58.71, pctMarginImproving: 85.7 },
    { theme: "Respiratory Pharma", category: "Watchlist", stockCount: 8, medianReturn6M: 74.49, medianReturn3M: 16.11, medianRevGrowth: 19.09, pctMarginImproving: 66.7 },
    { theme: "Immunology Pharma", category: "Watchlist", stockCount: 16, medianReturn6M: 61.02, medianReturn3M: 23.75, medianRevGrowth: 36.14, pctMarginImproving: 66.7 },
    { theme: "Semi Equipment", category: "High Conviction", stockCount: 65, medianReturn6M: 47.16, medianReturn3M: 15.0, medianRevGrowth: 9.67, pctMarginImproving: 59.4 },
    { theme: "US Wholesale Power", category: "Watchlist", stockCount: 9, medianReturn6M: 34.55, medianReturn3M: -3.06, medianRevGrowth: 11.25, pctMarginImproving: 75.0 },
    { theme: "Defense & Aerospace", category: "High Conviction", stockCount: 28, medianReturn6M: 32.19, medianReturn3M: 13.41, medianRevGrowth: 10.38, pctMarginImproving: 32.1 },
    { theme: "Space & Satellites", category: "High Conviction", stockCount: 38, medianReturn6M: 31.53, medianReturn3M: 22.24, medianRevGrowth: 13.84, pctMarginImproving: 55.6 },
    { theme: "Specialty Contracting", category: "Watchlist", stockCount: 30, medianReturn6M: 31.51, medianReturn3M: 13.7, medianRevGrowth: 14.13, pctMarginImproving: 42.9 },
    { theme: "Power Gen Equipment", category: "High Conviction", stockCount: 36, medianReturn6M: 29.07, medianReturn3M: -2.39, medianRevGrowth: 15.97, pctMarginImproving: 45.2 },
    { theme: "Interconnects", category: "Watchlist", stockCount: 21, medianReturn6M: 24.07, medianReturn3M: 7.82, medianRevGrowth: 22.09, pctMarginImproving: 61.9 },
    { theme: "Mortgage REITs", category: "Excluded", stockCount: 23, medianReturn6M: 14.5, medianReturn3M: 12.74, medianRevGrowth: 15.47, pctMarginImproving: 73.9 },
    { theme: "Behind-Meter Power", category: "Watchlist", stockCount: 50, medianReturn6M: 12.88, medianReturn3M: 5.95, medianRevGrowth: 9.41, pctMarginImproving: 41.7 },
    { theme: "Investment Banking", category: "Excluded", stockCount: 9, medianReturn6M: 12.65, medianReturn3M: 12.24, medianRevGrowth: 22.44, pctMarginImproving: 62.5 },
    { theme: "Design Software", category: "Avoid", stockCount: 21, medianReturn6M: -1.04, medianReturn3M: 5.64, medianRevGrowth: 18.32, pctMarginImproving: 33.3 },
    { theme: "Internet Hosting", category: "Avoid", stockCount: 21, medianReturn6M: -4.12, medianReturn3M: -7.93, medianRevGrowth: 15.69, pctMarginImproving: 57.1 },
    { theme: "AI Software", category: "Avoid", stockCount: 115, medianReturn6M: -14.91, medianReturn3M: -9.61, medianRevGrowth: 13.56, pctMarginImproving: 63.4 }
  ];

  const filteredThemeData = selectedCategory === 'All' ? themeData : themeData.filter(d => d.category === selectedCategory);
  const highConvictionThemesList = themeData.filter(d => d.category === 'High Conviction');
  const momentumScatterData = filteredThemeData.map(d => ({ ...d, x: d.medianReturn6M, y: d.medianReturn3M, z: d.stockCount * 50 }));
  const fundamentalScatterData = filteredThemeData.map(d => ({ ...d, x: d.medianRevGrowth, y: d.pctMarginImproving, z: d.stockCount * 50 }));
  // Trend line for y = x/2 (steady momentum)
  const trendLineData = [{ x: -30, y: -15 }, { x: 140, y: 70 }];

  const s = {
    coverTitle: { color: p.strong, fontFamily: "'Playfair Display', serif", fontSize: '72px', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' },
    sectionNum: { color: p.border, fontFamily: "'Playfair Display', serif", fontSize: '88px', fontWeight: 300, lineHeight: 1 },
    sectionTitle: { color: p.strong, fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 900, margin: 0 },
    themeTitle: { color: p.strong, fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, marginBottom: '3px' },
    h4: { color: p.strong, fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '22px', marginBottom: '3px' },
    subhead: { color: p.strong, fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '26px', marginBottom: '6px' },
    body: { color: p.neutral, fontSize: '20px', lineHeight: 1.7 },
    bodyLg: { color: p.neutral, fontSize: '22px', lineHeight: 1.7 },
    label: { fontSize: '16px', fontWeight: 600, letterSpacing: '0.15em' },
    stat: { color: p.action, fontFamily: "'Poppins', sans-serif", fontSize: '36px', fontWeight: 800 },
    mono: { fontFamily: "'JetBrains Mono', monospace" },
    section: { padding: '48px', maxWidth: '900px', margin: '0 auto' },
    card: { padding: '24px', marginBottom: '24px', backgroundColor: p.surface2, borderLeft: `3px solid ${p.accent}` },
    themeBlock: { padding: '24px', marginBottom: '24px', backgroundColor: p.surface2 },
    flexRow: { display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '4px' },
    grid4: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
    // Spacing utilities
    mb24: { marginBottom: '24px' },
    mb32: { marginBottom: '32px' },
    mb48: { marginBottom: '48px' },
    // Table styles (centralized)
    tableLabel: { fontSize: '16px', fontWeight: 700, letterSpacing: '0.12em', color: p.action, textTransform: 'uppercase' },
    tableTitle: { fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 800, color: p.strong, margin: 0 },
    tableTicker: { padding: '12px 14px', fontSize: '20px', color: p.strong, fontWeight: 900, fontFamily: "'Poppins', sans-serif" },
    tableCompany: { padding: '12px 14px', fontSize: '19px', color: p.strong, fontWeight: 400, fontFamily: "'Poppins', sans-serif" },
    tableNum: { padding: '12px 14px', fontSize: '19px', color: '#2D3748', textAlign: 'center', fontFamily: "'Poppins', sans-serif", fontVariantNumeric: 'tabular-nums', fontWeight: 500 },
    tableNumActive: { padding: '12px 14px', fontSize: '19px', color: '#2D3748', textAlign: 'center', fontFamily: "'Poppins', sans-serif", fontVariantNumeric: 'tabular-nums', fontWeight: 600 },
    tableDesc: { padding: '0 14px 14px 14px', fontSize: '18px', color: p.neutral, fontStyle: 'italic', lineHeight: 1.5, fontFamily: "'Poppins', sans-serif" },
    tableHeader: { padding: '12px 14px', fontSize: '17px', fontWeight: 600, letterSpacing: '0.03em', fontFamily: "'Poppins', sans-serif", userSelect: 'none' },
    // Callout styles
    calloutNote: { padding: '16px 20px', backgroundColor: `${p.accent}10`, borderLeft: `3px solid ${p.accent}`, marginTop: '32px' },
    calloutHook: { padding: '12px 16px', backgroundColor: `${p.accent}08`, borderLeft: `3px solid ${p.accent}`, marginTop: '-8px' },
    // Text utilities
    caption: { fontSize: '18px', color: p.neutral },
    captionSm: { fontSize: '17px', color: p.neutral },
    strong: { color: p.strong, fontWeight: 600 },
    // Section dividers
    dividerTop: { borderTop: `2px solid ${p.border}`, paddingTop: '32px', marginTop: '48px' },
  };

  // ==========================================================================
  // STOCK DATA
  // ==========================================================================
  const stockData = {
    semiEquipment: [
      { ticker: "ASML", name: "ASML Holding", mktCap: 258714, revGr: 12.5, m1: 22.4, m3: 45.2, m6: 89.3, ps: 9.2 },
      { ticker: "LRCX", name: "Lam Research", mktCap: 118045, revGr: 27.7, m1: 36.6, m3: 56.8, m6: 122.7, ps: 7.4 },
      { ticker: "KLAC", name: "KLA Corporation", mktCap: 95890, revGr: 18.3, m1: 28.1, m3: 52.4, m6: 108.2, ps: 8.6 },
      { ticker: "AMAT", name: "Applied Materials", mktCap: 156230, revGr: 8.4, m1: 19.7, m3: 41.3, m6: 85.6, ps: 5.8 },
      { ticker: "TER", name: "Teradyne", mktCap: 35729, revGr: 4.3, m1: 18.6, m3: 63.9, m6: 148.3, ps: 12.7 },
      { ticker: "ONTO", name: "Onto Innovation", mktCap: 10795, revGr: -13.5, m1: 42.8, m3: 62.4, m6: 124.5, ps: 10.8 },
    ],
    space: [
      { ticker: "PL", name: "Planet Labs", mktCap: 9027, revGr: 32.6, m1: 61.0, m3: 117.5, m6: 346.2, ps: 31.5 },
      { ticker: "SATS", name: "EchoStar", mktCap: 35487, revGr: -7.1, m1: 18.9, m3: 70.4, m6: 323.8, ps: 2.3 },
      { ticker: "ASTS", name: "AST SpaceMobile", mktCap: 42534, revGr: 1240, m1: 69.3, m3: 29.4, m6: 120.0, ps: 1704 },
      { ticker: "RKLB", name: "Rocket Lab", mktCap: 51439, revGr: 48.0, m1: 73.5, m3: 43.7, m6: 101.9, ps: 91.8 },
      { ticker: "LUNR", name: "Intuitive Machines", mktCap: 3889, revGr: -10.3, m1: 100.2, m3: 82.4, m6: 92.3, ps: 11.6 },
    ],
    defense: [
      { ticker: "AXON", name: "Axon Enterprise", mktCap: 51240, revGr: 32.4, m1: 24.6, m3: 28.9, m6: 45.2, ps: 23.1 },
      { ticker: "PLTR", name: "Palantir Technologies", mktCap: 178650, revGr: 27.1, m1: 18.3, m3: 22.4, m6: 38.7, ps: 62.4 },
      { ticker: "LHX", name: "L3Harris Technologies", mktCap: 54120, revGr: 8.9, m1: 12.4, m3: 18.6, m6: 31.2, ps: 2.5 },
      { ticker: "HII", name: "Huntington Ingalls", mktCap: 13890, revGr: 6.2, m1: 14.1, m3: 16.8, m6: 24.5, ps: 1.2 },
      { ticker: "KTOS", name: "Kratos Defense", mktCap: 6450, revGr: 15.8, m1: 21.3, m3: 24.7, m6: 32.8, ps: 5.4 },
      { ticker: "RCAT", name: "Red Cat Holdings", mktCap: 892, revGr: 245.0, m1: 38.2, m3: 42.1, m6: 68.4, ps: 28.7 },
    ],
    powerGen: [
      { ticker: "VRT", name: "Vertiv Holdings", mktCap: 48920, revGr: 26.4, m1: 15.2, m3: 22.8, m6: 38.4, ps: 5.8 },
      { ticker: "GEV", name: "GE Vernova", mktCap: 98450, revGr: 8.2, m1: 18.4, m3: 24.1, m6: 42.6, ps: 2.9 },
      { ticker: "POWL", name: "Powell Industries", mktCap: 3820, revGr: 48.7, m1: 12.8, m3: 19.4, m6: 35.2, ps: 3.2 },
      { ticker: "GWW", name: "W.W. Grainger", mktCap: 52140, revGr: 4.8, m1: 8.6, m3: 12.4, m6: 18.9, ps: 2.8 },
      { ticker: "EMR", name: "Emerson Electric", mktCap: 71890, revGr: 15.3, m1: 10.2, m3: 16.8, m6: 24.3, ps: 4.1 },
    ],
    packagingMemory: [
      { ticker: "TSEM", name: "Tower Semiconductor", mktCap: 14509, revGr: 6.8, m1: 13.0, m3: 73.5, m6: 184.5, ps: 9.8 },
      { ticker: "TER", name: "Teradyne", mktCap: 35729, revGr: 4.3, m1: 18.6, m3: 63.9, m6: 148.3, ps: 12.7 },
      { ticker: "AMKR", name: "Amkor Technology", mktCap: 11865, revGr: 6.7, m1: 19.2, m3: 52.6, m6: 126.9, ps: 1.8 },
      { ticker: "ONTO", name: "Onto Innovation", mktCap: 10795, revGr: -13.5, m1: 42.8, m3: 62.4, m6: 124.5, ps: 10.8 },
      { ticker: "FORM", name: "FormFactor", mktCap: 6070, revGr: -2.5, m1: 39.9, m3: 86.9, m6: 123.1, ps: 8.0 },
      { ticker: "LRCX", name: "Lam Research", mktCap: 280045, revGr: 27.7, m1: 36.6, m3: 56.8, m6: 122.7, ps: 14.4 },
      { ticker: "MKSI", name: "MKS Instruments", mktCap: 13702, revGr: 10.3, m1: 30.6, m3: 48.2, m6: 100.5, ps: 3.6 },
    ],
    storage: [
      { ticker: "SNDK", name: "Sandisk Corporation", mktCap: 60617, revGr: 22.6, m1: 97.6, m3: 186.7, m6: 900.0, ps: 7.9, note: "Spin-off" },
      { ticker: "WDC", name: "Western Digital", mktCap: 75734, revGr: 27.4, m1: 26.9, m3: 76.0, m6: 233.3, ps: 6.9 },
      { ticker: "STX", name: "Seagate Technology", mktCap: 69669, revGr: 21.3, m1: 13.5, m3: 44.7, m6: 122.7, ps: 7.7 },
      { ticker: "PSTG", name: "Pure Storage", mktCap: 24070, revGr: 16.0, m1: 4.6, m3: -20.7, m6: 32.9, ps: 7.2 },
    ],
    preciousMetals: [
      { ticker: "HL", name: "Hecla Mining", mktCap: 17784, revGr: 67.1, m1: 39.5, m3: 74.2, m6: 341.0, ps: 14.6 },
      { ticker: "CDE", name: "Coeur Mining", mktCap: 14501, revGr: 76.7, m1: 33.7, m3: -2.3, m6: 147.3, ps: 8.6 },
      { ticker: "AUGO", name: "Aura Minerals", mktCap: 5030, revGr: 58.7, m1: 29.4, m3: 51.9, m6: 151.7, ps: 6.5 },
      { ticker: "IDR", name: "Idaho Strategic", mktCap: 692, revGr: 80.1, m1: 0.2, m3: 0.7, m6: 128.0, ps: 18.6 },
      { ticker: "NEM", name: "Newmont Corporation", mktCap: 124535, revGr: 17.0, m1: 16.4, m3: 16.4, m6: 96.1, ps: 5.9 },
    ],
    contracting: [
      { ticker: "FIX", name: "Comfort Systems USA", mktCap: 39504, revGr: 35.2, m1: 15.6, m3: 33.6, m6: 105.1, ps: 4.8 },
      { ticker: "IBP", name: "Installed Building Products", mktCap: 8401, revGr: 2.3, m1: 16.9, m3: 21.5, m6: 62.4, ps: 2.8 },
      { ticker: "LGN", name: "Legence Corp", mktCap: 5224, revGr: 26.2, m1: 18.3, m3: 47.4, m6: null, ps: 2.5 },
      { ticker: "IESC", name: "IES Holdings", mktCap: 9168, revGr: 15.7, m1: 2.8, m3: 19.9, m6: 42.5, ps: 2.8 },
      { ticker: "BLD", name: "TopBuild Corp", mktCap: 13861, revGr: 1.4, m1: 15.2, m3: 13.6, m6: 37.8, ps: 2.7 },
      { ticker: "EME", name: "EMCOR Group", mktCap: 31278, revGr: 16.4, m1: 11.9, m3: 1.7, m6: 26.4, ps: 1.9 },
    ],
  };

  // ==========================================================================
  // SEMI EQUIPMENT THEMATIC BUCKETS (from JSON)
  // ==========================================================================
  const semiEquipmentBuckets = [
    {
      id: 1,
      name: "Advanced Packaging and Assembly",
      tagline: "These companies sit at the point where GPUs become usable systems. Capacity, yield, and execution matter more than volume.",
      insight: "Why this bucket matters: These firms benefit when complexity rises faster than capacity. They monetize learning curves, not wafer starts.",
      stocks: [
        { ticker: "AMKR", company: "Amkor Technology", mktCap: "$12B", return1M: "+19%", return3M: "+53%", return6M: "+127%", revGrYoY: "+7%", opMargin: "8.0%", pS: "1.8x", description: "Key OSAT for advanced logic and HBM-adjacent packaging" },
        { ticker: "MKSI", company: "MKS Instruments", mktCap: "$14B", return1M: "+31%", return3M: "+48%", return6M: "+100%", revGrYoY: "+10%", opMargin: "14.4%", pS: "3.6x", description: "Vacuum, gas delivery, materials for advanced packaging" },
        { ticker: "ENTG", company: "Entegris", mktCap: "$18B", return1M: "+33%", return3M: "+30%", return6M: "+34%", revGrYoY: "-0%", opMargin: "15.4%", pS: "5.5x", description: "Specialty materials and chemicals for advanced nodes" },
        { ticker: "UCTT", company: "Ultra Clean Holdings", mktCap: "$2B", return1M: "+74%", return3M: "+51%", return6M: "+73%", revGrYoY: "-6%", opMargin: "2.1%", pS: "0.9x", description: "Gas delivery and chemical management systems" }
      ]
    },
    {
      id: 2,
      name: "Test, Inspection, and Metrology",
      tagline: "When yields matter, testing and inspection become mandatory spend.",
      insight: "Economic role: These companies are paid to find problems before revenue breaks. Spend rises when stakes rise.",
      stocks: [
        { ticker: "TER", company: "Teradyne", mktCap: "$36B", return1M: "+19%", return3M: "+64%", return6M: "+148%", revGrYoY: "+4%", opMargin: "19.7%", pS: "12.7x", description: "Dominant in advanced logic and packaging test" },
        { ticker: "KLAC", company: "KLA Corporation", mktCap: "$206B", return1M: "+28%", return3M: "+43%", return6M: "+68%", revGrYoY: "+13%", opMargin: "41.3%", pS: "16.6x", description: "Broad process control, including advanced packaging" },
        { ticker: "ONTO", company: "Onto Innovation", mktCap: "$11B", return1M: "+43%", return3M: "+62%", return6M: "+125%", revGrYoY: "-13%", opMargin: "16.1%", pS: "10.8x", description: "Critical inspection/metrology for packaging layers" },
        { ticker: "CAMT", company: "Camtek", mktCap: "$7B", return1M: "+31%", return3M: "+19%", return6M: "+60%", revGrYoY: "+12%", opMargin: "25.3%", pS: "13.8x", description: "Fast-growing inspection with packaging exposure" },
        { ticker: "NVMI", company: "Nova Ltd.", mktCap: "$14B", return1M: "+40%", return3M: "+35%", return6M: "+62%", revGrYoY: "+25%", opMargin: "28.4%", pS: "17.0x", description: "Optical metrology for advanced nodes and 3D packaging" },
        { ticker: "PLAB", company: "Photronics", mktCap: "$2B", return1M: "+0%", return3M: "+48%", return6M: "+80%", revGrYoY: "-3%", opMargin: "24.3%", pS: "2.4x", description: "Photomasks for advanced semiconductor manufacturing" },
        { ticker: "FORM", company: "FormFactor", mktCap: "$6B", return1M: "+40%", return3M: "+87%", return6M: "+123%", revGrYoY: "-3%", opMargin: "9.4%", pS: "8.0x", description: "Probe cards and test sockets for advanced packaging" }
      ]
    },
    {
      id: 3,
      name: "Core Lithography and Deposition",
      tagline: "The irreplaceable equipment that defines what's possible at each node.",
      insight: "Why this matters: When a single vendor controls the tools required for every advanced node, pricing power is structural.",
      stocks: [
        { ticker: "ASML", company: "ASML Holding", mktCap: "$525B", return1M: "+26%", return3M: "+33%", return6M: "+80%", revGrYoY: "+7%", opMargin: "32.8%", pS: "14.8x", description: "Monopoly on EUV lithography; every chip passes through" },
        { ticker: "LRCX", company: "Lam Research", mktCap: "$280B", return1M: "+37%", return3M: "+57%", return6M: "+123%", revGrYoY: "+28%", opMargin: "34.4%", pS: "14.4x", description: "Etch and deposition leader; critical for 3D structures" },
        { ticker: "AMAT", company: "Applied Materials", mktCap: "$259B", return1M: "+26%", return3M: "+44%", return6M: "+68%", revGrYoY: "-3%", opMargin: "27.8%", pS: "9.3x", description: "Broadest equipment portfolio; deposition, etch, inspection" },
        { ticker: "ACMR", company: "ACM Research", mktCap: "$3B", return1M: "+44%", return3M: "+35%", return6M: "+81%", revGrYoY: "+32%", opMargin: "10.7%", pS: "4.2x", description: "Wet processing and cleaning for advanced nodes" },
        { ticker: "AEIS", company: "Advanced Energy Industries", mktCap: "$10B", return1M: "+18%", return3M: "+32%", return6M: "+82%", revGrYoY: "+24%", opMargin: "12.4%", pS: "5.7x", description: "Power delivery and process control for fabs" }
      ]
    },
    {
      id: 4,
      name: "Optical Transceivers and Photonics",
      tagline: "Small share of system cost. Absolute gatekeeper of system revenue.",
      insight: "Why this bucket is mispriced: Optics are treated as cyclical components, yet they increasingly behave like revenue-enabling infrastructure.",
      stocks: [
        { ticker: "LITE", company: "Lumentum", mktCap: "$23B", return1M: "+3%", return3M: "+99%", return6M: "+225%", revGrYoY: "+58%", opMargin: "2.8%", pS: "13.8x", description: "Lasers and optical components for AI interconnects" },
        { ticker: "COHR", company: "Coherent", mktCap: "$30B", return1M: "+9%", return3M: "+65%", return6M: "+95%", revGrYoY: "+17%", opMargin: "12.3%", pS: "6.0x", description: "Broad photonics portfolio including datacenter optics" },
        { ticker: "AVGO", company: "Broadcom", mktCap: "$1.7T", return1M: "+3%", return3M: "-1%", return6M: "+26%", revGrYoY: "+28%", opMargin: "42.5%", pS: "26.7x", description: "Dominant in networking silicon and optical interfaces" }
      ]
    },
    {
      id: 5,
      name: "High-Speed Chip-to-Chip Interconnect",
      tagline: "Where AI systems move from racks to fabrics.",
      insight: "Why this bucket scores highest: Explosive revenue growth (100-270% YoY) as AI clusters scale. These are the new bottleneck.",
      stocks: [
        { ticker: "ALAB", company: "Astera Labs", mktCap: "$31B", return1M: "+26%", return3M: "+11%", return6M: "+98%", revGrYoY: "+104%", opMargin: "24.0%", pS: "45.5x", description: "PCIe and CXL connectivity; levered to system-level scaling" },
        { ticker: "CRDO", company: "Credo Technology", mktCap: "$27B", return1M: "+8%", return3M: "+11%", return6M: "+49%", revGrYoY: "+272%", opMargin: "29.4%", pS: "35.6x", description: "High-speed interconnect; levered to bandwidth density growth" },
        { ticker: "MRVL", company: "Marvell Technology", mktCap: "$68B", return1M: "-4%", return3M: "-9%", return6M: "+14%", revGrYoY: "+37%", opMargin: "17.7%", pS: "8.9x", description: "Optical DSPs, interconnect, and custom silicon" }
      ]
    },
    {
      id: 6,
      name: "Fiber, Cabling, and Physical Connectivity",
      tagline: "Often ignored, yet increasingly non-optional at scale.",
      insight: "Why this matters: Physical layer scales with every rack deployed. Steady demand, improving margins, often overlooked.",
      stocks: [
        { ticker: "APH", company: "Amphenol", mktCap: "$189B", return1M: "+20%", return3M: "+21%", return6M: "+54%", revGrYoY: "+53%", opMargin: "27.5%", pS: "9.4x", description: "High-reliability connectors for AI/datacenter systems" },
        { ticker: "GLW", company: "Corning", mktCap: "$81B", return1M: "+9%", return3M: "+9%", return6M: "+79%", revGrYoY: "+21%", opMargin: "15.5%", pS: "5.5x", description: "Backbone fiber infrastructure in AI datacenters" }
      ]
    }
  ];

  const convictionTiers = {
    tier1: { label: "Highest Conviction (Quality Score >50)", tickers: ["ALAB", "CRDO", "LRCX", "KLAC", "NVMI", "LITE", "APH"] },
    tier2: { label: "Strong Candidates (Score 40-50)", tickers: ["COHR", "PLAB", "TER", "AMAT", "ONTO", "AVGO", "FORM", "ASML"] },
    tier3: { label: "Worth Watching (Score 35-40)", tickers: ["ACMR", "GLW", "MKSI", "CAMT", "AMKR"] }
  };

  // ==========================================================================
  // SPACE & DEFENSE THEMATIC BUCKETS
  // ==========================================================================
  const spaceDefenseBuckets = [
    {
      id: 5,
      name: "Launch, Satellite Manufacturing, and Space Infrastructure",
      tagline: "Vertical integration from launch to on-orbit systems. The 95% cost reduction in launch has unlocked new business models.",
      insight: "Why this bucket is volatile: Pre-profitability business models with binary outcomes. Position sizing matters more than entry price.",
      stocks: [
        { ticker: "RKLB", company: "Rocket Lab", mktCap: "$51B", return1M: "+74%", return3M: "+44%", return6M: "+102%", revGrYoY: "+48%", opMargin: "-38.0%", pS: "91.8x", description: "Launch plus vertical integration into space systems" },
        { ticker: "RDW", company: "Redwire", mktCap: "$2B", return1M: "+78%", return3M: "+37%", return6M: "-33%", revGrYoY: "+51%", opMargin: "-37.9%", pS: "5.8x", description: "Space infrastructure and components" },
        { ticker: "LUNR", company: "Intuitive Machines", mktCap: "$4B", return1M: "+100%", return3M: "+82%", return6M: "+92%", revGrYoY: "-10%", opMargin: "-29.4%", pS: "11.6x", description: "Lunar services exposure" }
      ]
    },
    {
      id: 6,
      name: "Satellite Communications and Ground Segment",
      tagline: "Constellation services, terminals, and the direct-to-device narrative.",
      insight: "Why this bucket is speculative: Direct-to-device is a real TAM expansion, but execution risk is extreme. ASTS trades at 1700x sales.",
      stocks: [
        { ticker: "VSAT", company: "Viasat", mktCap: "$6B", return1M: "+34%", return3M: "+27%", return6M: "+199%", revGrYoY: "+2%", opMargin: "3.1%", pS: "1.4x", description: "Defense and commercial satcom; terminals" },
        { ticker: "IRDM", company: "Iridium Communications", mktCap: "$2B", return1M: "+13%", return3M: "+3%", return6M: "-38%", revGrYoY: "+7%", opMargin: "30.9%", pS: "2.3x", description: "Constellation services; gov exposure" },
        { ticker: "GSAT", company: "Globalstar", mktCap: "$8B", return1M: "-6%", return3M: "+36%", return6M: "+119%", revGrYoY: "+2%", opMargin: "13.9%", pS: "29.1x", description: "Direct-to-device narrative" },
        { ticker: "ASTS", company: "AST SpaceMobile", mktCap: "$43B", return1M: "+69%", return3M: "+29%", return6M: "+120%", revGrYoY: "+1240%", opMargin: "-541%", pS: "1705x", description: "Direct-to-device optionality; high risk" }
      ]
    },
    {
      id: 7,
      name: "Geospatial Data and Analytics",
      tagline: "Earth observation as a subscription service. Defense demand provides revenue visibility.",
      insight: "Economic role: EO data is becoming utility-like. Recurring subscription models replace one-off imagery purchases.",
      stocks: [
        { ticker: "PL", company: "Planet Labs", mktCap: "$9B", return1M: "+61%", return3M: "+118%", return6M: "+346%", revGrYoY: "+33%", opMargin: "-20.9%", pS: "31.5x", description: "EO data; subscription potential" },
        { ticker: "BKSY", company: "BlackSky Technology", mktCap: "$1B", return1M: "+53%", return3M: "+6%", return6M: "+6%", revGrYoY: "-13%", opMargin: "-85.8%", pS: "9.5x", description: "Real-time geospatial intelligence" }
      ]
    },
    {
      id: 1,
      name: "Propulsion, Energetics, and Munitions Throughput",
      tagline: "Solid rocket motors, propellants, and munitions are capacity-constrained with multi-year backlogs.",
      insight: "Why this bucket matters: Propulsion and energetics are the hardest bottlenecks to resolve. Capacity expansion takes years, not quarters.",
      stocks: [
        { ticker: "LHX", company: "L3Harris Technologies", mktCap: "$65B", return1M: "+23%", return3M: "+22%", return6M: "+32%", revGrYoY: "+7%", opMargin: "11.2%", pS: "3.0x", description: "Rocket motors via Aerojet Rocketdyne acquisition; core node in DoD propulsion" },
        { ticker: "NOC", company: "Northrop Grumman", mktCap: "$95B", return1M: "+17%", return3M: "+12%", return6M: "+29%", revGrYoY: "+4%", opMargin: "11.9%", pS: "2.3x", description: "Major SRM supplier; deep missile exposure" }
      ]
    },
    {
      id: 2,
      name: "High-Temperature Materials, Castings, and Engineered Structures",
      tagline: "Specialty alloys, composites, and precision components with long qualification cycles and limited supplier bases.",
      insight: "Why this bucket matters: Qualification cycles create switching costs. Once designed in, these suppliers capture decades of aftermarket revenue.",
      stocks: [
        { ticker: "HWM", company: "Howmet Aerospace", mktCap: "$90B", return1M: "+15%", return3M: "+17%", return6M: "+22%", revGrYoY: "+14%", opMargin: "25.9%", pS: "11.4x", description: "Engineered components; high-consequence parts" },
        { ticker: "ATI", company: "ATI Inc.", mktCap: "$17B", return1M: "+14%", return3M: "+53%", return6M: "+39%", revGrYoY: "+7%", opMargin: "14.3%", pS: "3.8x", description: "Specialty materials for aerospace and defense" },
        { ticker: "HXL", company: "Hexcel", mktCap: "$7B", return1M: "+14%", return3M: "+35%", return6M: "+41%", revGrYoY: "-2%", opMargin: "7.7%", pS: "3.6x", description: "Advanced composites" },
        { ticker: "TDG", company: "TransDigm", mktCap: "$82B", return1M: "+14%", return3M: "+16%", return6M: "-2%", revGrYoY: "+12%", opMargin: "47.9%", pS: "9.6x", description: "Aftermarket and proprietary parts; classic pricing power" }
      ]
    },
    {
      id: 3,
      name: "Guidance, Sensing, and Mission Electronics",
      tagline: "Rad-hard components, sensors, and mission-critical electronics where reliability is non-negotiable.",
      insight: "Economic role: Mission electronics are where margins concentrate. Rad-hard and space-qualified parts command 10-100x premiums over commercial equivalents.",
      stocks: [
        { ticker: "TDY", company: "Teledyne Technologies", mktCap: "$27B", return1M: "+15%", return3M: "+4%", return6M: "+8%", revGrYoY: "+7%", opMargin: "18.3%", pS: "4.6x", description: "Sensors, imaging, instrumentation" },
        { ticker: "CW", company: "Curtiss-Wright", mktCap: "$25B", return1M: "+22%", return3M: "+21%", return6M: "+38%", revGrYoY: "+9%", opMargin: "19.2%", pS: "7.4x", description: "Defense electronics and high-reliability components" },
        { ticker: "MRCY", company: "Mercury Systems", mktCap: "$6B", return1M: "+44%", return3M: "+34%", return6M: "+99%", revGrYoY: "+10%", opMargin: "0.3%", pS: "6.5x", description: "Mission computing; defense electronics" },
        { ticker: "HON", company: "Honeywell", mktCap: "$139B", return1M: "+11%", return3M: "+15%", return6M: "-1%", revGrYoY: "+7%", opMargin: "20.9%", pS: "3.4x", description: "Rad-hard microelectronics and aerospace systems" },
        { ticker: "MCHP", company: "Microchip Technology", mktCap: "$40B", return1M: "+13%", return3M: "+15%", return6M: "+2%", revGrYoY: "-2%", opMargin: "8.3%", pS: "9.7x", description: "Space and defense-grade microcontrollers" }
      ]
    },
    {
      id: 4,
      name: "Test, Integration, Sustainment, and Cleared Capacity",
      tagline: "Clearance-heavy services where the constraint is qualified personnel, not capital.",
      insight: "Why this bucket matters: Cleared personnel are the bottleneck. Training and clearance timelines are measured in years, creating durable capacity constraints.",
      stocks: [
        { ticker: "AMTM", company: "Amentum Holdings", mktCap: "$9B", return1M: "+20%", return3M: "+54%", return6M: "+43%", revGrYoY: "+77%", opMargin: "3.6%", pS: "0.6x", description: "R&D, test, mission support; clearance-heavy services" },
        { ticker: "LDOS", company: "Leidos Holdings", mktCap: "$25B", return1M: "+7%", return3M: "+6%", return6M: "+21%", revGrYoY: "+7%", opMargin: "12.0%", pS: "1.5x", description: "Mission IT, intel, program execution" },
        { ticker: "SAIC", company: "Science Applications Intl", mktCap: "$5B", return1M: "+11%", return3M: "+15%", return6M: "+0%", revGrYoY: "-6%", opMargin: "6.8%", pS: "0.7x", description: "Mission IT and sustainment" },
        { ticker: "CACI", company: "CACI International", mktCap: "$14B", return1M: "+13%", return3M: "+23%", return6M: "+34%", revGrYoY: "+11%", opMargin: "9.3%", pS: "1.6x", description: "Intel, sustainment, program execution" },
        { ticker: "KBR", company: "KBR Inc.", mktCap: "$6B", return1M: "+5%", return3M: "+3%", return6M: "-4%", revGrYoY: "-0%", opMargin: "6.3%", pS: "0.7x", description: "Mission support and sustainment" }
      ]
    }
  ];

  // ==========================================================================
  // HIGH CONVICTION THEMES CONFIG (Optimization #2)
  // ==========================================================================
  const highConvictionThemes = [
    {
      title: "Semiconductor Equipment",
      color: p.accent,
      stats: { m6: 97.1, m3: 48.8, margin: 2.1 },
      dataKey: "semiEquipment",
      showPS: true,
      paragraphs: [
        { h: "The Bottleneck Has Shifted", t: "GPU supply is ramping quickly, but the slower-moving components that complete the system increasingly determine whether that capacity monetizes. GPUs are typically installed, powered, and expensed on schedule, yet they cannot be used productively without the connections that allow them to operate as a coordinated system." },
        { h: "Packaging Is the New Gating Factor", t: "Advanced packaging has become one of the main factors limiting how quickly AI hardware can be turned into usable capacity. This is visible in the numbers. TSMC's advanced packaging revenue expanded from roughly $120 million in 2018 to nearly $10 billion in 2025, an increase of more than 80×. That trajectory reflects persistent scarcity, not temporary imbalance or commoditization. As GPU supply accelerates, the bottleneck is shifting toward the most complex forms of packaging, where capacity, yield, and reliability vary meaningfully and scale only with time and experience. These processes rely on specialized materials, precision manufacturing, and long learning curves that do not compress on demand. As a result, the constraint remains binding even as wafer supply improves. Companies that provide the testing, inspection, and assembly infrastructure for advanced packaging benefit directly from this dynamic, as customers are forced to invest through the bottleneck rather than around it. Recent improvements in deployment timelines have come from sustained equipment investment, not easing demand, reinforcing the durability of advanced packaging as a source of pricing power and strategic leverage." },
        { h: "Revenue Depends on Connectivity", t: "Modern AI economics depend on many GPUs working together, not isolated chips running alone. When connectivity is constrained, billions of dollars of hardware earn far below their potential, utilization drops, and returns on invested capital temporarily collapse, even as demand remains strong. This dynamic creates classic bottleneck economics: optical transceivers represent roughly 10% of total AI cluster cost, yet they can block 100% of cluster revenue if unavailable or unreliable. Delays in interconnect packaging or fiber attachment similarly render revenue effectively zero until the system functions end-to-end. From a market-pricing perspective, this creates persistent mispricing risk, as investors often value these suppliers as cyclical hardware vendors while customers increasingly treat them as revenue-enabling infrastructure with growing pricing power." },
        { h: "HBM Quality Tiering Creates a Second Bottleneck", t: "Memory has emerged as a parallel constraint that equipment makers must address. The shortage is not simply about how many HBM chips exist — it's about how many high-performance chips exist. Industry analysis flags a growing split between \"HBM bits available\" and \"HBM quality available,\" with Samsung's HBM3E described as \"sub-par\" versus Micron's 9.6 Gbps parts. HBM represents a large component of every training chip's bill of materials, and hyperscalers are responding by sourcing memory directly from suppliers to compress the dollars-per-HBM and dollars-per-FLOP that stacked vendor margins would otherwise impose. The scale of demand is staggering: one estimate suggests that OpenAI's announced power partnerships alone — requiring 30.5 GW of new capacity — would consume more than 100% of current global HBM supply if fully deployed. This creates a two-tier opportunity: memory manufacturers with top-quality output (SK hynix, Micron) capture premium pricing, while equipment companies serving memory fabs (Lam Research for etch, KLA for inspection, Teradyne for test) benefit regardless of which supplier wins share.", note: "Data in process; important stocks overseas in South Korea and not in FactSet pull." },
        { h: "Margin Expansion Confirms Pricing Power", t: "TSMC's gross margin trajectory tells the pricing power story: expansion from 45.5% in 2010 to above 59% in 2025 demonstrates that scarcity rents are real and durable. The same dynamic extends to equipment suppliers. When a single vendor — ASML — controls the lithography tools required for every advanced node, and when yield learning at new processes (N3P, N2) forces customers to wait or redesign, the result is sustained pricing power for the entire equipment ecosystem. Geographic concentration amplifies this: Arizona's combined N5/N3 footprint remains below 15% of TSMC's total capacity, leaving most frontier logic effectively gated by Taiwan. For equipment companies, this concentration is bullish — capacity expansion anywhere requires their tools, and the demand queue extends years into the future." },
      ],
    },
    {
      title: "Space & Satellites",
      color: p.strong,
      stats: { m6: 101.9, m3: 55.0, margin: 6.3 },
      dataKey: "space",
      showPS: false,
      note: "Note: Extreme P/S ratios reflect pre-revenue/early-revenue businesses. Moonshot sizing appropriate.",
      paragraphs: [
        { h: "The 95% Cost Collapse", t: "The defining number in the modern space economy is 95%. That is how much the cost of launching payloads into orbit has fallen over the past decade, collapsing from roughly $65,000 per kilogram to under $2,000 on reusable rockets. When access costs fall that dramatically, the effect is not incremental. It changes what is economically possible. Satellite launches move from rare events to routine operations, new constellations become viable, and demand accelerates across communications, Earth observation, and military surveillance. This cost collapse explains why 2025 saw more than 300 successful orbital launches worldwide, a cadence that would have been unthinkable a decade ago." },
        { h: "Dual Revenue Engines", t: "Lower launch costs have created two parallel revenue engines. On the communications side, satellite connectivity is shifting from emergency backup to primary infrastructure for military, government, and enterprise users. Starlink alone is projected to generate $11.8 billion in revenue in 2025, anchoring the commercial side of the space economy. Direct-to-device technology extends this further, enabling satellites to connect directly to unmodified smartphones, expanding the addressable market to billions of users. On the observation side, satellites have become persistent sensors. Companies like Planet Labs now image the entire Earth daily, and customer demand has shifted from one-off imagery purchases to recurring subscriptions used by insurers, logistics firms, and governments. Space is no longer episodic. It is becoming utility-like." },
        { h: "Throughput Is the Binding Constraint", t: "Despite exploding demand, systems are still arriving late. The reason is not funding. It is throughput. Space and defense systems depend on inputs that cannot be rushed: specialized materials, tightly controlled manufacturing processes, skilled labor, certification, and regulatory approvals. Missiles cannot be produced faster if their motors require fixed curing times. Satellites cannot be launched if their electronics fail in radiation. Aircraft cannot be delivered if production lines are certified for only a set number of units per year. These are physical and procedural limits that scale slowly, regardless of budget size." },
        { h: "Edge vs. Core: Where Scarcity Dominates", t: "This creates a stark divide inside the industry. At the edge, launch costs have fallen and enabled growth. At the core, scarcity dominates. Missile components face lead times measured in quarters. Satellite production routinely takes 24 to 36 months. Ground infrastructure that receives and processes satellite data already operates near 80% utilization, creating real bottlenecks in information delivery. In these areas, customers do not optimize for price. They optimize for certainty. A late delivery does not reduce revenue slightly. It eliminates it entirely." },
        { h: "Defense as Revenue Anchor", t: "Defense demand adds a stabilizing anchor to this system. Governments are not just customers. They are long-term sponsors. The U.S. Space Development Agency is building a constellation of at least 1,000 satellites by 2026 as a national security requirement, not an aspirational target. Recent awards totaling $3.5 billion for missile-tracking satellites illustrate how defense spending prioritizes redundancy, resilience, and speed over cost minimization. Although military payloads represent only a small fraction of total satellites launched, they are projected to capture nearly half of total satellite market value over the next decade due to higher specifications and premium pricing." },
        { h: "Where Value Accrues", t: "For investors, the value does not primarily accrue to the most visible platforms. It accrues to the quieter companies that control what cannot scale quickly: propulsion capacity, survivable electronics, advanced materials, certified factories, and testing infrastructure. These businesses benefit as systems grow more complex and as failure becomes less tolerable. Many are still valued like cyclical manufacturers or speculative space ventures, even though customers increasingly treat them as mission-critical infrastructure. The pattern mirrors advanced semiconductor packaging. When demand accelerates faster than capacity can expand, value migrates to the bottlenecks. In aerospace, defense, and space, those bottlenecks now define who can deliver, who cannot, and who quietly gains pricing power as a result." },
      ],
    },
    {
      title: "Defense & Aerospace",
      color: p.strong,
      stats: { m6: 27.8, m3: 19.4, margin: 1.2 },
      dataKey: "defense",
      showPS: true,
      paragraphs: [
        { h: "The End of the Peace Dividend", t: "Europe's defense awakening is accelerating into 2025 and 2026. EU member states' defense expenditure is expected to reach €381 billion in 2025, an 11% increase from €343 billion in 2024 — and a staggering 99% real increase over the past decade. In 2025, all NATO allies are expected to meet or exceed the 2% of GDP defense spending threshold, compared to only three allies in 2014. But 2% is now considered insufficient: the June 2025 NATO summit agreed to raise the target to 5% of GDP by 2035, with at least 3.5% allocated to core defense requirements. Poland has become NATO's top defense spender by GDP share at 4.12%, with plans to reach 4.7% in 2025. Lithuania is committing 5–6% of GDP to defense between 2026 and 2030. Germany approved a historic €500 billion fund for defense and infrastructure in March 2025, exempting defense spending above 1% of GDP from constitutional debt limits. This isn't cyclical budget fluctuation — it's structural rearmament that will persist for years." },
        { h: "The Reshoring Imperative", t: "The defense industry learned a painful lesson about supply chain fragility: if you source critical components from countries that might restrict exports tomorrow, your entire industrial base stops. This is driving the most significant manufacturing shift in a generation. Today, 82% of U.S. manufacturers have either moved production back to the U.S. or are in the process of doing so — a 55% increase since the start of 2023. The reshoring isn't cheap: raw material prices in the U.S. increased 5.4% in 2025 and are projected to rise another 4.4% in 2026. Yet 69% of manufacturers are proceeding anyway because the risk of supply disruption outweighs the cost premium. For defense contractors, this creates pricing power — customers will pay more for guaranteed delivery from secure supply chains. The aerospace and defense industry now faces a $747 billion backlog, up 25% in two years, with commercial aircraft orders alone representing roughly ten years of production at current rates." },
        { h: "Space as the New High Ground", t: "Modern defense increasingly depends on orbital infrastructure. The same technology that delivers high-speed internet to remote villages tracks hypersonic missiles flying at Mach 5. The Space Development Agency's \"proliferated architecture\" strategy abandons the old model of a few billion-dollar satellites that adversaries could easily target. Instead, the SDA is deploying hundreds of smaller, cheaper satellites — if an enemy destroys ten, the other 990 maintain network integrity. The December 2025 Tranche 3 awards demonstrate how space companies are becoming major defense contractors: Rocket Lab's $805 million contract and Lockheed Martin's $1.1 billion share show that \"small\" space companies now compete directly with legacy primes for national security work. Tranche 1 satellites are scheduled for early 2026 deployment, with monthly launches expected thereafter, providing multi-year revenue visibility for every company in the supply chain." },
        { h: "Where Profits Accrue — Vertical Integration and Sovereign Premiums", t: "In this industrial shift, profits concentrate in specific places. Vertically integrated players capture the largest share: SpaceX builds the rocket, builds the satellite, and sells the service, avoiding markup at every layer. Their internal Starlink launch cost is estimated at $1,000 per kilogram versus $2,720 charged to external customers. This integration supports a $350 billion valuation and projected $15+ billion in 2025 revenue. The \"sovereign anchor\" provides the second profit pool — governments pay premiums for national independence. Arianespace charges roughly three times SpaceX's per-kilogram rate, yet receives steady European business because sovereignty matters more than cost optimization. The EU's ReArm Europe plan, presented in March 2025, further reinforces this dynamic by prioritizing European-made defense equipment. High-margin components represent the third opportunity: as thousands of satellites launch annually, companies supplying subsystems generate recurring revenue regardless of which constellation wins. Rocket Lab's evolution from launch-only to space infrastructure exemplifies this strategy, with component sales expanding margins even between missions." },
      ],
    },
    {
      title: "Power Generation Equipment",
      color: p.gold,
      stats: { m6: 29.1, m3: 18.2, margin: 11.6 },
      dataKey: "powerGen",
      showPS: true,
      paragraphs: [
        { h: "Power Is a Revenue Gate, Not an Operating Cost", t: "Every 1 GW of delayed capacity costs ~$10–12B per year in foregone AI revenue. Even 200 MW brought online six months earlier is worth $1–1.2B. In that context, higher-cost behind-the-meter power is not expensive. Waiting is." },
        { h: null, t: "Data center power demand is creating a structural shortage in generation and distribution equipment. Lead times for transformers and switchgear have extended to 2+ years. Companies with existing capacity and backlog are seeing strong pricing power and margin expansion." },
      ],
    },
  ];

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================
  const fmt = (v, showPlus = true) => {
    if (v === null || v === undefined) return '—';
    const sign = v >= 0 && showPlus ? '+' : '';
    return `${sign}${v.toFixed(1)}%`;
  };

  const fmtCap = (v) => {
    if (v >= 100000) return `$${(v/1000).toFixed(0)}B`;
    if (v >= 1000) return `$${(v/1000).toFixed(1)}B`;
    return `$${v.toFixed(0)}M`;
  };

  // ==========================================================================
  // MICRO-COMPONENTS
  // ==========================================================================
  const Pct = ({ v }) => <span style={{ color: v >= 0 ? p.positive : p.negative, fontWeight: 500, ...s.mono, fontSize: '13px' }}>{fmt(v)}</span>;

  const SectionHeader = ({ num, title, subtitle }) => (
    <div style={s.mb48}>
      <div style={s.flexRow}>
        <span style={s.sectionNum}>{num}</span>
        <h2 style={s.sectionTitle}>{title}</h2>
      </div>
      {subtitle && <p style={{ color: p.neutral, fontSize: '20px', marginLeft: '88px', marginTop: 0 }}>{subtitle}</p>}
    </div>
  );

  const InsightCard = ({ title, children }) => (
    <div style={s.card}>
      <div style={{ ...s.label, color: p.accent, marginBottom: '8px' }}>KEY INSIGHT</div>
      <h3 style={{ ...s.themeTitle, marginBottom: '8px' }}>{title}</h3>
      <div style={s.body}>{children}</div>
    </div>
  );

  const StatBox = ({ value, label }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={s.stat}>{value}</div>
      <div style={{ color: p.neutral, fontSize: '12px' }}>{label}</div>
    </div>
  );

  // Standard columns for legacy data format (used in Defense, Power, Physical Buildout sections)
  const stdCols = (showPS = true) => [
    { key: 'ticker', label: 'Ticker', align: 'left', sortable: true },
    { key: 'name', label: 'Company', align: 'left', sortable: true },
    { key: 'mktCap', label: 'Mkt Cap', align: 'center', sortable: true, render: fmtCap },
    { key: 'm1', label: '1M', align: 'center', sortable: true, render: (v) => <Pct v={v} /> },
    { key: 'revGr', label: 'Rev Gr', align: 'center', sortable: true, render: (v) => v > 100 ? '>100%' : <Pct v={v} /> },
    { key: 'm3', label: '3M', align: 'center', sortable: true, render: (v) => <Pct v={v} /> },
    { key: 'm6', label: '6M', align: 'center', sortable: true, render: (v) => v !== null ? <Pct v={v} /> : '—' },
    ...(showPS ? [{ key: 'ps', label: 'P/S', align: 'center', sortable: true, render: (v) => `${v.toFixed(1)}x` }] : []),
  ];

  // ==========================================================================
  // REUSABLE TABLE COMPONENTS
  // ==========================================================================
  
  // Reusable header for all table sections (buckets, themes, metals categories)
  const TableHeader = ({ label, id, title, tagline, insight }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={s.tableLabel}>{label} {id}</span>
        <h4 style={s.tableTitle}>{title}</h4>
      </div>
      {tagline && <p style={{ ...s.caption, fontStyle: 'italic', marginBottom: '4px' }}>{tagline}</p>}
      {insight && <p style={{ ...s.captionSm, color: p.accent }}>{insight}</p>}
    </div>
  );

  // Reusable callout for data source notes
  const DataNote = ({ children }) => (
    <div style={s.calloutNote}>
      <p style={{ ...s.captionSm, margin: 0 }}>{children}</p>
    </div>
  );

  // Reusable callout for mispricing hooks
  const HookCallout = ({ hook }) => (
    <div style={s.calloutHook}>
      <p style={{ ...s.caption, margin: 0 }}><strong style={s.strong}>Mispricing hook:</strong> {hook}</p>
    </div>
  );

  // Reusable sortable stock table - ONE component for ALL tables
  const SortableStockTable = ({ 
    data, // accepts either 'data' or 'stocks' for backwards compatibility
    stocks,
    columns: customColumns,
    showDescriptions = true, 
    defaultSort = { key: 'return1M', direction: 'desc' } 
  }) => {
    const [hovered, setHovered] = useState(null);
    const [sortConfig, setSortConfig] = useState(defaultSort);
    
    // Use data or stocks (backwards compatibility)
    const tableData = data || stocks || [];
    
    // Default columns for bucket/theme data format
    const defaultColumns = [
      { key: 'ticker', label: 'Ticker', align: 'left', sortable: true },
      { key: 'company', label: 'Company', align: 'left', sortable: true },
      { key: 'mktCap', label: 'Mkt Cap', align: 'center', sortable: true },
      { key: 'return1M', label: '1M', align: 'center', sortable: true },
      { key: 'return3M', label: '3M', align: 'center', sortable: true },
      { key: 'return6M', label: '6M', align: 'center', sortable: true },
      { key: 'revGrYoY', label: 'Rev Gr (YoY)', align: 'center', sortable: true },
      { key: 'opMargin', label: 'OpM', align: 'center', sortable: true },
      { key: 'pS', label: 'P/S', align: 'center', sortable: true },
    ];
    
    const columns = customColumns || defaultColumns;
    
    const parseValue = (val) => {
      if (val === null || val === undefined || val === '-' || val === '—') return -Infinity;
      if (typeof val === 'number') return val;
      const str = String(val);
      if (str.includes('$')) {
        const num = parseFloat(str.replace(/[$,BMK]/g, ''));
        if (str.includes('T')) return num * 1000000;
        if (str.includes('B')) return num * 1000;
        if (str.includes('M')) return num;
        return num;
      }
      return parseFloat(str.replace(/[+%x*]/g, '')) || 0;
    };
    
    const handleSort = (key) => {
      setSortConfig(prev => ({
        key,
        direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
      }));
    };
    
    const sortedData = [...tableData].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aVal = parseValue(a[sortConfig.key]);
      const bVal = parseValue(b[sortConfig.key]);
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    const SortIndicator = ({ isActive, direction }) => (
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: isActive ? '18px' : '14px', minWidth: isActive ? '18px' : '14px',
        height: isActive ? '18px' : '14px', minHeight: isActive ? '18px' : '14px',
        borderRadius: '50%', backgroundColor: isActive ? p.action : 'transparent',
        transition: 'all 0.15s', flexShrink: 0,
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ 
          opacity: isActive ? 1 : 0.4, transition: 'all 0.15s',
          transform: isActive && direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <path d="M2 3.5 L5 6.5 L8 3.5" stroke={isActive ? p.strong : p.surface1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    );
    
    // Get cell style based on column
    const getCellStyle = (col, isActiveSort) => {
      if (col.key === 'ticker') return s.tableTicker;
      if (col.key === 'company' || col.key === 'name') return s.tableCompany;
      return isActiveSort ? s.tableNumActive : s.tableNum;
    };
    
    // Get cell value - handle render functions or raw values
    const getCellValue = (row, col) => {
      if (col.render) return col.render(row[col.key], row);
      return row[col.key];
    };
    
    return (
      <div style={{ border: `1px solid ${p.border}`, marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: p.strong, color: p.surface1 }}>
              {columns.map(c => {
                const isActive = sortConfig.key === c.key;
                const sortable = c.sortable !== false; // default to sortable
                const justify = c.align === 'center' ? 'center' : (c.align === 'right' ? 'flex-end' : 'flex-start');
                return (
                  <th key={c.key} onClick={() => sortable && handleSort(c.key)}
                    style={{ ...s.tableHeader, textAlign: c.align || 'left', cursor: sortable ? 'pointer' : 'default' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: justify, gap: '6px' }}>
                      {c.label}
                      {sortable && <SortIndicator isActive={isActive} direction={sortConfig.direction} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <React.Fragment key={row.ticker || i}>
                <tr onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ backgroundColor: hovered === i ? p.surface2 : (i % 2 === 0 ? p.surface1 : p.surface2), transition: 'background-color 0.15s' }}>
                  {columns.map(col => (
                    <td key={col.key} style={getCellStyle(col, sortConfig.key === col.key)}>
                      {getCellValue(row, col)}
                    </td>
                  ))}
                </tr>
                {showDescriptions && row.description && (
                  <tr style={{ backgroundColor: i % 2 === 0 ? p.surface1 : p.surface2, borderBottom: `1px solid ${p.border}` }}>
                    <td></td>
                    <td colSpan={columns.length - 1} style={s.tableDesc}>{row.description}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Wrapper for bucket tables (Semi Equipment, Space/Defense)
  const BucketTable = ({ bucket }) => (
    <div style={s.mb32}>
      <TableHeader label="BUCKET" id={bucket.id} title={bucket.name} tagline={bucket.tagline} insight={bucket.insight} />
      <SortableStockTable stocks={bucket.stocks} showDescriptions={true} />
    </div>
  );

  // ==========================================================================
  // NAVIGATION CONFIG
  // ==========================================================================
  const sections = [
    { id: 'cover', num: '', title: 'Cover' },
    { id: 'why', num: '01', title: 'Investment Thesis' },
    { id: 'methodology', num: '02', title: 'Analytical Methodology' },
    { id: 'analysis', num: '03', title: 'Theme Analysis' },
    { id: 'semi-equip', num: '04', title: 'Semiconductor Equip.' },
    { id: 'space', num: '05', title: 'Space & Satellites' },
    { id: 'biotech', num: '06', title: 'Biotech' },
    { id: 'defense', num: '07', title: 'Defense & Aerospace' },
    { id: 'silver-gold', num: '08', title: 'Silver & Gold' },
    { id: 'metals-materials', num: '09', title: 'Strategic Metals & Materials' },
    { id: 'power-gen', num: '10', title: 'Power Generation' },
    { id: 'watchlist', num: '11', title: 'Watchlist' },
    { id: 'buildout', num: '12', title: 'Physical Buildout' },
  ];

  // ==========================================================================
  // SECTION RENDERERS
  // ==========================================================================
  const renderCover = () => (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px', backgroundColor: p.surface2 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', marginTop: '118px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ ...s.coverTitle, textAlign: 'center' }}>The Control Premium:<br />A 2026 Thesis</h1>
          <p style={{ color: p.neutral, fontFamily: "'Poppins', sans-serif", fontSize: '28px', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>Why Markets Move Before Fundamentals—and Where to Position in 2026</p>
          <p style={{ color: p.neutral, fontSize: '21px', fontStyle: 'italic' }}>AI Chokepoints · Power Bottlenecks · Supply Chain Reshoring · Defense Modernization · Strategic Commodities</p>
        </div>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ ...s.grid4, paddingTop: '24px', borderTop: `2px solid ${p.action}` }}>
          <StatBox value="3,021" label="Stocks Analyzed" />
          <StatBox value="150" label="Industry Groups" />
          <StatBox value="17" label="Themes Identified" />
          <StatBox value="2,421" label="SMID Focus" />
        </div>
      </div>
    </section>
  );

  const renderSection01 = () => (
    <section style={s.section}>
      <SectionHeader num="01" title="Investment Thesis" subtitle="The Control Premium: A 2026 Thesis" />
      
      <div style={s.mb32}>
        <p style={s.body}>In January 2023, a small Taiwanese company that few investors could name correctly held the fate of the entire artificial intelligence revolution in its hands. TSMC's advanced packaging facility—a single building in Taoyuan—had become the narrowest chokepoint in a trillion-dollar supply chain. Every AI chip that mattered passed through those doors. The company's stock had already doubled. The earnings hadn't yet moved.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>This wasn't speculation. It was anticipation—the market doing exactly what it's supposed to do, just faster than most investors are comfortable with.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>We are living through one of the great capital reallocation events in modern markets. Trillions of dollars are being repositioned around a handful of physical constraints that cannot be solved with money or urgency. The winners and losers of the next decade are being determined now—not in earnings releases, but in the quiet reassignment of control over systems that the world increasingly cannot function without.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>Most professional capital will not capture these returns. The data is unambiguous.</p>
      </div>

      <div style={s.mb32}>
        <h4 style={s.h4}>Why Most Money Managers Underperform</h4>
        <p style={s.body}>According to the S&P SPIVA Scorecard, 90% of actively managed large-cap equity funds underperform the S&P 500 over a 15-year horizon. Over that same period, there is not a single fund category—domestic or international—in which a majority of active managers beat their benchmark. This is not a temporary aberration. It is a structural feature of how institutional capital operates.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>The vast majority of investable capital is concentrated in precisely the structures least equipped to capture early-stage returns. The world's 500 largest asset managers control $140 trillion in assets. The top 20 alone—firms like BlackRock, Vanguard, Fidelity, and State Street—manage $66 trillion, nearly half of the total. These are multi-billion and multi-trillion dollar portfolios, and the managers who run them are beholden to a system that makes early positioning structurally difficult.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>This is not a criticism. It is an opportunity—one that favors smaller, more flexible investors willing to work extremely hard.</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h4 style={s.h4}>The Institutional Gap</h4>
        <p style={s.body}>Large pools of capital face real limitations that have nothing to do with insight.</p>
        <p style={{ ...s.body, marginTop: '16px' }}><strong style={s.strong}>Fiduciary obligations</strong> require that investment decisions trace cleanly to auditable data—balance sheets, earnings, guidance. A portfolio manager at a pension fund cannot tell beneficiaries that she bought a stock because she recognized a chokepoint before it appeared in the numbers. She needs documentation that will survive scrutiny if the position moves against her.</p>
        <p style={{ ...s.body, marginTop: '16px' }}><strong style={s.strong}>Liquidity requirements</strong> make concentrated bets in smaller-cap names impractical. A fund managing $50 billion cannot build meaningful exposure to a $2 billion company solving a critical constraint without moving the market or creating exit risk.</p>
        <p style={{ ...s.body, marginTop: '16px' }}><strong style={s.strong}>Committee structures and quarterly reviews</strong> create natural gravitational pull toward consensus. Positions that "look wrong" for two or three quarters—even if the thesis is intact—generate career risk that compounds with every uncomfortable meeting.</p>
        <p style={{ ...s.body, marginTop: '16px' }}><strong style={s.strong}>Benchmark orientation</strong> rewards staying close to the index. Meaningful deviation, even when justified, creates tracking error that many mandates cannot tolerate.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>These are not failures of intelligence. They are features of institutional architecture. The same structures that protect capital and ensure accountability also create systematic difficulty in capturing returns that materialize before fundamentals confirm them.</p>
        <p style={{ ...s.body, marginTop: '16px' }}>This is not a critique. It is an opportunity.</p>
      </div>
    </section>
  );

  const renderSection02 = () => {
    const [hoveredQuadrant, setHoveredQuadrant] = useState(null);
    const [hoveredTheme, setHoveredTheme] = useState(null);

    const quadrantData = {
      highConviction: {
        title: 'HIGH CONVICTION',
        subtitle: 'Strong momentum + Strong fundamentals',
        themes: ['Semi Equipment', 'Space & Satellites', 'Defense & Aerospace', 'Power Gen Equipment'],
        color: '#0077B6',
        bgGradient: 'linear-gradient(135deg, rgba(0, 119, 182, 0.08) 0%, rgba(0, 119, 182, 0.02) 100%)',
        hoverBg: 'linear-gradient(135deg, rgba(0, 119, 182, 0.15) 0%, rgba(0, 119, 182, 0.05) 100%)',
        icon: '◆',
      },
      watchlist: {
        title: 'WATCHLIST',
        subtitle: 'Strong fundamentals, momentum building',
        themes: ['Precious Metals', 'Data Storage', 'Interconnects', 'US Wholesale Power', 'Specialty Contracting', 'Behind-the-Meter', 'Respiratory Pharma', 'Immunology Pharma'],
        color: '#023E8A',
        bgGradient: 'linear-gradient(135deg, rgba(2, 62, 138, 0.06) 0%, rgba(2, 62, 138, 0.01) 100%)',
        hoverBg: 'linear-gradient(135deg, rgba(2, 62, 138, 0.12) 0%, rgba(2, 62, 138, 0.03) 100%)',
        icon: '○',
      },
      avoid: {
        title: 'AVOID',
        subtitle: 'Weak fundamentals, fading momentum',
        themes: ['AI Software', 'Design Software', 'Internet Hosting'],
        color: '#94A3B8',
        bgGradient: 'linear-gradient(135deg, rgba(148, 163, 184, 0.04) 0%, rgba(148, 163, 184, 0.01) 100%)',
        hoverBg: 'linear-gradient(135deg, rgba(148, 163, 184, 0.08) 0%, rgba(148, 163, 184, 0.02) 100%)',
        icon: '▽',
      },
      excluded: {
        title: 'EXCLUDED',
        subtitle: 'Outside investment mandate',
        themes: ['Mortgage REITs', 'Investment Banking'],
        color: '#CBD5E1',
        bgGradient: 'linear-gradient(135deg, rgba(203, 213, 225, 0.04) 0%, rgba(203, 213, 225, 0.01) 100%)',
        hoverBg: 'linear-gradient(135deg, rgba(203, 213, 225, 0.08) 0%, rgba(203, 213, 225, 0.02) 100%)',
        icon: '×',
      },
    };

    const QuadrantCell = ({ quadrantKey, position }) => {
      const q = quadrantData[quadrantKey];
      const isHovered = hoveredQuadrant === quadrantKey;
      const isHighConviction = quadrantKey === 'highConviction';
      
      const borderStyles = {
        topLeft: { borderRight: `2px solid ${p.accent}`, borderBottom: `2px solid ${p.accent}` },
        topRight: { borderBottom: `2px solid ${p.accent}` },
        bottomLeft: { borderRight: `2px solid ${p.accent}` },
        bottomRight: {},
      };

      return (
        <div
          onMouseEnter={() => setHoveredQuadrant(quadrantKey)}
          onMouseLeave={() => setHoveredQuadrant(null)}
          style={{
            padding: '28px 32px',
            background: isHovered ? q.hoverBg : q.bgGradient,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            zIndex: isHovered ? 10 : 1,
            position: 'relative',
            cursor: 'pointer',
            ...borderStyles[position],
          }}
        >
          {/* Quadrant Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: isHighConviction ? '20px' : '16px', 
              color: q.color,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}>
              {q.icon}
            </span>
            <h4 style={{ 
              fontSize: isHighConviction ? '18px' : '15px', 
              fontWeight: 700, 
              color: q.color, 
              margin: 0,
              letterSpacing: '0.05em',
            }}>
              {q.title}
            </h4>
          </div>
          
          {/* Subtitle */}
          <p style={{ 
            fontSize: '11px', 
            color: p.neutral, 
            margin: '0 0 16px 0',
            opacity: isHovered ? 1 : 0.7,
            transition: 'opacity 0.3s ease',
          }}>
            {q.subtitle}
          </p>
          
          {/* Theme Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {q.themes.map((theme, i) => {
              const isThemeHovered = hoveredTheme === `${quadrantKey}-${i}`;
              return (
                <span
                  key={theme}
                  onMouseEnter={() => setHoveredTheme(`${quadrantKey}-${i}`)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  style={{
                    display: 'inline-block',
                    padding: isHighConviction ? '8px 14px' : '6px 12px',
                    backgroundColor: isThemeHovered ? q.color : (isHighConviction ? `${q.color}15` : `${q.color}08`),
                    color: isThemeHovered ? '#FFFFFF' : (isHighConviction ? p.strong : p.neutral),
                    fontSize: isHighConviction ? '13px' : '12px',
                    fontWeight: isHighConviction ? 600 : 400,
                    borderRadius: '20px',
                    border: `1px solid ${isThemeHovered ? q.color : (isHighConviction ? `${q.color}30` : `${q.color}15`)}`,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    transform: isThemeHovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: isThemeHovered ? `0 4px 12px ${q.color}30` : 'none',
                  }}
                >
                  {theme}
                </span>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <section style={s.section}>
        <SectionHeader num="02" title="Analytical Methodology" subtitle="How we identify high-conviction themes" />
        
        {/* Methodology Explanation */}
        <p style={{ ...s.bodyLg, marginBottom: '32px' }}>The highest-returning investment themes increasingly represent solutions to economic bottlenecks preventing high-growth systems from scaling. To identify which industries serve the same constraint, we used Anthropic's Claude Opus 4.5 to synthesize expert research from sources with proven track records: Sequoia, Andreessen Horowitz, Michael Cembalest (Chairman of Market and Investment Strategy, J.P. Morgan Asset & Wealth Management), SemiAnalysis, and custom biotech and commodities analysis generated through Google's NotebookLM.</p>

        {/* Process Flow Diagram */}
        {(() => {
          const [hoveredStep, setHoveredStep] = useState(null);
          const steps = [
            { id: 1, label: "UNIVERSE", value: "3,021", desc: "US-listed stocks from FactSet growth screen", type: "auto" },
            { id: 2, label: "QUANT SCREEN", value: "RBICS", desc: "Filter by momentum, growth, and margin trajectory", type: "auto" },
            { id: 3, label: "AI CLUSTERING", value: "17", desc: "Claude groups industries by shared constraints", type: "auto" },
            { id: 4, label: "ANALYST OVERLAY", value: "+40", desc: "Human review adds names missed by RBICS", type: "human" },
            { id: 5, label: "FINAL UNIVERSE", value: "87", desc: "Curated stocks across 3 high-conviction themes", type: "auto" },
          ];
          return (
            <div style={{ 
              backgroundColor: p.surface1, 
              padding: '56px 32px 40px 32px', 
              borderRadius: '12px',
              border: `1px solid ${p.border}`,
              marginBottom: '40px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0', position: 'relative' }}>
                {steps.map((step, idx) => {
                  const isHovered = hoveredStep === step.id;
                  const isHuman = step.type === 'human';
                  const circleColor = isHuman ? p.action : p.strong;
                  return (
                    <div 
                      key={step.id}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {idx < steps.length - 1 && (
                        <div style={{
                          position: 'absolute', top: '32px', left: '50%', width: '100%', height: '3px',
                          background: idx === 2 ? `linear-gradient(90deg, ${p.strong} 0%, ${p.action} 100%)` : idx === 3 ? `linear-gradient(90deg, ${p.action} 0%, ${p.strong} 100%)` : p.strong,
                          zIndex: 0,
                        }}>
                          <div style={{ position: 'absolute', right: '0', top: '-4px', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: `8px solid ${idx === 2 ? p.action : p.strong}` }} />
                        </div>
                      )}
                      {isHuman && (
                        <div style={{
                          position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)',
                          backgroundColor: p.strong, color: p.surface1, fontSize: '9px', padding: '4px 10px',
                          borderRadius: '10px', fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'nowrap',
                        }}>
                          👤 HUMAN
                        </div>
                      )}
                      <div style={{
                        width: '64px', height: '64px', borderRadius: '50%', backgroundColor: circleColor,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                        transition: 'all 0.2s ease', transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: isHovered ? `0 8px 24px ${circleColor}50` : `0 4px 12px ${circleColor}30`,
                        cursor: 'pointer', border: `3px solid rgba(255,255,255,0.2)`,
                      }}>
                        <span style={{ color: p.surface1, fontSize: step.value.length > 3 ? '12px' : '18px', fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}>
                          {step.value}
                        </span>
                      </div>
                      <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: isHuman ? p.action : p.strong, marginBottom: '6px' }}>
                          {step.label}
                        </div>
                        <div style={{ fontSize: '11px', color: p.neutral, maxWidth: '110px', lineHeight: 1.5, opacity: isHovered ? 1 : 0.8, transition: 'opacity 0.2s ease' }}>
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Closing Context */}
        <p style={{ ...s.body, marginBottom: '48px' }}>This constraint-based approach is built for aggressive growth mandates targeting asymmetric returns in the SMID-cap universe, where mis-pricing persists longer and bottleneck resolution drives durable value capture.</p>

        {/* Quadrant Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ 
            ...s.subhead, 
            marginBottom: '8px',
            background: `linear-gradient(135deg, ${p.strong} 0%, ${p.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Synthesis: Which Themes Pass Both Filters?</h3>
          <p style={{ fontSize: '13px', color: p.neutral }}>Hover over quadrants and themes to explore</p>
        </div>
        
        {/* Enhanced Quadrant Grid */}
        <div style={{ 
          position: 'relative',
          border: `1px solid ${p.border}`,
          borderRadius: '12px',
          overflow: 'visible',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
          marginLeft: '40px',
          marginBottom: '24px',
        }}>
          {/* Y-Axis Label (Fundamentals - Left side, pointing UP) */}
          <div style={{ 
            position: 'absolute', 
            left: '-36px', 
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            transformOrigin: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              letterSpacing: '0.12em', 
              color: p.accent,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              ↑ Fundamentals
            </span>
          </div>
          
          {/* X-Axis Label (Momentum - Bottom, pointing RIGHT) */}
          <div style={{ 
            position: 'absolute', 
            bottom: '-24px', 
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 700, 
              letterSpacing: '0.12em', 
              color: p.accent,
              textTransform: 'uppercase',
            }}>
              Momentum →
            </span>
          </div>

          {/* Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gridTemplateRows: 'auto auto',
          }}>
            <QuadrantCell quadrantKey="watchlist" position="topLeft" />
            <QuadrantCell quadrantKey="highConviction" position="topRight" />
            <QuadrantCell quadrantKey="avoid" position="bottomLeft" />
            <QuadrantCell quadrantKey="excluded" position="bottomRight" />
          </div>
        </div>

        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '32px', 
          marginTop: '24px',
          padding: '16px',
          backgroundColor: p.surface2,
          borderRadius: '8px',
        }}>
          {Object.entries(quadrantData).map(([key, q]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: q.color }}>{q.icon}</span>
              <span style={{ fontSize: '12px', color: p.neutral }}>{q.title}</span>
              <span style={{ 
                fontSize: '11px', 
                color: p.neutral, 
                backgroundColor: `${q.color}15`,
                padding: '2px 8px',
                borderRadius: '10px',
              }}>
                {q.themes.length}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSection03 = () => {
    const ThemeTooltip = ({ active, payload }) => {
      if (!active || !payload?.length) return null;
      const d = payload[0].payload;
      return (
        <div style={{ backgroundColor: p.surface1, padding: '16px', border: `1px solid ${p.border}`, fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <p style={{ color: catColors[d.category], fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{d.theme}</p>
          <p style={{ color: p.neutral, fontSize: '12px', marginBottom: '12px' }}>{d.category}</p>
          <div style={{ display: 'grid', gap: '6px' }}>
            <p style={{ fontSize: '13px', color: p.neutral }}>6M Return: <span style={{ fontWeight: 600, color: d.medianReturn6M >= 0 ? p.positive : p.negative }}>{d.medianReturn6M?.toFixed(1)}%</span></p>
            <p style={{ fontSize: '13px', color: p.neutral }}>3M Return: <span style={{ fontWeight: 600, color: d.medianReturn3M >= 0 ? p.positive : p.negative }}>{d.medianReturn3M?.toFixed(1)}%</span></p>
            <p style={{ fontSize: '13px', color: p.neutral }}>Rev Growth: <span style={{ fontWeight: 600, color: p.strong }}>{d.medianRevGrowth?.toFixed(1)}%</span></p>
            <p style={{ fontSize: '13px', color: p.neutral }}>% Margin Improving: <span style={{ fontWeight: 600, color: p.positive }}>{d.pctMarginImproving?.toFixed(0)}%</span></p>
            <p style={{ fontSize: '13px', color: p.neutral }}>Stocks: <span style={{ fontWeight: 600, color: p.strong }}>{d.stockCount}</span></p>
          </div>
        </div>
      );
    };

    const pctFmt = v => `${v}%`;
    const tickStyle = { fontFamily: "'Poppins', sans-serif", fontSize: 11, fill: p.neutral };

    // Inline legend component using circles
    const InlineLegend = () => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '20px' }}>
        {Object.entries(catColors).map(([cat, color]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color, opacity: 0.7, border: `2px solid ${color}` }} />
            <span style={{ fontSize: '12px', color: p.neutral }}>{cat}</span>
          </div>
        ))}
      </div>
    );

    return (
      <section style={s.section}>
        <SectionHeader num="03" title="Theme Analysis" subtitle="Visualizing momentum, returns, and fundamentals across all themes" />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: `1px solid ${p.border}` }}>
          {['momentum', 'fundamentals'].map(view => (
            <button key={view} onClick={() => setActiveView(view)}
              style={{ paddingBottom: '12px', fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', backgroundColor: 'transparent', borderBottom: activeView === view ? `3px solid ${p.accent}` : '3px solid transparent', color: activeView === view ? p.accent : p.neutral, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins', sans-serif" }}>
              {view === 'momentum' ? 'Momentum Analysis' : 'Fundamental Analysis'}
            </button>
          ))}
        </div>

        {/* Category Filter Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['All', 'High Conviction', 'Watchlist'].map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              style={{ padding: '8px 16px', fontSize: '13px', border: 'none', backgroundColor: selectedCategory === cat ? (cat === 'All' ? p.accent : catColors[cat]) : 'transparent', color: selectedCategory === cat ? p.surface1 : p.neutral, fontWeight: selectedCategory === cat ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div style={{ ...s.card, padding: '32px' }}>
          {activeView === 'momentum' && (<>
            <h3 style={{ ...s.h4, fontSize: '18px', marginBottom: '8px' }}>Momentum Analysis: Is Recent Performance Accelerating?</h3>
            <p style={{ ...s.body, marginBottom: '16px' }}>Points above the dashed line show accelerating momentum (3M gains outpacing 6M trend)</p>
            <InlineLegend />
            <ResponsiveContainer width="100%" height={450}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={p.border} />
                <XAxis dataKey="x" type="number" tickFormatter={pctFmt} domain={[-30, 140]} stroke={p.neutral} tick={tickStyle} label={{ value: '6-Month Return (%)', position: 'bottom', offset: 20, fill: p.neutral, fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 500 }} />
                <YAxis dataKey="y" type="number" tickFormatter={pctFmt} domain={[-20, 60]} stroke={p.neutral} tick={tickStyle} label={{ value: '3-Month Return (%)', angle: -90, position: 'left', fill: p.neutral, fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 500 }} />
                <ZAxis dataKey="z" range={[100, 800]} />
                <Tooltip content={<ThemeTooltip />} />
                <ReferenceLine x={0} stroke={p.border} /><ReferenceLine y={0} stroke={p.border} />
                {/* Trend line: y = x/2 (steady momentum) */}
                <Scatter data={trendLineData} line={{ stroke: p.strong, strokeWidth: 2, strokeDasharray: '6 4' }} shape={() => null} />
                <Scatter data={momentumScatterData}>{momentumScatterData.map((e, i) => <Cell key={i} fill={catColors[e.category]} fillOpacity={0.7} stroke={catColors[e.category]} strokeWidth={2} />)}</Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            {/* Key Insight Callout */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '24px', padding: '20px 24px', backgroundColor: p.surface2, borderLeft: `3px solid ${p.accent}` }}>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: p.accent, marginBottom: '8px' }}>KEY INSIGHT: Watchlist</p>
                <p style={{ fontSize: '15px', fontWeight: 600, color: p.strong, marginBottom: '8px' }}>The Pattern: Cooling Momentum, Strong Fundamentals</p>
                <p style={{ fontSize: '14px', color: p.neutral, lineHeight: 1.7, margin: 0 }}>When a theme's 3-month return is less than half its 6-month return, the early momentum buyers have likely taken profits. These themes aren't broken — fundamentals remain solid — but entry points matter. The watchlist serves as a re-entry queue when either (a) price pulls back to create better risk/reward, or (b) a new catalyst reignites momentum.</p>
              </div>
            </div>
          </>)}

          {activeView === 'fundamentals' && (<>
            <h3 style={{ ...s.h4, fontSize: '18px', marginBottom: '8px' }}>Fundamental Analysis: Revenue Growth vs Margin Trajectory</h3>
            <p style={{ ...s.body, marginBottom: '16px' }}>Bottleneck companies show both demand growth AND operating leverage</p>
            <InlineLegend />
            <ResponsiveContainer width="100%" height={420}>
              <ScatterChart margin={{ top: 20, right: 40, bottom: 50, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={p.border} />
                <XAxis dataKey="x" type="number" tickFormatter={pctFmt} domain={[0, 65]} stroke={p.neutral} tick={tickStyle} label={{ value: 'Median Revenue Growth (%)', position: 'bottom', offset: 25, fill: p.neutral, fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }} />
                <YAxis dataKey="y" type="number" tickFormatter={pctFmt} domain={[25, 105]} stroke={p.neutral} tick={tickStyle} label={{ value: '% Stocks with Improving Margins', angle: -90, position: 'left', offset: 10, fill: p.neutral, fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }} />
                <ZAxis dataKey="z" range={[100, 600]} />
                <Tooltip content={<ThemeTooltip />} />
                <ReferenceLine x={20} stroke={p.positive} strokeDasharray="4 4" strokeOpacity={0.5} /><ReferenceLine y={50} stroke={p.positive} strokeDasharray="4 4" strokeOpacity={0.5} />
                <Scatter data={fundamentalScatterData}>{fundamentalScatterData.map((e, i) => <Cell key={i} fill={catColors[e.category]} fillOpacity={0.7} stroke={catColors[e.category]} strokeWidth={2} />)}</Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
              <div style={{ padding: '12px 16px', backgroundColor: `${p.positive}10`, borderLeft: `3px solid ${p.positive}` }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: p.positive, marginBottom: '2px' }}>TOP-RIGHT: Scarcity Rent Capture</p>
                <p style={{ ...s.body, fontSize: '13px' }}>High growth + margin expansion</p>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: `${p.negative}10`, borderLeft: `3px solid ${p.negative}` }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: p.negative, marginBottom: '2px' }}>BOTTOM-LEFT: Value Traps</p>
                <p style={{ ...s.body, fontSize: '13px' }}>Low growth + margin pressure</p>
              </div>
            </div>
          </>)}
        </div>
      </section>
    );
  };

  // ==========================================================================
  // HIGH CONVICTION THEME SECTIONS (04-07)
  // ==========================================================================
  const renderThemeSection = (themeIndex, sectionNum) => {
    const theme = highConvictionThemes[themeIndex];
    return (
      <section style={s.section}>
        <SectionHeader num={sectionNum} title={theme.title} subtitle="High Conviction Theme" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          {theme.paragraphs.map((para, i) => (
            <div key={i}>
              {para.h && <h4 style={s.h4}>{para.h}</h4>}
              <p style={s.body}>{para.t}</p>
            </div>
          ))}
        </div>
        
        <SortableStockTable data={stockData[theme.dataKey]} columns={stdCols(theme.showPS)} defaultSort={{ key: 'm1', direction: 'desc' }} showDescriptions={false} />
        {theme.note && <p style={{ fontSize: '12px', color: p.neutral, fontStyle: 'italic', marginTop: '-16px' }}>{theme.note}</p>}
      </section>
    );
  };

  // Custom bucket table component for semi equipment (wrapper using SortableStockTable)
  // Custom Section 04 with integrated thematic bucket tables
  const renderSection04 = () => {
    const theme = highConvictionThemes[0];
    // Map paragraphs to relevant buckets
    const paragraphBucketMap = [
      { paragraphIndex: 0, bucketIds: [] },          // "The Bottleneck Has Shifted" → intro, no table
      { paragraphIndex: 1, bucketIds: [1, 2] },      // "Packaging Is the New Gating Factor" → Packaging, Test/Inspection
      { paragraphIndex: 2, bucketIds: [4, 5, 6] },   // "Revenue Depends on Connectivity" → Optical, Interconnect, Fiber
      { paragraphIndex: 3, bucketIds: [] },          // "HBM Quality Tiering" → no table, has note
      { paragraphIndex: 4, bucketIds: [3] },         // "Margin Expansion" → Core Lithography
    ];

    return (
      <section style={s.section}>
        <SectionHeader num="04" title={theme.title} subtitle="High Conviction Theme — Bottleneck-Based Investment Map" />

        {/* Interleaved Paragraphs and Bucket Tables */}
        {theme.paragraphs.map((para, pIndex) => {
          const mapping = paragraphBucketMap.find(m => m.paragraphIndex === pIndex);
          const relatedBuckets = mapping ? mapping.bucketIds.map(id => semiEquipmentBuckets.find(b => b.id === id)).filter(Boolean) : [];
          
          return (
            <div key={pIndex} style={{ marginBottom: '40px' }}>
              {/* Narrative Section */}
              <div style={{ marginBottom: '24px' }}>
                {para.h && <h4 style={s.h4}>{para.h}</h4>}
                <p style={s.body}>{para.t}</p>
                {/* Note after paragraph if present */}
                {para.note && (
                  <p style={{ fontSize: '12px', color: p.neutral, fontStyle: 'italic', marginTop: '12px', padding: '12px 16px', backgroundColor: p.surface2, borderLeft: `2px solid ${p.border}` }}>{para.note}</p>
                )}
              </div>
              
              {/* Related Bucket Tables */}
              {relatedBuckets.length > 0 && (
                <div style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                  {relatedBuckets.map(bucket => (
                    <BucketTable key={bucket.id} bucket={bucket} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Data Source Note */}
        <div style={s.calloutNote}>
          <p style={{ ...s.captionSm, margin: 0 }}>
            <strong style={s.strong}>Data as of January 18, 2026.</strong> Rev Gr (YoY) = Revenue growth, year-over-year, most recent quarter vs same quarter prior year. Returns are total returns including dividends.
          </p>
        </div>
      </section>
    );
  };
  const renderSection05Theme = () => {
    const theme = highConvictionThemes[1]; // Space & Satellites
    // Map paragraphs to relevant buckets (using spaceDefenseBuckets with their IDs)
    const paragraphBucketMap = [
      { paragraphIndex: 0, bucketIds: [5] },       // "95% Cost Collapse" → Launch, Satellite Manufacturing
      { paragraphIndex: 1, bucketIds: [6, 7] },    // "Dual Revenue Engines" → Satcom, Geospatial
      { paragraphIndex: 2, bucketIds: [1, 2] },    // "Throughput Is the Binding Constraint" → Propulsion, Materials
      { paragraphIndex: 3, bucketIds: [3] },       // "Edge vs. Core: Where Scarcity Dominates" → Guidance/Mission Electronics
      { paragraphIndex: 4, bucketIds: [4] },       // "Defense as Revenue Anchor" → Test, Integration, Sustainment
      { paragraphIndex: 5, bucketIds: [] },        // "Where Value Accrues" → Summary, no table
    ];

    return (
      <section style={s.section}>
        <SectionHeader num="05" title={theme.title} subtitle="High Conviction Theme — Bottleneck-Based Investment Map" />

        {/* Interleaved Paragraphs and Bucket Tables */}
        {theme.paragraphs.map((para, pIndex) => {
          const mapping = paragraphBucketMap.find(m => m.paragraphIndex === pIndex);
          const relatedBuckets = mapping ? mapping.bucketIds.map(id => spaceDefenseBuckets.find(b => b.id === id)).filter(Boolean) : [];
          
          return (
            <div key={pIndex} style={{ marginBottom: '40px' }}>
              {/* Narrative Section */}
              <div style={{ marginBottom: '24px' }}>
                {para.h && <h4 style={s.h4}>{para.h}</h4>}
                <p style={s.body}>{para.t}</p>
              </div>
              
              {/* Related Bucket Tables */}
              {relatedBuckets.length > 0 && (
                <div style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                  {relatedBuckets.map(bucket => (
                    <BucketTable key={bucket.id} bucket={bucket} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Data Source Note */}
        <div style={s.calloutNote}>
          <p style={{ ...s.captionSm, margin: 0 }}>
            <strong style={s.strong}>Data as of January 18, 2026.</strong> Rev Gr (YoY) = Revenue growth, year-over-year, most recent quarter vs same quarter prior year. Returns are total returns including dividends.
          </p>
        </div>
      </section>
    );
  };
  const renderSection06Theme = () => renderThemeSection(2, '07');
  const renderSection07Theme = () => renderThemeSection(3, '10');

  const renderSection08 = () => (
    <section style={s.section}>
      <SectionHeader num="11" title="Watchlist" subtitle="Themes with fading momentum but intact fundamentals — wait for re-entry" />
      <p style={{ ...s.bodyLg, marginBottom: '32px' }}>These themes had strong 6-month runs but recent momentum has cooled. Fundamentals remain solid — margins are still expanding — but the 3-month returns suggest the easy gains have been made. These are candidates for re-entry on pullbacks.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
        {[
          { name: 'Precious Metals', cat: 'Decoupling', color: p.gold, m6: 102.4, m3: 15.7, margin: 9.6, note: 'Big run on gold prices; near-term momentum exhausted' },
          { name: 'Data Storage', cat: 'AI Infra', color: p.accent, m6: 122.7, m3: 44.7, margin: 1.8, note: 'WDC/STX rerated; SNDK spin-off distorts returns' },
          { name: 'Interconnects', cat: 'AI Infra', color: p.accent, m6: 45.7, m3: 7.1, margin: 4.1, note: 'Copper/fiber plays; momentum paused' },
          { name: 'US Wholesale Power', cat: 'Power', color: p.gold, m6: 34.8, m3: -2.9, margin: 24.4, note: 'Best-in-class margins but price already reflects it' },
          { name: 'Specialty Contracting', cat: 'Buildout', color: p.strong, m6: 42.2, m3: 19.1, margin: 0.6, note: 'FIX, EME ran hard; await pullback' },
          { name: 'Behind-the-Meter', cat: 'Power', color: p.gold, m6: 22.4, m3: 8.2, margin: 3.8, note: 'On-site generation/storage; slower re-entry' },
          { name: 'Respiratory Pharma', cat: 'Decoupling', color: p.positive, m6: 74.5, m3: 16.1, margin: 10.1, note: 'Strong fundamentals; momentum slowing' },
          { name: 'Immunology Pharma', cat: 'Decoupling', color: p.positive, m6: 61.0, m3: 22.4, margin: 12.0, note: 'Biotech rotation beneficiary; consolidating' },
        ].map(t => (
          <div key={t.name} style={{ padding: '20px', backgroundColor: p.surface2, borderTop: `2px solid ${t.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ fontWeight: 600, fontSize: '14px', color: p.strong }}>{t.name}</h4>
              <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: `${t.color}15`, color: t.color }}>{t.cat}</span>
            </div>
            <div style={{ fontSize: '12px', color: p.neutral, marginBottom: '4px' }}>
              <div>6M: <span style={{ color: t.m6 >= 0 ? p.positive : p.negative }}>{fmt(t.m6)}</span> → 3M: <span style={{ color: t.m3 >= 0 ? p.positive : p.negative }}>{fmt(t.m3)}</span></div>
              <div>Margin Trend: <span style={{ color: p.positive }}>{fmt(t.margin)}</span></div>
            </div>
            <p style={{ fontSize: '12px', color: p.neutral, marginTop: '8px' }}>{t.note}</p>
          </div>
        ))}
      </div>
      <InsightCard title="The Pattern: Strong 6M, Weaker 3M = Take Profits or Wait">
        <p>When a theme's 3-month return is less than half its 6-month return, the early momentum buyers have likely taken profits. These themes aren't broken — fundamentals remain solid — but entry points matter. The watchlist serves as a re-entry queue when either (a) price pulls back to create better risk/reward, or (b) a new catalyst reignites momentum.</p>
      </InsightCard>
    </section>
  );

  // OPTIMIZED: Sections 06, 07, 08 use shared rendering pattern
  const renderDeepDiveSection = (num, title, subtitle, insightTitle, insightContent, subsections) => (
    <section style={s.section}>
      <SectionHeader num={num} title={title} subtitle={subtitle} />
      <InsightCard title={insightTitle}>{insightContent}</InsightCard>
      {subsections.map((sub, i) => (
        <div key={i}>
          <h3 style={{ ...s.themeTitle, marginTop: '40px', marginBottom: '4px' }}>{sub.title}</h3>
          <p style={{ ...s.captionSm, marginBottom: '16px' }}>{sub.caption}</p>
          {sub.stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px', backgroundColor: p.surface2, marginBottom: '20px' }}>
              {sub.stats.map(st => (
                <div key={st.label}><div style={{ fontSize: '24px', fontWeight: 600, color: p.accent, ...s.mono, marginBottom: '4px' }}>{st.value}</div><div style={s.captionSm}>{st.label}</div></div>
              ))}
            </div>
          )}
          {sub.data && <SortableStockTable data={sub.data} columns={sub.columns || stdCols(true)} defaultSort={{ key: 'm1', direction: 'desc' }} showDescriptions={false} />}
          {sub.note && <p style={{ ...s.captionSm, marginTop: '-16px' }}>{sub.note}</p>}
          {sub.body && <p style={s.body}>{sub.body}</p>}
        </div>
      ))}
    </section>
  );

  // ==========================================================================
  // BIOTECH THEMATIC DATA
  // ==========================================================================
  const biotechThemes = [
    {
      id: 1,
      name: "Precision Diagnostics as the Gatekeeper to Treatment",
      intro: "Healthcare cannot treat what it cannot reliably detect. Precision diagnostics sit upstream of nearly every modern therapy, determining who gets treated, when, and with what. The system is shifting rapidly toward earlier, more frequent testing because treatment outcomes and costs diverge sharply depending on stage and timing. By 2025, over 70% of oncology drug trials required a companion diagnostic, up from less than 40% a decade ago, effectively turning diagnostics into mandatory infrastructure rather than optional add-ons. At the same time, multi-cancer early detection and transplant monitoring are pushing testing volumes higher without requiring new physicians or facilities. Companies embedded at this decision point benefit from rising utilization and workflow lock-in, not just innovation cycles. Once a diagnostic becomes standard of care, it controls patient flow for years.",
      stocks: [
        { ticker: "EXAS", company: "Exact Sciences", mktCap: "$19.5B", return1M: "+1%", return3M: "+67%", return6M: "+91%", revGrYoY: "+20%", opMargin: "1.9%", pS: "6.3x", description: "Leader in cancer screening and early detection. Benefits from rising testing frequency and expansion beyond colorectal cancer." },
        { ticker: "GH", company: "Guardant Health", mktCap: "$14.5B", return1M: "+12%", return3M: "+66%", return6M: "+135%", revGrYoY: "+39%", opMargin: "-37.3%", pS: "15.5x", description: "Liquid biopsy platform embedded in oncology decision-making. Volume growth driven by therapy-linked testing requirements." },
        { ticker: "CDNA", company: "CareDx", mktCap: "$1.0B", return1M: "+3%", return3M: "+33%", return6M: "+4%", revGrYoY: "+21%", opMargin: "2.0%", pS: "3.0x", description: "Controls post-transplant monitoring, a high-value, recurring testing niche with strong switching costs." },
        { ticker: "ILMN", company: "Illumina", mktCap: "$21.6B", return1M: "+8%", return3M: "+48%", return6M: "+46%", revGrYoY: "+0%", opMargin: "21.3%", pS: "5.1x", description: "Core infrastructure provider for genomic testing. Benefits from higher testing volumes regardless of which diagnostics win." },
      ]
    },
    {
      id: 2,
      name: "Immunology Commercialization and Margin Inflection",
      intro: "Immunology is moving from experimental to operational. Autoimmune and inflammatory diseases affect roughly 1 in 10 adults globally, and that prevalence is rising faster than overall population growth due to better diagnosis and longer lifespans. Historically, most patients were treated with broad immunosuppression. Today, targeted therapies are expanding addressable populations while improving safety and durability. By 2026, targeted biologics account for more than half of new autoimmune prescriptions, compared with roughly one-third in the mid-2010s. The investment opportunity is not just scientific success, but the transition from trial-stage assets to repeat, chronic revenue with operating leverage. When immunology drugs work and gain coverage, persistence rates are high and margins expand quickly.",
      stocks: [
        { ticker: "ALMS", company: "Alumis", mktCap: "$3.0B", return1M: "+109%", return3M: "+418%", return6M: "+594%", revGrYoY: "—", opMargin: "-5585%", pS: "112.3x", description: "High-momentum immunology platform targeting chronic inflammatory disease. Positioned for rapid repricing if trials succeed." },
        { ticker: "GLUE", company: "Monte Rosa Therapeutics", mktCap: "$1.8B", return1M: "+27%", return3M: "+130%", return6M: "+323%", revGrYoY: "+39%", opMargin: "-258%", pS: "10.8x", description: "Uses targeted protein degradation to address immune pathways previously considered undruggable." },
        { ticker: "KYTX", company: "Kyverna Therapeutics", mktCap: "$478M", return1M: "-18%", return3M: "+19%", return6M: "+105%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Applies cell therapy to autoimmune disease, aiming for durable immune reset rather than symptom control." },
        { ticker: "VRDN", company: "Viridian Therapeutics", mktCap: "$3.2B", return1M: "+1%", return3M: "+45%", return6M: "+98%", revGrYoY: "+81958%", opMargin: "-57%", pS: "38.4x", description: "Focused on a clearly defined autoimmune niche with strong pricing and persistence economics." },
        { ticker: "ATXS", company: "Astria Therapeutics", mktCap: "$712M", return1M: "-3%", return3M: "+3%", return6M: "+97%", revGrYoY: "—", opMargin: "-4831%", pS: "1024.6x", description: "Develops targeted biologics for rare inflammatory diseases with high unmet need." },
        { ticker: "IMVT", company: "Immunovant", mktCap: "$5.3B", return1M: "-1%", return3M: "+51%", return6M: "+48%", revGrYoY: "—", opMargin: "—", pS: "—", description: "FcRn-based platform with multiple autoimmune indications, positioning it as a strategic acquisition candidate." },
        { ticker: "KNSA", company: "Kiniksa Pharmaceuticals", mktCap: "$3.0B", return1M: "-5%", return3M: "+1%", return6M: "+39%", revGrYoY: "+61%", opMargin: "13.3%", pS: "5.3x", description: "One of the cleaner execution stories in immunology, with growing revenue and improving margins." },
        { ticker: "TGTX", company: "TG Therapeutics", mktCap: "$4.9B", return1M: "-1%", return3M: "-12%", return6M: "-21%", revGrYoY: "+93%", opMargin: "18.2%", pS: "9.3x", description: "Commercial-stage immunology company benefiting from improving adoption and operating leverage." },
      ]
    },
    {
      id: 3,
      name: "Respiratory and Pulmonary Under-Treatment",
      intro: "Respiratory disease is one of the most under-penetrated areas in biotech despite massive need. Chronic respiratory conditions affect over 10% of the global population, yet fewer than 25% of patients receive advanced or disease-modifying therapies, largely due to limited options and delivery challenges. Hospitalizations for respiratory exacerbations remain a leading cause of preventable admissions, signaling unmet demand rather than lack of diagnosis. New inhaled biologics and gene-based approaches are changing what is treatable, not just how symptoms are managed. As of 2025, more than 40% of late-stage respiratory pipelines involve novel delivery or genetic modalities, a sharp shift from traditional small molecules. When effective therapies emerge, adoption tends to be fast because the alternative is repeated acute care.",
      stocks: [
        { ticker: "UPB", company: "Upstream Bio", mktCap: "$1.7B", return1M: "+6%", return3M: "+39%", return6M: "+184%", revGrYoY: "+13%", opMargin: "-5539%", pS: "597.3x", description: "Focused on severe respiratory disease where effective therapies can drive rapid uptake." },
        { ticker: "SVRA", company: "Savara", mktCap: "$1.2B", return1M: "-9%", return3M: "+63%", return6M: "+152%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Targets rare lung diseases with limited competition and high unmet need." },
        { ticker: "SION", company: "Sionna Therapeutics", mktCap: "$1.7B", return1M: "-9%", return3M: "+20%", return6M: "+112%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Addresses cystic fibrosis patients not well served by existing therapies." },
        { ticker: "TBPH", company: "Theravance Biopharma", mktCap: "$1.0B", return1M: "+14%", return3M: "+43%", return6M: "+72%", revGrYoY: "+19%", opMargin: "-32%", pS: "12.9x", description: "Commercial respiratory portfolio with royalty-like economics and leverage to inhaled therapies." },
        { ticker: "INVA", company: "Innoviva", mktCap: "$1.5B", return1M: "-2%", return3M: "+13%", return6M: "-4%", revGrYoY: "+20%", opMargin: "31.1%", pS: "4.1x", description: "Generates high-margin cash flows tied to established respiratory drugs." },
        { ticker: "VRTX", company: "Vertex Pharmaceuticals", mktCap: "$112.0B", return1M: "-3%", return3M: "+8%", return6M: "-6%", revGrYoY: "+12%", opMargin: "41.0%", pS: "9.7x", description: "Category leader in cystic fibrosis with optionality to expand into broader pulmonary indications." },
      ]
    },
    {
      id: 4,
      name: "Biotech Enablers and Platform Infrastructure",
      intro: "Some of the most attractive biotech economics sit outside drug discovery entirely. Platform companies that improve delivery, dosing, or patient experience monetize the success of other people's drugs rather than betting on a single asset. These businesses benefit from faster regulatory timelines, increasing biologic complexity, and pharma's desire to extend product lifecycles without rebuilding infrastructure internally. When platforms are validated, they tend to behave more like healthcare infrastructure than biotech, with recurring revenue, high margins, and exposure across multiple therapeutic areas.",
      stocks: [
        { ticker: "HALO", company: "Halozyme Therapeutics", mktCap: "$8.4B", return1M: "+10%", return3M: "+6%", return6M: "+23%", revGrYoY: "+22%", opMargin: "61.5%", pS: "7.0x", description: "Enables subcutaneous delivery for biologics, earning royalties across many partnered drugs." },
        { ticker: "IRMD", company: "IRadimed", mktCap: "$1.3B", return1M: "+6%", return3M: "+35%", return6M: "+78%", revGrYoY: "+16%", opMargin: "32.2%", pS: "16.3x", description: "Niche medical device company with recurring demand tied to hospital imaging workflows." },
      ]
    },
    {
      id: 5,
      name: "Biotech Valuation Dislocation and Strategic M&A Optionality",
      intro: "Biotech valuations reflect capitulation, not fundamentals. Roughly 20% of public biotechs trade below net cash, an extreme rarely sustained once capital markets stabilize. At the same time, large pharmaceutical companies face a patent cliff exceeding $200 billion in revenue over the next five years, pushing them toward acquisition rather than internal development. Aggregate M&A capacity across big pharma now exceeds $1 trillion, creating an asymmetric setup where downside is limited by balance sheets while upside is driven by strategic value. In this environment, platform depth, validated modalities, and commercial traction matter more than single-trial outcomes.",
      stocks: [
        { ticker: "ALMS", company: "Alumis", mktCap: "$3.0B", return1M: "+109%", return3M: "+418%", return6M: "+594%", revGrYoY: "—", opMargin: "-5585%", pS: "112.3x", description: "Platform depth and momentum." },
        { ticker: "IMVT", company: "Immunovant", mktCap: "$5.3B", return1M: "-1%", return3M: "+51%", return6M: "+48%", revGrYoY: "—", opMargin: "—", pS: "—", description: "FcRn exposure with strategic relevance." },
        { ticker: "GLUE", company: "Monte Rosa Therapeutics", mktCap: "$1.8B", return1M: "+27%", return3M: "+130%", return6M: "+323%", revGrYoY: "+39%", opMargin: "-258%", pS: "10.8x", description: "Differentiated modality." },
        { ticker: "UPB", company: "Upstream Bio", mktCap: "$1.7B", return1M: "+6%", return3M: "+39%", return6M: "+184%", revGrYoY: "+13%", opMargin: "-5539%", pS: "597.3x", description: "Clean pulmonary acquisition target." },
      ]
    },
  ];

  const otherHealthcareCategories = [
    {
      name: "Neurology & CNS",
      stocks: [
        { ticker: "AXSM", company: "Axsome Therapeutics", mktCap: "$8.9B", return1M: "+21%", return3M: "+42%", return6M: "+59%", revGrYoY: "+63%", opMargin: "-19.3%", pS: "15.8x" },
        { ticker: "AVDL", company: "Avadel Pharmaceuticals", mktCap: "$2.1B", return1M: "+1%", return3M: "+43%", return6M: "+102%", revGrYoY: "+55%", opMargin: "2.5%", pS: "8.8x" },
        { ticker: "BWAY", company: "Brainsway", mktCap: "$457M", return1M: "+37%", return3M: "+45%", return6M: "+91%", revGrYoY: "+29%", opMargin: "9.3%", pS: "8.9x" },
      ]
    },
    {
      name: "Specialty Pharma",
      stocks: [
        { ticker: "LLY", company: "Eli Lilly", mktCap: "$981.7B", return1M: "-2%", return3M: "+27%", return6M: "+32%", revGrYoY: "+54%", opMargin: "47.6%", pS: "15.7x" },
        { ticker: "FOLD", company: "Amicus Therapeutics", mktCap: "$4.4B", return1M: "+32%", return3M: "+77%", return6M: "+136%", revGrYoY: "+19%", opMargin: "20.3%", pS: "7.4x" },
        { ticker: "BBIO", company: "BridgeBio Pharma", mktCap: "$14.7B", return1M: "+1%", return3M: "+39%", return6M: "+62%", revGrYoY: "+4318%", opMargin: "-113.0%", pS: "41.4x" },
        { ticker: "IRWD", company: "Ironwood Pharmaceuticals", mktCap: "$732M", return1M: "+27%", return3M: "+190%", return6M: "+508%", revGrYoY: "+33%", opMargin: "63.6%", pS: "2.4x" },
        { ticker: "LQDA", company: "Liquidia", mktCap: "$3.3B", return1M: "+8%", return3M: "+64%", return6M: "+167%", revGrYoY: "+1122%", opMargin: "3.3%", pS: "47.3x" },
        { ticker: "DVAX", company: "Dynavax Technologies", mktCap: "$1.8B", return1M: "+45%", return3M: "+59%", return6M: "+46%", revGrYoY: "+18%", opMargin: "22.4%", pS: "6.5x" },
        { ticker: "COLL", company: "Collegium Pharmaceutical", mktCap: "$1.4B", return1M: "-6%", return3M: "+37%", return6M: "+44%", revGrYoY: "+31%", opMargin: "30.4%", pS: "2.4x" },
        { ticker: "ANAB", company: "AnaptysBio", mktCap: "$1.3B", return1M: "+1%", return3M: "+33%", return6M: "+70%", revGrYoY: "+154%", opMargin: "45.5%", pS: "7.8x" },
      ]
    },
    {
      name: "Medical Devices & Equipment",
      stocks: [
        { ticker: "GMED", company: "Globus Medical", mktCap: "$12.6B", return1M: "+9%", return3M: "+60%", return6M: "+65%", revGrYoY: "+23%", opMargin: "17.5%", pS: "4.6x" },
        { ticker: "PEN", company: "Penumbra", mktCap: "$13.8B", return1M: "+14%", return3M: "+38%", return6M: "+50%", revGrYoY: "+18%", opMargin: "13.8%", pS: "10.3x" },
        { ticker: "GKOS", company: "Glaukos", mktCap: "$6.9B", return1M: "+6%", return3M: "+41%", return6M: "+22%", revGrYoY: "+38%", opMargin: "-12.3%", pS: "14.7x" },
        { ticker: "ESTA", company: "Establishment Labs", mktCap: "$2.0B", return1M: "-9%", return3M: "+45%", return6M: "+55%", revGrYoY: "+34%", opMargin: "-7.5%", pS: "10.5x" },
        { ticker: "NPCE", company: "NeuroPace", mktCap: "$564M", return1M: "+7%", return3M: "+59%", return6M: "+86%", revGrYoY: "+30%", opMargin: "-9.5%", pS: "5.9x" },
        { ticker: "CBLL", company: "Ceribell", mktCap: "$814M", return1M: "-0%", return3M: "+69%", return6M: "+39%", revGrYoY: "+31%", opMargin: "-64.8%", pS: "9.8x" },
        { ticker: "CERS", company: "Cerus", mktCap: "$499M", return1M: "+20%", return3M: "+65%", return6M: "+84%", revGrYoY: "+15%", opMargin: "-12.0%", pS: "2.5x" },
      ]
    },
    {
      name: "Healthcare Services & Facilities",
      stocks: [
        { ticker: "SPAC", company: "SPACS Group", mktCap: "$6.1B", return1M: "+13%", return3M: "+211%", return6M: "+214%", revGrYoY: "+31%", opMargin: "6.4%", pS: "1.2x" },
        { ticker: "ALHC", company: "Alignment Healthcare", mktCap: "$4.5B", return1M: "+12%", return3M: "+32%", return6M: "+68%", revGrYoY: "+44%", opMargin: "0.8%", pS: "1.3x" },
        { ticker: "LFST", company: "Lifestance Health", mktCap: "$2.8B", return1M: "+5%", return3M: "+44%", return6M: "+65%", revGrYoY: "+16%", opMargin: "2.2%", pS: "2.1x" },
        { ticker: "BKD", company: "Brookdale Senior Living", mktCap: "$2.9B", return1M: "+16%", return3M: "+41%", return6M: "+57%", revGrYoY: "+4%", opMargin: "2.3%", pS: "0.9x" },
        { ticker: "TALK", company: "Talkspace", mktCap: "$656M", return1M: "+12%", return3M: "+36%", return6M: "+59%", revGrYoY: "+25%", opMargin: "3.7%", pS: "3.2x" },
        { ticker: "CAH", company: "Cardinal Health", mktCap: "$50.5B", return1M: "+8%", return3M: "+39%", return6M: "+33%", revGrYoY: "+22%", opMargin: "1.2%", pS: "0.2x" },
      ]
    },
    {
      name: "Life Sciences Tools & CROs",
      stocks: [
        { ticker: "TWST", company: "Twist Bioscience", mktCap: "$2.5B", return1M: "+33%", return3M: "+35%", return6M: "+13%", revGrYoY: "+17%", opMargin: "-30.2%", pS: "6.6x" },
        { ticker: "FTRE", company: "Fortrea Holdings", mktCap: "$1.5B", return1M: "+3%", return3M: "+73%", return6M: "+237%", revGrYoY: "+4%", opMargin: "-0.5%", pS: "0.5x" },
        { ticker: "TNGX", company: "Tango Therapeutics", mktCap: "$1.8B", return1M: "+45%", return3M: "+42%", return6M: "+105%", revGrYoY: "+364%", opMargin: "26.2%", pS: "21.7x" },
      ]
    },
  ];

  const renderSection09 = () => {
    return (
      <section style={s.section}>
        <SectionHeader num="06" title="Biotech" subtitle="Regulatory constraint easing creates asymmetric opportunity" />

        {/* Main Themes */}
        {biotechThemes.map((theme) => (
          <div key={theme.id} style={s.mb48}>
            <TableHeader label="THEME" id={theme.id} title={theme.name} />
            <p style={{ ...s.body, marginBottom: '20px' }}>{theme.intro}</p>
            <SortableStockTable stocks={theme.stocks} showDescriptions={true} />
          </div>
        ))}

        {/* Other Healthcare Categories */}
        <div style={s.dividerTop}>
          <h3 style={{ ...s.h4, fontSize: '20px', marginBottom: '8px' }}>Other Healthcare</h3>
          <p style={{ ...s.body, marginBottom: '32px' }}>Additional stocks meeting growth criteria (revenue growth, margin expansion, 3M return &gt;25%) that do not fit neatly into the five themes above.</p>
          
          {otherHealthcareCategories.map((cat, idx) => (
            <div key={cat.name} style={{ marginBottom: '36px' }}>
              <h4 style={{ ...s.h4, fontSize: '16px', marginBottom: '12px' }}>{cat.name}</h4>
              <SortableStockTable stocks={cat.stocks} showDescriptions={false} />
            </div>
          ))}
        </div>

        {/* Data Source Note */}
        <div style={s.calloutNote}>
          <p style={{ ...s.captionSm, margin: 0 }}>
            <strong style={s.strong}>Data as of January 18, 2026.</strong> Rev Gr (YoY) = Revenue growth, year-over-year, most recent quarter vs same quarter prior year. "—" indicates data not available (typically pre-revenue companies). Stocks in Theme 5 (M&A Optionality) are drawn from Themes 2 and 3 based on platform depth and strategic value.
          </p>
        </div>
      </section>
    );
  };

  // ==========================================================================
  // METALS & MATERIALS THEMATIC DATA
  // ==========================================================================
  // Silver & Gold dedicated section data
  const silverGoldData = {
    gold: [
      { ticker: "NEM", company: "Newmont Corporation", mktCap: "$125B", return1M: "+16%", return3M: "+16%", return6M: "+96%", revGrYoY: "+17%", opMargin: "45.7%", pS: "5.9x", description: "World's largest gold miner. Scale matters when permitting risk rises faster than gold prices. Controls disproportionate share of tier-one assets." },
      { ticker: "AEM", company: "Agnico Eagle Mines", mktCap: "$99B", return1M: "+13%", return3M: "+27%", return6M: "+139%", revGrYoY: "+17%*", opMargin: "33%*", pS: "8.1x*", description: "Premium valuation justified by politically stable ounces, high reserve quality, and disciplined capital allocation." },
      { ticker: "GOLD", company: "Barrick Gold", mktCap: "$62B", return1M: "+8%", return3M: "+18%", return6M: "+72%", revGrYoY: "+12%", opMargin: "28%", pS: "4.8x", description: "Tier-one assets in Nevada and globally. Disciplined capital allocation and shareholder returns." },
      { ticker: "KGC", company: "Kinross Gold", mktCap: "$32B", return1M: "+22%", return3M: "+35%", return6M: "+118%", revGrYoY: "+25%", opMargin: "31%", pS: "5.2x", description: "Undervalued relative to peers. Strong production growth trajectory from Great Bear project." },
      { ticker: "FNV", company: "Franco-Nevada", mktCap: "$47B", return1M: "+10%", return3M: "+21%", return6M: "+84%", revGrYoY: "+77%*", opMargin: "72%*", pS: "24x*", description: "Purest expression of 'gold as infrastructure.' No operating risk, embedded optionality to price." },
      { ticker: "WPM", company: "Wheaton Precious Metals", mktCap: "$72B", return1M: "+9%", return3M: "+22%", return6M: "+78%", revGrYoY: "+38%", opMargin: "68%", pS: "18.5x", description: "Streaming model provides gold exposure without operating risk. Highest margins in the space." },
      { ticker: "RGLD", company: "Royal Gold", mktCap: "$16B", return1M: "+11%", return3M: "+19%", return6M: "+65%", revGrYoY: "+22%", opMargin: "58%", pS: "15.2x", description: "Royalty model with diversified portfolio. Lower risk, consistent cash flow growth." },
      { ticker: "USAU", company: "U.S. Gold Corp", mktCap: "$180M", return1M: "+45%", return3M: "+82%", return6M: "+195%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Exploration-stage gold company with U.S. assets. High optionality, development risk." },
      { ticker: "DC", company: "Dakota Gold", mktCap: "$420M", return1M: "+38%", return3M: "+55%", return6M: "+142%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Exploration in historic Homestake district. U.S.-based optionality play." },
    ],
    silver: [
      { ticker: "HL", company: "Hecla Mining", mktCap: "$17.8B", return1M: "+40%", return3M: "+74%", return6M: "+341%", revGrYoY: "+67%", opMargin: "38.2%", pS: "14.6x", description: "Largest U.S. silver producer. Dual exposure to silver and gold. Highest momentum in precious metals." },
      { ticker: "PAAS", company: "Pan American Silver", mktCap: "$22B", return1M: "+18%", return3M: "+25%", return6M: "+95%", revGrYoY: "+32%", opMargin: "24%", pS: "4.5x", description: "World's second-largest silver miner. Diversified asset base across the Americas." },
      { ticker: "AG", company: "First Majestic Silver", mktCap: "$8.2B", return1M: "+52%", return3M: "+68%", return6M: "+185%", revGrYoY: "+45%", opMargin: "18%", pS: "7.8x", description: "Pure-play silver producer focused on Mexico. High beta to silver prices." },
      { ticker: "CDE", company: "Coeur Mining", mktCap: "$14.5B", return1M: "+34%", return3M: "-2%", return6M: "+147%", revGrYoY: "+77%", opMargin: "33.6%", pS: "8.6x", description: "Silver/gold producer with strong margin expansion. Rochester expansion adds production capacity." },
      { ticker: "FSM", company: "Fortuna Silver Mines", mktCap: "$6.8B", return1M: "+28%", return3M: "+42%", return6M: "+125%", revGrYoY: "+35%", opMargin: "22%", pS: "3.2x", description: "Diversified precious metals producer. Operations in Latin America and West Africa." },
      { ticker: "WPM", company: "Wheaton Precious Metals", mktCap: "$72B", return1M: "+9%", return3M: "+22%", return6M: "+78%", revGrYoY: "+38%", opMargin: "68%", pS: "18.5x", description: "Streaming model provides silver and gold exposure without operating risk." },
      { ticker: "FNV", company: "Franco-Nevada", mktCap: "$47B", return1M: "+10%", return3M: "+21%", return6M: "+84%", revGrYoY: "+77%*", opMargin: "72%*", pS: "24x*", description: "Royalty/streaming exposure to silver through diversified portfolio." },
      { ticker: "MTA", company: "Metalla Royalty", mktCap: "$580M", return1M: "+22%", return3M: "+35%", return6M: "+88%", revGrYoY: "+42%", opMargin: "45%", pS: "12.5x", description: "Junior royalty company focused on precious metals. Growth-oriented portfolio." },
      { ticker: "MAG", company: "MAG Silver", mktCap: "$3.8B", return1M: "+12%", return3M: "+28%", return6M: "+85%", revGrYoY: "+45%", opMargin: "52%", pS: "12.2x", description: "44% stake in Juanicipio, one of the world's highest-grade silver mines." },
      { ticker: "AYASF", company: "Aya Gold & Silver", mktCap: "$2.1B", return1M: "+35%", return3M: "+48%", return6M: "+112%", revGrYoY: "+85%", opMargin: "42%", pS: "8.5x", description: "High-grade Zgounder mine in Morocco. Rapid production growth profile." },
    ],
  };

  const metalsData = {
    gold: [
      { ticker: "AEM", company: "Agnico Eagle Mines", mktCap: "$99B", return1M: "+13%", return3M: "+27%", return6M: "+139%", revGrYoY: "+17%*", opMargin: "33%*", pS: "8.1x*", description: "Premium valuation justified by politically stable ounces, high reserve quality, and disciplined capital allocation. Behaves less like a miner and more like a long-duration monetary asset with operating leverage." },
      { ticker: "NEM", company: "Newmont Corporation", mktCap: "$125B", return1M: "+16%", return3M: "+16%", return6M: "+96%", revGrYoY: "+17%", opMargin: "45.7%", pS: "5.9x", description: "Scale matters in a world where permitting risk rises faster than gold prices. Controls a disproportionate share of tier-one assets that cannot be replicated." },
      { ticker: "FNV", company: "Franco-Nevada", mktCap: "$47B", return1M: "+10%", return3M: "+21%", return6M: "+84%", revGrYoY: "+77%*", opMargin: "72%*", pS: "24x*", description: "Purest expression of 'gold as infrastructure.' No operating risk, embedded optionality to price, exposure to production growth without capital intensity." },
      { ticker: "HL", company: "Hecla Mining", mktCap: "$17.8B", return1M: "+40%", return3M: "+74%", return6M: "+341%", revGrYoY: "+67%", opMargin: "38.2%", pS: "14.6x", description: "Silver/gold producer with highest momentum in the group. Strong revenue growth and margin expansion." },
      { ticker: "CDE", company: "Coeur Mining", mktCap: "$14.5B", return1M: "+34%", return3M: "-2%", return6M: "+147%", revGrYoY: "+77%", opMargin: "33.6%", pS: "8.6x", description: "Mid-tier producer with strong fundamentals. Revenue and margins inflecting higher." },
      { ticker: "AUGO", company: "Aura Minerals", mktCap: "$5.0B", return1M: "+29%", return3M: "+52%", return6M: "+152%", revGrYoY: "+59%", opMargin: "54.0%", pS: "6.5x", description: "Highest operating margin in the group at 54%. Strong execution across Latin American assets." },
    ],
    copper: [
      { ticker: "FCX", company: "Freeport-McMoRan", mktCap: "$84.3B", return1M: "+24%", return3M: "+41%", return6M: "+34%", revGrYoY: "+2%", opMargin: "26.3%", pS: "3.3x", description: "Largest publicly traded copper producer. Grasberg is a generational asset. Operating leverage to copper price is extreme." },
      { ticker: "ERO", company: "Ero Copper", mktCap: "$3.1B", return1M: "+15%*", return3M: "+45%*", return6M: "+125%*", revGrYoY: "+20%*", opMargin: "25%*", pS: "3.5x*", description: "Brazilian copper producer with low costs and exploration upside. Recently upgraded by Goldman and Raymond James." },
    ],
    uranium: [
      { ticker: "CCJ", company: "Cameco", mktCap: "$51B", return1M: "+15%*", return3M: "+35%*", return6M: "+78%*", revGrYoY: "+21%*", opMargin: "18%*", pS: "15x*", description: "Vertically integrated uranium giant. 49% stake in Westinghouse provides reactor exposure. $80B government partnership is a game-changer." },
      { ticker: "UEC", company: "Uranium Energy Corp", mktCap: "$8.6B", return1M: "+47%", return3M: "+12%", return6M: "+134%", revGrYoY: "-100%", opMargin: "—", pS: "168.1x", description: "U.S.-focused uranium miner. Beneficiary of domestic supply chain push. Pre-production valuation." },
      { ticker: "UUUU", company: "Energy Fuels", mktCap: "$5.2B", return1M: "+56%", return3M: "+1%", return6M: "+166%", revGrYoY: "+338%", opMargin: "-151%", pS: "64.8x", description: "Uranium + rare earths exposure. Revenue inflecting sharply higher. Only U.S. rare earth processor." },
      { ticker: "EU", company: "enCore Energy", mktCap: "$581M", return1M: "+30%", return3M: "-12%", return6M: "+6%", revGrYoY: "-4%", opMargin: "-153%", pS: "13.2x", description: "Smaller U.S. uranium producer. Higher risk, higher beta to uranium prices." },
    ],
    lithium: [
      { ticker: "ALB", company: "Albemarle", mktCap: "$19.2B", return1M: "+24%", return3M: "+72%", return6M: "+133%", revGrYoY: "-3%", opMargin: "-2.3%", pS: "3.9x", description: "Largest lithium producer globally. Integrated brine and hard rock. Margins compressed but positioned for recovery." },
      { ticker: "SGML", company: "Sigma Lithium", mktCap: "$1.4B", return1M: "+20%", return3M: "+81%", return6M: "+100%", revGrYoY: "-35%", opMargin: "-24%", pS: "9.7x", description: "Brazilian hard rock lithium. Low-cost, ESG-friendly production. Beneficiary of price recovery." },
      { ticker: "IONR", company: "ioneer", mktCap: "$402M", return1M: "+41%", return3M: "+3%", return6M: "+108%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Rhyolite Ridge project in Nevada. Domestic lithium/boron. Development stage." },
    ],
    rareEarths: [
      { ticker: "MP", company: "MP Materials", mktCap: "$12.2B", return1M: "+29%", return3M: "-18%", return6M: "+18%", revGrYoY: "-15%", opMargin: "-98%", pS: "51.9x", description: "Only scaled rare earth mine and processor in the Western Hemisphere. Policy beneficiary." },
      { ticker: "UAMY", company: "U.S. Antimony", mktCap: "$1.2B", return1M: "+66%", return3M: "-34%", return6M: "+122%", revGrYoY: "+238%", opMargin: "-62%", pS: "30.9x", description: "Antimony is critical for defense and batteries. Extreme China dependence creates optionality." },
      { ticker: "CRML", company: "Critical Metals", mktCap: "$2.1B", return1M: "+123%", return3M: "-9%", return6M: "+330%", revGrYoY: "—", opMargin: "—", pS: "—", description: "Tantalum and other critical minerals. Highest 1M momentum in the space." },
    ],
    aluminum: [
      { ticker: "AA", company: "Alcoa", mktCap: "$15.6B", return1M: "+29%", return3M: "+62%", return6M: "+111%", revGrYoY: "+3%", opMargin: "1.8%", pS: "1.2x", description: "Global aluminum producer. Margins recovering. Cheap on P/S basis." },
      { ticker: "CENX", company: "Century Aluminum", mktCap: "$4.4B", return1M: "+48%", return3M: "+46%", return6M: "+144%", revGrYoY: "+17%", opMargin: "9.2%", pS: "1.9x", description: "U.S.-focused aluminum. Tariff beneficiary. Highest 1M momentum in aluminum." },
    ],
  };

  const renderSectionSilverGold = () => {
    // Chart data for visualization
    const chartData = [
      { year: 2020, gold: 25.75, silver: 46.37, sp500: 16.26 },
      { year: 2021, gold: -3.73, silver: -14.28, sp500: 26.89 },
      { year: 2022, gold: 2.08, silver: 4.58, sp500: -19.44 },
      { year: 2023, gold: 13.14, silver: -1.24, sp500: 24.23 },
      { year: 2024, gold: 27.20, silver: 22.34, sp500: 23.31 },
      { year: 2025, gold: 64.6, silver: 144.82, sp500: 16.39 },
    ];

    const width = 800;
    const height = 400;
    const padding = { top: 40, right: 120, bottom: 60, left: 70 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const minY = -30;
    const maxY = 160;
    const yScale = (val) => padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
    const xScale = (idx) => padding.left + (idx / (chartData.length - 1)) * chartWidth;

    const createPath = (key) => {
      return chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[key])}`).join(' ');
    };

    const seriesConfig = [
      { key: 'gold', color: '#FFD700', label: 'Gold', delay: 0 },
      { key: 'silver', color: '#C0C0C0', label: 'Silver', delay: 1 },
      { key: 'sp500', color: p.accent, label: 'S&P 500', delay: 2 },
    ];

    const getOpacity = (key) => {
      if (!chartVisibleSeries[key]) return 0;
      if (chartHoveredSeries === null) return 1;
      return chartHoveredSeries === key ? 1 : 0.2;
    };

    return (
      <section style={s.section}>
        <SectionHeader num="08" title="Silver & Gold" subtitle="Balance sheets, not cycles, are driving returns" />
        
        {/* Opening context */}
        <div style={s.mb32}>
          <p style={s.body}>From 2020 through 2025, silver rose roughly ~290%, gold gained approximately ~190%, and the S&P 500 advanced about ~110% on a price basis—meaning silver delivered nearly 3× the cumulative return of equities and gold outperformed stocks by roughly 80 percentage points over the same period. This is not typical behavior. Precious metals historically lag equities during strong risk-on markets and outperform mainly during crises. The 2020–2025 period breaks that pattern.</p>
        </div>

        <div style={s.mb32}>
          <p style={s.body}>In 2025, Morgan Stanley's Chief Investment Officer publicly advocated a revision of the traditional 60/40 portfolio toward a 60/20/20 allocation, maintaining broad equity exposure while splitting the defensive sleeve between fixed income and gold. This recommendation reflects concerns about bond diversification in a high policy uncertainty environment and positions gold as a potentially more resilient hedge in modern regimes. However, this view currently represents a prominent CIO's recommendation rather than a widely adopted institutional standard. That being said, this appears to be an emerging trend that is not going away.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <p style={s.body}>In 2025, silver dramatically outperformed gold, rising over 200% versus gold's roughly 70% gain, reflecting silver's higher beta and sensitivity to both industrial demand and speculative capital flows.</p>
        </div>

        {/* Animated Chart - inline, using parent state */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ ...s.tableLabel, marginBottom: '4px' }}>ANNUAL RETURNS</div>
              <div style={{ ...s.tableTitle, fontSize: '24px' }}>Gold vs Silver vs S&P 500 (2020–2025)</div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {seriesConfig.map(series => (
                <button
                  key={series.key}
                  onClick={() => setChartVisibleSeries(prev => ({ ...prev, [series.key]: !prev[series.key] }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                    border: `1px solid ${chartVisibleSeries[series.key] ? series.color : p.border}`,
                    backgroundColor: chartVisibleSeries[series.key] ? `${series.color}15` : 'transparent',
                    borderRadius: '4px', cursor: 'pointer', transition: 'all 0.25s ease',
                    opacity: chartVisibleSeries[series.key] ? 1 : 0.5,
                  }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: series.color, transition: 'transform 0.25s ease', transform: chartVisibleSeries[series.key] ? 'scale(1)' : 'scale(0.5)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: p.strong }}>{series.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <defs>
              {seriesConfig.map(series => (
                <linearGradient key={`grad-${series.key}`} id={`grad-${series.key}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={series.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={series.color} stopOpacity="1" />
                </linearGradient>
              ))}
            </defs>
            
            {/* Grid lines */}
            {[-20, 0, 20, 40, 60, 80, 100, 120, 140].map(val => (
              <g key={val}>
                <line x1={padding.left} y1={yScale(val)} x2={width - padding.right} y2={yScale(val)} stroke={p.border} strokeWidth="1" strokeDasharray={val === 0 ? "0" : "4,4"} />
                <text x={padding.left - 12} y={yScale(val)} textAnchor="end" alignmentBaseline="middle" fill={p.neutral} fontSize="13px" fontFamily="'Poppins', sans-serif">{val}%</text>
              </g>
            ))}
            
            {/* X-axis labels */}
            {chartData.map((d, i) => (
              <text key={d.year} x={xScale(i)} y={height - padding.bottom + 28} textAnchor="middle" fill={p.strong} fontSize="14px" fontWeight="600" fontFamily="'Poppins', sans-serif">{d.year}</text>
            ))}
            
            {/* Animated lines */}
            {seriesConfig.map(series => (
              <g key={series.key}>
                <path
                  d={createPath(series.key)}
                  fill="none"
                  stroke={`url(#grad-${series.key})`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    opacity: getOpacity(series.key),
                    strokeDasharray: '2000',
                    strokeDashoffset: chartAnimationPhase > series.delay ? 0 : 2000,
                    transition: `stroke-dashoffset 0.8s ease-out ${series.delay * 0.15}s, opacity 0.25s ease`,
                  }}
                  onMouseEnter={() => setChartHoveredSeries(series.key)}
                  onMouseLeave={() => setChartHoveredSeries(null)}
                />
              </g>
            ))}
            
            {/* Animated dots */}
            {chartAnimationPhase >= 4 && seriesConfig.map(series => (
              chartData.map((d, i) => (
                <circle
                  key={`${series.key}-${i}`}
                  cx={xScale(i)}
                  cy={yScale(d[series.key])}
                  r={chartHoveredSeries === series.key ? 7 : 5}
                  fill={series.color}
                  stroke={p.surface1}
                  strokeWidth="2"
                  style={{
                    opacity: getOpacity(series.key),
                    transform: `scale(${chartAnimationPhase >= 4 ? 1 : 0})`,
                    transformOrigin: `${xScale(i)}px ${yScale(d[series.key])}px`,
                    transition: `transform 0.3s ease ${i * 0.05}s, opacity 0.25s ease, r 0.15s ease`,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setChartHoveredSeries(series.key)}
                  onMouseLeave={() => setChartHoveredSeries(null)}
                >
                  <title>{series.label} {d.year}: {d[series.key] >= 0 ? '+' : ''}{d[series.key].toFixed(2)}%</title>
                </circle>
              ))
            ))}
            
            {/* Legend on right side */}
            {seriesConfig.map((series, i) => (
              <g key={`legend-${series.key}`} transform={`translate(${width - padding.right + 20}, ${padding.top + 30 + i * 35})`} style={{ cursor: 'pointer', opacity: getOpacity(series.key), transition: 'opacity 0.25s ease' }} onMouseEnter={() => setChartHoveredSeries(series.key)} onMouseLeave={() => setChartHoveredSeries(null)}>
                <line x1="0" y1="0" x2="25" y2="0" stroke={series.color} strokeWidth="3" />
                <circle cx="12" cy="0" r="4" fill={series.color} />
                <text x="32" y="0" alignmentBaseline="middle" fill={p.strong} fontSize="13px" fontWeight="500" fontFamily="'Poppins', sans-serif">{series.label}</text>
              </g>
            ))}
          </svg>
          
          <p style={{ ...s.captionSm, marginTop: '12px', fontStyle: 'italic' }}>Sources: Gold annual returns, silver annual returns, S&P 500 price return excluding dividends. Cumulative 2020–2025: Silver ~290%, Gold ~190%, S&P 500 ~110%.</p>
        </div>

        {/* Three Drivers Section */}
        <div style={{ ...s.mb48, paddingTop: '32px', borderTop: `2px solid ${p.border}` }}>
          <h4 style={{ ...s.subhead, marginBottom: '24px' }}>Why This Is Happening: Three Drivers</h4>
          
          <div style={s.mb32}>
            <h4 style={s.h4}>1) Balance sheets, not headlines, are setting the bid</h4>
            <p style={s.body}>Gold and silver are behaving less like short-term inflation hedges and more like monetary infrastructure in a world where the credibility of balance sheets matters. The clearest signal is official sector demand. Central banks added 1,045 tonnes of gold in 2024. To put that in perspective, global mined gold production was about 3,645 tonnes in 2024, so central banks absorbed roughly 29% of annual mine output. Relative to the total above-ground stock of gold (about 216,265 tonnes at end-2024), that annual central bank buying is about 0.5% of all gold that exists above ground. That is why this demand behaves like reserve reallocation, not cyclical trading.</p>
          </div>

          <div style={s.mb32}>
            <h4 style={s.h4}>2) Silver has become more industrial, without gaining elastic supply</h4>
            <p style={s.body}>Silver demand is increasingly tied to electrification and power intensity. At the same time, most silver supply is produced as a byproduct of other metals, so higher silver prices do not quickly translate into new dedicated production. This combination creates persistent tightness, but it also makes price more sensitive to marginal capital flows.</p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={s.h4}>3) Small markets move violently when flows change</h4>
            <p style={s.body}>Gold is deep and liquid. Silver is not. In thin markets, ETF flows, positioning, and trade policy uncertainty can dominate for long stretches. That is why silver often behaves like a leveraged expression of gold on the way up and on the way down.</p>
          </div>
        </div>

        {/* Silver Section */}
        <div style={{ marginBottom: '48px' }}>
          <TableHeader label="" id="I" title="Silver: Structural Tightness with High Volatility" />
          <p style={{ ...s.body, marginBottom: '16px' }}>Silver sits at the intersection of monetary metal, industrial input, and financial trading vehicle. This hybrid nature explains both long-term support and short-term instability. Structurally, silver benefits from electrification, rising power intensity, and constrained supply response. Cyclically, silver is prone to sharp reversals when speculative pressure exhausts itself.</p>
          <p style={{ ...s.body, marginBottom: '16px' }}>The practical implication for 2026 is two-track. The long-term case is supported by physical constraints. The short-term path is likely to be dominated by liquidity and positioning.</p>
          <p style={{ ...s.caption, marginBottom: '20px', fontStyle: 'italic' }}>Silver stocks to track: Primary producers, diversified producers with meaningful silver, and streaming and royalty exposure.</p>
          <SortableStockTable stocks={silverGoldData.silver} showDescriptions={true} />
        </div>

        {/* Gold Section */}
        <div style={{ marginBottom: '32px' }}>
          <TableHeader label="" id="II" title="Gold: Reserve Asset Behavior Is Changing the Clearing Price" />
          <p style={{ ...s.body, marginBottom: '16px' }}>Gold's current signal is more durable than silver's. It is increasingly behaving like neutral collateral in a fragmenting financial system, which helps explain why it can hold up even when traditional models (rates, CPI, risk-off headlines) provide mixed guidance.</p>
          <p style={{ ...s.body, marginBottom: '16px' }}>The central bank bid is the core difference in this cycle. When official sector demand runs at around a third of annual mine supply, and persists through higher prices, it changes the market's clearing dynamics. That does not eliminate drawdowns, but it can raise the probability that weakness is met by strategic buying rather than only by traders.</p>
          <p style={{ ...s.body, marginBottom: '16px' }}>For gold equities, this environment tends to reward existing, low-cost, long-life ounces in stable jurisdictions, and royalty and streaming models that capture gold upside with less exposure to operating inflation and execution risk.</p>
          <p style={{ ...s.caption, marginBottom: '20px', fontStyle: 'italic' }}>Gold stocks to track: Producers for operating leverage, royalty and streaming for quality exposure, and a small optionality sleeve for torque.</p>
          <SortableStockTable stocks={silverGoldData.gold} showDescriptions={true} />
        </div>

        {/* Data Source Note */}
        <div style={s.calloutNote}>
          <p style={{ ...s.captionSm, margin: 0 }}>
            <strong style={s.strong}>Data as of January 18, 2026.</strong> Rev Gr (YoY) = Revenue growth, year-over-year. *Indicates data sourced from web search. Streaming/royalty companies (FNV, WPM, RGLD) carry premium valuations reflecting lower operating risk. "—" indicates pre-revenue or development-stage companies.
          </p>
        </div>
      </section>
    );
  };

  const renderSection10 = () => {
    // Define metals categories as data
    const metalsCategories = [
      { num: 'I', title: 'Gold: Central Bank Accumulation and Balance-Sheet Regime Shift', 
        desc: 'Gold supply is effectively fixed on investor time horizons. Central bank demand reprices existing ounces. Value accrues to low-cost, jurisdictionally secure, already-producing assets, or to royalty structures that scale without capex.',
        stocks: metalsData.gold, 
        hook: 'Markets still anchor to gold as a cyclical hedge. Central bank accumulation suggests a balance-sheet regime shift, not a trade.' },
      { num: 'II', title: 'Copper: Electrification Bottleneck',
        desc: 'Copper demand from electrification (EVs, grid, renewables) is structural and accelerating. Supply response is constrained by 7-10 year mine development timelines, declining ore grades, and ESG/permitting friction. The deficit is widening.',
        stocks: metalsData.copper,
        hook: 'Copper trades like a cyclical commodity, but demand is secular. Grid investment alone requires multiples of current production.' },
      { num: 'III', title: 'Uranium: Nuclear Renaissance and Supply Deficit',
        desc: 'Nuclear is the only scalable, baseload, zero-carbon power source. AI data center demand is accelerating buildout. Supply is structurally short after a decade of underinvestment. The $80B U.S. government partnership with Cameco/Westinghouse/Brookfield signals policy commitment.',
        stocks: metalsData.uranium,
        hook: 'Uranium is priced for cyclical commodity dynamics, but this is infrastructure buildout. Long-term contracts are being signed at $150/lb ceilings — 2x current spot.' },
      { num: 'IV', title: 'Lithium: Battery Supply Chain Rebalancing',
        desc: 'Lithium oversupply crushed prices in 2023-24, but demand from EVs and grid storage is structural. Supply discipline is returning. The survivors with low costs and Western jurisdiction will capture the recovery.',
        stocks: metalsData.lithium,
        hook: 'Lithium equities priced for permanent oversupply. Any demand surprise or supply disruption rerates the group quickly.' },
      { num: 'V', title: 'Rare Earths & Strategic Minerals: Supply Chain Security',
        desc: 'China controls 60%+ of rare earth processing. Western governments are scrambling to diversify. Policy support (IRA, CHIPS Act, defense stockpiling) is creating demand regardless of price.',
        stocks: metalsData.rareEarths,
        hook: 'Strategic minerals are priced as commodities but increasingly behave as defense assets with policy floors.' },
      { num: 'VI', title: 'Aluminum: Energy Arbitrage and Tariff Protection',
        desc: 'Aluminum is energy-intensive to produce. Low-cost power = competitive moat. U.S. producers benefit from tariff protection and reshoring demand.',
        stocks: metalsData.aluminum,
        hook: 'U.S. aluminum trades at depressed multiples despite tariff protection and reshoring tailwinds.' },
    ];

    return (
      <section style={s.section}>
        <SectionHeader num="09" title="Strategic Metals & Materials" subtitle="When prices move in months and supply moves in decades" />
        
        <div style={s.mb32}>
          <h4 style={s.h4}>Why Metals Markets Repeatedly Reprice Instead of Cycling</h4>
          <p style={s.body}>Metals supply does not respond to price on investor time horizons. Across gold, copper, and rare earths, the defining feature is not scarcity headlines but time. New mines take roughly 10–20 years from discovery to production, often longer once permitting, environmental review, and processing complexity are included. Capital is rarely the binding constraint. Geology, chemistry, and jurisdiction are. This creates a persistent mismatch: markets price demand six to twenty-four months forward, while supply adjusts over decades. The result is nonlinear price behavior. Prices move first, projects move last, and in many cases never fully catch up. This structural lag is why these metals repeatedly reprice sharply rather than cycle smoothly.</p>
        </div>

        <div style={s.mb32}>
          <h4 style={s.h4}>Different Metals, Same Physics: Rigid Supply Meets Exploding Demand</h4>
          <p style={{ ...s.body, marginBottom: '12px' }}><strong style={s.strong}>Gold, copper, and the illusion of elastic production.</strong></p>
          <p style={s.body}>Gold and copper sit at opposite ends of demand, but share the same supply rigidity. Gold mine supply grows only ~1–2% per year, far slower than the growth of global liquidity during expansionary periods, while global ore grades have declined 30–40% over the past three decades, pushing cost curves higher even at elevated prices. Central banks buying 1,000+ tons annually in recent years marks a regime shift that revalues existing ounces rather than creates new ones. Copper, by contrast, is the backbone of electrification. Demand from grids, EVs, data centers, and defense systems is growing 2–3× faster than supply, while average copper grades have fallen from roughly 1.6% in the 1990s to ~0.6% today. Copper is not scarce in theory. It is scarce at economic grades, in permitted jurisdictions, within timeframes that matter. That is why copper equities tend to rerate before shortages are obvious.</p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h4 style={s.h4}>From "Commodities" to Strategic Infrastructure</h4>
          <p style={{ ...s.body, marginBottom: '12px' }}><strong style={s.strong}>Why policy is catching up to constraints markets still misprice.</strong></p>
          <p style={s.body}>Policy has begun to acknowledge what markets still misprice. The recent elevation of gold and copper to "critical mineral" status in the United States reflects a recognition that these are not just commodities but strategic inputs with fragile supply chains. Rare earths make this even clearer: China controls roughly 80–90% of separation and refining capacity and over 90% of high-performance magnet production, meaning pricing power accrues downstream, not at the mine. Across all these metals, when supply fails to scale, projects do not slow gradually. They stop. Delays shift value toward whoever controls marginal supply, processing, or already-permitted assets. Markets continue to value many of these companies like cyclical extractors. In reality, they behave more like constrained infrastructure. That gap between perception and physics is where mis-pricing tends to emerge.</p>
        </div>

        {/* Metals Categories - rendered from data */}
        {metalsCategories.map((cat, idx) => (
          <div key={cat.num} style={{ marginBottom: idx === metalsCategories.length - 1 ? '32px' : '48px' }}>
            <TableHeader label="" id={cat.num} title={cat.title} />
            <p style={{ ...s.body, marginBottom: '16px' }}>{cat.desc}</p>
            <SortableStockTable stocks={cat.stocks} showDescriptions={true} />
            <div style={s.calloutHook}>
              <p style={{ ...s.caption, margin: 0 }}><strong style={s.strong}>Mispricing hook:</strong> {cat.hook}</p>
            </div>
          </div>
        ))}

        {/* Data Source Note */}
        <div style={s.calloutNote}>
          <p style={{ ...s.captionSm, margin: 0 }}>
            <strong style={s.strong}>Data as of January 18, 2026.</strong> Rev Gr (YoY) = Revenue growth, year-over-year, most recent quarter vs same quarter prior year. "—" indicates data not available. *AEM, FNV, CCJ, ERO data sourced from web search (not in FactSet screen). All other data from FactSet.
          </p>
        </div>
      </section>
    );
  };

  const renderSection11 = () => renderDeepDiveSection(
    "12", "Physical Buildout", "Labor and capacity constraints across infrastructure",
    "Everything Being Built Requires Labor That's Already Allocated",
    <p>Data centers, grid upgrades, manufacturing reshoring, defense contracts — they all compete for the same skilled labor pool. Specialty contractors who can actually wire, plumb, and construct have pricing power. Low valuation (2.4x P/S), strong fundamentals (17% revenue growth).</p>,
    [
      { title: "Specialty Contracting", caption: "Electrical, mechanical, and building services contractors. Quality Score: 85.9.", data: stockData.contracting },
      { title: "Space & Satellites", caption: "Dual demand: commercial (LEO, imagery) and government (defense, NASA). Accelerating.", data: stockData.space,
        columns: [{ key: 'ticker', label: 'Ticker' }, { key: 'name', label: 'Company' }, { key: 'mktCap', label: 'Mkt Cap', align: 'center', render: fmtCap }, { key: 'revGr', label: 'Rev Gr', align: 'center', render: (v) => v > 100 ? '>100%' : <Pct v={v} /> }, { key: 'm1', label: '1M', align: 'center', render: (v) => <Pct v={v} /> }, { key: 'm6', label: '6M', align: 'center', render: (v) => <Pct v={v} /> }],
        note: "Note: Extreme P/S ratios reflect pre-revenue businesses. Moonshot positions, not core." },
    ]
  );

  const sectionContent = [
    renderCover(),
    renderSection01(),
    renderSection02(),
    renderSection03(),
    renderSection04(),
    renderSection05Theme(),
    renderSection09(),          // Biotech (06)
    renderSection06Theme(),     // Defense (07)
    renderSectionSilverGold(),  // Silver & Gold (08)
    renderSection10(),          // Metals & Materials (09)
    renderSection07Theme(),     // Power Generation (10)
    renderSection08(),          // Watchlist (11)
    renderSection11()           // Physical Buildout (12)
  ];

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>
      <div style={{ width: '320px', backgroundColor: p.strong, padding: '24px 0', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: p.action, marginBottom: '6px' }}>BROADSTREET</div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: p.surface1 }}>The Control Premium</div>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>January 2026</div>
        </div>
        <nav style={{ flex: 1 }}>
          {sections.map((sec, i) => (
            <button key={sec.id} onClick={() => setActiveSection(i)} style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', padding: '14px 24px', border: 'none', background: activeSection === i ? 'rgba(255,255,255,0.08)' : 'transparent', borderLeft: activeSection === i ? `3px solid ${p.action}` : '3px solid transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '17px', color: activeSection === i ? p.action : 'rgba(255,255,255,0.4)', fontWeight: 500, minWidth: '28px' }}>{sec.num || '◈'}</span>
              <span style={{ fontSize: '18px', color: activeSection === i ? p.surface1 : 'rgba(255,255,255,0.6)' }}>{sec.title}</span>
            </button>
          ))}
        </nav>
        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))} disabled={activeSection === 0} style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: activeSection === 0 ? 'rgba(255,255,255,0.3)' : p.surface1, fontSize: '16px', cursor: activeSection === 0 ? 'not-allowed' : 'pointer', borderRadius: '4px' }}>← Prev</button>
            <button onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))} disabled={activeSection === sections.length - 1} style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: activeSection === sections.length - 1 ? 'rgba(255,255,255,0.3)' : p.surface1, fontSize: '16px', cursor: activeSection === sections.length - 1 ? 'not-allowed' : 'pointer', borderRadius: '4px' }}>Next →</button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: p.surface1, minHeight: '100vh' }}>
        {sectionContent[activeSection]}
        <footer style={{ padding: '24px 48px', borderTop: `1px solid ${p.border}`, textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: p.neutral, marginBottom: '4px' }}>Broadstreet High Growth Sleeve · Leveraging Bottlenecks to Generate Alpha · January 2026</p>
          <p style={{ fontSize: '13px', color: p.border }}>Data as of January 18, 2026 · For internal use only</p>
        </footer>
      </div>
    </div>
  );
}
