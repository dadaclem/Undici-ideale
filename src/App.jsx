import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';

// --- CONFIGURAZIONE COLORI ---
const COLORS = {
  bonds: '#3b82f6', stocks: '#10b981', dividends: '#8b5cf6',
  highYield: '#f59e0b', reit: '#ec4899', gold: '#eab308',
  commodities: '#14b8a6', momentum: '#6366f1', value: '#059669',
  quality: '#7c3aed', cash: '#94a3b8', bondLong: '#60a5fa', lowVol: '#34d399'
};

// --- TUTTI GLI 11 PORTAFOGLI PESSOA ---
const portfolios = [
  { id: 1, category: 'PORTIERE', position: 'Portiere', positionNumber: 1, name: 'Sotto il materasso', subtitle: 'Massima protezione', allocation: [{ name: 'Bond Gov 1-3Y', value: 50, color: COLORS.bonds }, { name: 'Oro', value: 25, color: COLORS.gold }, { name: 'Cash', value: 25, color: COLORS.cash }], rendimento: '1.5-2.5%', volatilita: 'Minima', orizzonte: 'Breve', note: 'Protezione crisi.' },
  { id: 2, category: 'DIFESA', position: 'Difensore Centrale', positionNumber: 2, name: 'Libretto', subtitle: 'Semplicità', allocation: [{ name: 'Bond Euro 3-5Y', value: 80, color: COLORS.bonds }, { name: 'Oro', value: 20, color: COLORS.gold }], rendimento: '2.5-3.5%', volatilita: 'Molto bassa', orizzonte: 'Breve-Medio', note: 'Efficienza e basso costo.' },
  { id: 3, category: 'DIFESA', position: 'Terzino Destro', positionNumber: 3, name: 'Mattone Virtuale', subtitle: 'Rendita', allocation: [{ name: 'Bond Euro Dist', value: 70, color: COLORS.bonds }, { name: 'Dividend Aristocrats', value: 30, color: COLORS.dividends }], rendimento: '3-4%', volatilita: 'Bassa', orizzonte: 'Medio', note: 'Flusso di cassa costante.' },
  { id: 4, category: 'DIFESA', position: 'Terzino Sinistro', positionNumber: 4, name: 'Mezze Stagioni', subtitle: 'All Weather v2.2', allocation: [{ name: 'Quality', value: 30, color: COLORS.quality }, { name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 15, color: COLORS.gold }, { name: 'Commodities', value: 10, color: COLORS.commodities }, { name: 'REITs', value: 5, color: COLORS.reit }], rendimento: '5-7%', volatilita: 'Media', orizzonte: '10-20 anni', note: 'Resiliente a ogni scenario.' },
  { id: 5, category: 'CENTROCAMPO', position: 'Mediano', positionNumber: 5, name: 'Vita da mediano', subtitle: 'Conservativo', allocation: [{ name: 'Quality', value: 20, color: COLORS.quality }, { name: 'Dividendi', value: 20, color: COLORS.dividends }, { name: 'Bond Corti', value: 30, color: COLORS.bonds }, { name: 'Bond Intermedi', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 10, color: COLORS.gold }], rendimento: '4-5%', volatilita: 'Bassa-Media', orizzonte: '5-15 anni', note: 'Solido e costante.' },
  { id: 6, category: 'CENTROCAMPO', position: 'Regista', positionNumber: 6, name: 'Pensione Anticipata', subtitle: 'Accumulo', allocation: [{ name: 'World', value: 50, color: COLORS.stocks }, { name: 'Small Cap', value: 15, color: COLORS.momentum }, { name: 'EM', value: 10, color: COLORS.stocks }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '6-8%', volatilita: 'Alta', orizzonte: '20-40 anni', note: 'Motore di crescita.' },
  { id: 7, category: 'CENTROCAMPO', position: 'Mezzala', positionNumber: 7, name: '60/40 Classico', subtitle: 'Bilanciato', allocation: [{ name: 'Azionario', value: 60, color: COLORS.stocks }, { name: 'Obbligazionario', value: 40, color: COLORS.bonds }], rendimento: '4-6%', volatilita: 'Media', orizzonte: '3-10 anni', note: 'Il pilastro degli investimenti.' },
  { id: 8, category: 'CENTROCAMPO', position: 'Trequartista', positionNumber: 8, name: "L'ombrellone", subtitle: 'De-cumulo', allocation: [{ name: 'Cash', value: 20, color: COLORS.cash }, { name: 'Bond Ladder', value: 30, color: COLORS.bonds }, { name: 'Min Vol', value: 25, color: COLORS.lowVol }, { name: 'High Dividend', value: 25, color: COLORS.dividends }], rendimento: '4-5%', volatilita: 'Bassa-Media', orizzonte: 'Silver Economy', note: 'Per godersi i frutti.' },
  { id: 9, category: 'ATTACCO', position: 'Ala Destra', positionNumber: 9, name: 'Il fenomeno', subtitle: 'Ricerca Alpha', allocation: [{ name: 'Bonds', value: 20, color: COLORS.bonds }, { name: 'Momentum', value: 25, color: COLORS.momentum }, { name: 'Quality', value: 25, color: COLORS.quality }, { name: 'Dividendi', value: 25, color: COLORS.dividends }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '7-9%', volatilita: 'Media-Alta', note: 'Spinta aggressiva.' },
  { id: 10, category: 'ATTACCO', position: 'Ala Sinistra', positionNumber: 10, name: 'Reddito Passivo', subtitle: 'High Yield', allocation: [{ name: 'Bonds', value: 30, color: COLORS.bonds }, { name: 'Dividendi', value: 30, color: COLORS.dividends }, { name: 'High Yield', value: 25, color: COLORS.highYield }, { name: 'Momentum', value: 15, color: COLORS.momentum }], rendimento: '5-7%', volatilita: 'Media-Alta', note: 'Cash flow aggressivo.' },
  { id: 11, category: 'ATTACCO', position: 'Centravanti', positionNumber: 11, name: "Cent'anni", subtitle: 'Eredità', allocation: [{ name: 'VWCE', value: 100, color: COLORS.stocks }], rendimento: '7-9%', volatilita: 'Alta (max drawdown ~50-55%)', orizzonte: '30-50+ anni', note: 'Potenza pura. Obiettivo: massimo capitale finale.' }
];

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0]);
  const [viewMode, setViewMode] = useState('field');

  useEffect(() => {
    const accepted = localStorage.getItem('pessoa-disclaimer-accepted');
    if (accepted === 'true') setDisclaimerAccepted(true);

    // Backup: abilita il tasto dopo 5 secondi se lo scroll fallisce
    if (!disclaimerAccepted && secondsLeft > 0) {
      const timer = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (secondsLeft === 0) {
      setCanAccept(true);
    }
  }, [disclaimerAccepted, secondsLeft]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 2) setCanAccept(true);
  };

  const acceptDisclaimer = () => {
    localStorage.setItem('pessoa-disclaimer-accepted', 'true');
    setDisclaimerAccepted(true);
  };

  // --- COMPONENTI INTERNI ---
  const SoccerField = () => {
    const portiere = [portfolios[0]];
    const difesa = portfolios.slice(1, 4);
    const centrocampo = portfolios.slice(4, 8);
    const attacco = portfolios.slice(8, 11);

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
        <div className="text-[10px] text-center font-bold truncate">{portfolio.name}</div>
      </div>
    );

    return (
      <div className="relative mx-auto w-full max-w-4xl rounded-xl bg-gradient-to-b from-green-600 to-green-800 p-8 shadow-2xl border-4 border-white/30">
        <div className="relative space-y-8">
          <div className="flex justify-center"><PlayerCard portfolio={portiere[0]} /></div>
          <div className="flex justify-around">{difesa.map(p => <PlayerCard key={p.id} portfolio={p} size="small" />)}</div>
          <div className="grid grid-cols-4 gap-2">{centrocampo.map(p => <div key={p.id} className="flex justify-center"><PlayerCard portfolio={p} size="small" /></div>)}</div>
          <div className="flex justify-around">{attacco.map(p => <PlayerCard key={p.id} portfolio={p} size="small" />)}</div>
        </div>
      </div>
    );
  };

  const DetailView = ({ portfolio }) => (
    <div className="mt-8 rounded-xl border-2 border-blue-500 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900">{portfolio.name}</h2>
      <p className="text-blue-600 font-semibold mb-4 uppercase text-sm tracking-widest">{portfolio.subtitle}</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={portfolio.allocation} cx="50%" cy="50%" outerRadius={80} label={({name, value}) => `${name} ${value}%`} dataKey="value">
                {portfolio.allocation.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg space-y-3 border border-gray-100 text-sm">
          <p><strong>📊 Rendimento:</strong> {portfolio.rendimento}</p>
          <p><strong>📉 Volatilità:</strong> {portfolio.volatilita}</p>
          <p><strong>⏳ Orizzonte:</strong> {portfolio.orizzonte || 'Lungo termine'}</p>
          <p className="pt-4 border-t italic text-gray-600">"{portfolio.note}"</p>
        </div>
      </div>
    </div>
  );

  if (!disclaimerAccepted) {
    return (
      <div className="fixed inset-0 bg-slate-900/90 flex items-center justify-center z-50 p-4 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden">
          <div className="bg-teal-600 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">⚠️ Informativa PESSOA</h2>
            <p className="text-xs opacity-80 uppercase tracking-widest mt-1">Conformità ESMA 2026</p>
          </div>
          <div className="p-8 overflow-y-auto max-h-[50vh] text-sm leading-relaxed text-gray-600 space-y-4" onScroll={handleScroll}>
            <p className="font-bold text-gray-800 underline">Disclaimer Legale Marzo 2026</p>
            <p><strong>Finalità didattica:</strong> I contenuti hanno scopo informativo ed educativo. Non costituiscono consulenza finanziaria.</p>
            <p><strong>Rendimenti:</strong> I rendimenti passati non garantiscono quelli futuri. Ogni investimento comporta il rischio di perdita del capitale.</p>
            <p className="text-xs italic text-gray-400">Questo portale è parte del progetto di educazione finanziaria PESSOA.</p>
          </div>
          <div className="p-6 bg-slate-50 border-t border-slate-200">
             <button
              onClick={acceptDisclaimer}
              disabled={!canAccept}
              className={`w-full py-4 rounded-xl font-bold transition-all ${
                canAccept ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canAccept ? 'ACCETTO E PROSEGUO' : `SCORRI O ATTENDI ${secondsLeft}s`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter italic">Pessoa</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Labyrinth Strategy | Portafogli Modello 3-4-3</p>
        </header>

        <div className="flex justify-center gap-2 mb-8 bg-white p-1 rounded-full shadow-sm max-w-xs mx-auto">
           <button onClick={() => setViewMode('field')} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'field' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400'}`}>CAMPO</button>
           <button onClick={() => setViewMode('grid')} className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400'}`}>LISTA</button>
        </div>

        {viewMode === 'field' ? (
          <div className="animate-in fade-in duration-500">
            <SoccerField />
            <DetailView portfolio={selectedPortfolio} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolios.map(p => (
              <div key={p.id} onClick={() => {setSelectedPortfolio(p); setViewMode('field');}} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-400 cursor-pointer transition-all hover:shadow-md">
                <span className="text-[10px] font-bold text-blue-500 uppercase">{p.category}</span>
                <h3 className="font-bold text-gray-800">{p.positionNumber}. {p.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
