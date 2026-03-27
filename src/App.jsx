import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

// --- CONFIGURAZIONE COLORI ---
const COLORS = {
  bonds: '#3b82f6', stocks: '#10b981', dividends: '#8b5cf6',
  highYield: '#f59e0b', reit: '#ec4899', gold: '#eab308',
  commodities: '#14b8a6', momentum: '#6366f1', value: '#059669',
  quality: '#7c3aed', cash: '#94a3b8', bondLong: '#60a5fa', lowVol: '#34d399'
};

// --- DATI PORTAFOGLI PESSOA ---
const portfolios = [
  { id: 1, category: 'PORTIERE', position: 'Portiere', positionNumber: 1, name: 'Sotto il materasso', subtitle: 'Massima protezione', allocation: [{ name: 'Bond Gov 1-3Y', value: 50, color: COLORS.bonds }, { name: 'Oro', value: 25, color: COLORS.gold }, { name: 'Cash', value: 25, color: COLORS.cash }], rendimento: '1.5-2.5%', volatilita: 'Minima', orizzonte: 'Sempre disponibile', note: 'Protezione contro crisi sistemiche.' },
  { id: 2, category: 'DIFESA', position: 'Difensore Centrale', positionNumber: 2, name: 'Libretto', subtitle: 'Semplicità', allocation: [{ name: 'Bond Euro 3-5Y', value: 80, color: COLORS.bonds }, { name: 'Oro', value: 20, color: COLORS.gold }], rendimento: '2.5-3.5%', volatilita: 'Molto bassa', orizzonte: 'Breve termine', note: 'Solidità pura.' },
  { id: 3, category: 'DIFESA', position: 'Terzino Destro', positionNumber: 3, name: 'Mattone Virtuale', subtitle: 'Rendita', allocation: [{ name: 'Bond Euro Dist', value: 70, color: COLORS.bonds }, { name: 'Dividend Aristocrats', value: 30, color: COLORS.dividends }], rendimento: '3-4%', volatilita: 'Bassa', orizzonte: 'Medio termine', note: 'Flusso costante come un affitto.' },
  { id: 4, category: 'DIFESA', position: 'Terzino Sinistro', positionNumber: 4, name: 'Mezze Stagioni', subtitle: 'All Weather v2.2', allocation: [{ name: 'Quality', value: 30, color: COLORS.quality }, { name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 15, color: COLORS.gold }, { name: 'Commodities', value: 10, color: COLORS.commodities }, { name: 'REITs', value: 5, color: COLORS.reit }], rendimento: '5-7%', volatilita: 'Media', orizzonte: '10-20 anni', note: 'Resiliente a ogni scenario.' },
  { id: 5, category: 'CENTROCAMPO', position: 'Mediano', positionNumber: 5, name: 'Vita da mediano', subtitle: 'Conservativo', allocation: [{ name: 'Quality', value: 20, color: COLORS.quality }, { name: 'Dividendi', value: 20, color: COLORS.dividends }, { name: 'Bond Corti', value: 30, color: COLORS.bonds }, { name: 'Bond Intermedi', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 10, color: COLORS.gold }], rendimento: '4-5%', volatilita: 'Bassa-Media', orizzonte: '5-15 anni', note: 'Solido e flessibile.' },
  { id: 6, category: 'CENTROCAMPO', position: 'Regista', positionNumber: 6, name: 'Pensione Anticipata', subtitle: 'Accumulo', allocation: [{ name: 'World', value: 50, color: COLORS.stocks }, { name: 'Small Cap', value: 15, color: COLORS.momentum }, { name: 'EM', value: 10, color: COLORS.stocks }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '6-8%', volatilita: 'Alta', orizzonte: '20-40 anni', note: 'Crescita nel lungo periodo.' },
  { id: 7, category: 'CENTROCAMPO', position: 'Mezzala', positionNumber: 7, name: "60/40 Classico", subtitle: 'Bilanciato', allocation: [{ name: 'Azionario', value: 60, color: COLORS.stocks }, { name: 'Obbligazionario', value: 40, color: COLORS.bonds }], rendimento: '4-6%', volatilita: 'Media', orizzonte: '3-10 anni', note: 'Il pilastro bilanciato.' },
  { id: 8, category: 'CENTROCAMPO', position: 'Trequartista', positionNumber: 8, name: "L'ombrellone", subtitle: 'De-cumulo', allocation: [{ name: 'Cash', value: 20, color: COLORS.cash }, { name: 'Bond Ladder', value: 30, color: COLORS.bonds }, { name: 'Min Vol', value: 25, color: COLORS.lowVol }, { name: 'High Dividend', value: 25, color: COLORS.dividends }], rendimento: '4-5%', volatilita: 'Bassa-Media', orizzonte: 'Silver Economy', note: 'Per godersi i frutti.' },
  { id: 9, category: 'ATTACCO', position: 'Ala Destra', positionNumber: 9, name: 'Il fenomeno', subtitle: 'Ricerca Alpha', allocation: [{ name: 'Bonds', value: 20, color: COLORS.bonds }, { name: 'Momentum', value: 25, color: COLORS.momentum }, { name: 'Quality', value: 25, color: COLORS.quality }, { name: 'Dividendi', value: 25, color: COLORS.dividends }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '7-9%', volatilita: 'Media-Alta', orizzonte: 'Lungo termine', note: 'Spinta aggressiva.' },
  { id: 10, category: 'ATTACCO', position: 'Ala Sinistra', positionNumber: 10, name: 'Reddito Passivo', subtitle: 'High Yield', allocation: [{ name: 'Bonds', value: 30, color: COLORS.bonds }, { name: 'Dividendi', value: 30, color: COLORS.dividends }, { name: 'High Yield', value: 25, color: COLORS.highYield }, { name: 'Momentum', value: 15, color: COLORS.momentum }], rendimento: '5-7%', volatilita: 'Media-Alta', orizzonte: 'Lungo termine', note: 'Focus sul cash flow.' },
  { id: 11, category: 'ATTACCO', position: 'Centravanti', positionNumber: 11, name: "Cent'anni", subtitle: 'Eredità', allocation: [{ name: 'VWCE', value: 100, color: COLORS.stocks }], rendimento: '7-9%', volatilita: 'Alta', orizzonte: '30-50+ anni', note: 'Potenza pura ereditaria.' }
];

export default function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0]);
  const [viewMode, setViewMode] = useState('field');

  useEffect(() => {
    const accepted = localStorage.getItem('pessoa-disclaimer-accepted');
    if (accepted === 'true') setDisclaimerAccepted(true);

    if (!disclaimerAccepted && secondsLeft > 0) {
      const timer = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0) {
      setCanAccept(true);
    }
  }, [disclaimerAccepted, secondsLeft]);

  const SoccerField = () => (
    <div className="relative mx-auto w-full max-w-4xl rounded-xl bg-green-600 p-4 md:p-8 shadow-2xl border-4 border-white/30">
      <div className="space-y-4 md:space-y-8">
        <div className="flex justify-center"><PlayerCard portfolio={portfolios[0]} /></div>
        <div className="flex justify-around">{portfolios.slice(1, 4).map(p => <PlayerCard key={p.id} portfolio={p} size="small" />)}</div>
        <div className="grid grid-cols-4 gap-2">{portfolios.slice(4, 8).map(p => <div key={p.id} className="flex justify-center"><PlayerCard portfolio={p} size="small" /></div>)}</div>
        <div className="flex justify-around">{portfolios.slice(8, 11).map(p => <PlayerCard key={p.id} portfolio={p} size="small" />)}</div>
      </div>
    </div>
  );

  const PlayerCard = ({ portfolio, size = 'normal' }) => (
    <div
      onClick={() => setSelectedPortfolio(portfolio)}
      className={`cursor-pointer rounded-lg border-2 bg-white p-2 shadow-lg transition-all hover:scale-105 ${
        selectedPortfolio.id === portfolio.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-500'
      } ${size === 'small' ? 'w-24' : 'w-32'}`}
    >
      <div className="text-center mb-1">
        <div className="text-xs font-bold text-blue-600">{portfolio.positionNumber}</div>
      </div>
      <div className={size === 'small' ? 'h-12' : 'h-16'}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={portfolio.allocation} innerRadius={10} outerRadius={25} dataKey="value">
              {portfolio.allocation.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-[10px] text-center font-bold truncate text-gray-900">{portfolio.name}</div>
    </div>
  );

  const DetailView = ({ portfolio }) => (
    <div className="mt-8 rounded-xl border-2 border-blue-500 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900">{portfolio.name}</h2>
      <p className="text-blue-600 font-semibold mb-4 uppercase text-xs">{portfolio.subtitle}</p>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="h-48 md:h-64">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={portfolio.allocation} cx="50%" cy="50%" outerRadius={70} label={({name}) => name} dataKey="value">
                {portfolio.allocation.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </Pie
