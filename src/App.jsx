import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

// --- CONFIGURAZIONE COLORI E DATI ---
const COLORS = {
  bonds: '#3b82f6', stocks: '#10b981', dividends: '#8b5cf6',
  highYield: '#f59e0b', reit: '#ec4899', gold: '#eab308',
  commodities: '#14b8a6', momentum: '#6366f1', value: '#059669',
  quality: '#7c3aed', cash: '#94a3b8', bondLong: '#60a5fa', lowVol: '#34d399'
};

const portfolios = [
  {
    id: 1,
    category: 'PORTIERE',
    position: 'Portiere',
    positionNumber: 1,
    name: 'Sotto il materasso',
    subtitle: 'Estremo difensore - massima protezione',
    allocation: [
      { name: 'Bond Gov Brevi 1-3Y', value: 50, color: COLORS.bonds },
      { name: 'Oro Fisico', value: 25, color: COLORS.gold },
      { name: 'Cash/Monetario', value: 25, color: COLORS.cash }
    ],
    rendimento: '1.5-2.5% annuo',
    volatilita: 'Minima (max drawdown ~2-3%)',
    orizzonte: 'Sempre disponibile',
    note: 'Protezione contro crisi sistemiche e traumi finanziari. Dormo tra due guanciali.'
  },
  // ... (Incolla qui tutti gli altri oggetti dei portafogli che hai nel tuo codice)
  {
    id: 11,
    category: 'ATTACCO',
    position: 'Centravanti',
    positionNumber: 11,
    name: "Cent'anni",
    subtitle: 'Massimizzazione patrimonio eredità',
    allocation: [{ name: 'MSCI World / VWCE', value: 100, color: COLORS.stocks }],
    rendimento: '7-9% annuo',
    volatilita: 'Alta (max drawdown ~50-55%)',
    orizzonte: '30-50+ anni',
    note: 'Potenza pura. Obiettivo: massimo capitale finale.'
  }
];

function App() {
  // --- STATO PER IL DISCLAIMER ---
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  
  // --- STATO PER L'APP DEI PORTAFOGLI ---
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0]);
  const [viewMode, setViewMode] = useState('field');

  useEffect(() => {
    const accepted = localStorage.getItem('pessoa-disclaimer-accepted');
    if (accepted === 'true') {
      setDisclaimerAccepted(true);
    }
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Tolleranza di 1px per arrotondamenti browser
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setCanAccept(true);
    }
  };

  const acceptDisclaimer = () => {
    localStorage.setItem('pessoa-disclaimer-accepted', 'true');
    setDisclaimerAccepted(true);
  };

  // --- SOTTO-COMPONENTI (FOOTER, CAMPO, ECC.) ---
  const SoccerField = () => {
    // Logica per dividere i portafogli per zona
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
          <div className="text-[10px] font-semibold text-gray-500 uppercase">{portfolio.position}</div>
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
      <div className="relative mx-auto w-full max-w-4xl rounded-xl bg-gradient-to-b from-green-600 to-green-800 p-8 shadow-2xl">
        <div className="absolute inset-0 border-2 border-white/20 m-4 rounded-lg pointer-events-none"></div>
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
      <p className="text-blue-600 font-semibold mb-4">{portfolio.subtitle}</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={portfolio.allocation} cx="50%" cy="50%" outerRadius={80} label={({name}) => name} dataKey="value">
                {portfolio.allocation.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p><strong>Rendimento:</strong> {portfolio.rendimento}</p>
          <p><strong>Volatilità:</strong> {portfolio.volatilita}</p>
          <p><strong>Orizzonte:</strong> {portfolio.orizzonte}</p>
          <p className="text-sm italic text-gray-700">"{portfolio.note}"</p>
        </div>
      </div>
    </div>
  );

  // --- RENDERING CONDIZIONALE ---
  if (!disclaimerAccepted) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold">⚠️ Informativa Importante</h2>
            <p className="opacity-90">Leggi attentamente prima di accedere a PESSOA</p>
          </div>
          <div className="p-6 overflow-y-auto flex-1 text-sm leading-relaxed text-gray-700" onScroll={handleScroll}>
            <h3 className="font-bold text-lg mb-2">Disclaimer Legale Marzo 2026</h3>
            <p className="mb-4"><strong>Finalità didattica:</strong> I contenuti hanno esclusivamente scopo informativo ed educativo...</p>
            <p className="mb-4"><strong>Nessuna attività regolamentata:</strong> Pessoa non è un consulente finanziario autorizzato...</p>
            <p className="mb-4"><strong>Rendimenti:</strong> I rendimenti passati non garantiscono quelli futuri...</p>
            <p className="text-xs text-gray-400">Pessoa si allinea alle Linee Guida ESMA-Consob 2026.</p>
          </div>
          <div className="border-t p-6 bg-gray-50">
             <button
              onClick={acceptDisclaimer}
              disabled={!canAccept}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                canAccept ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canAccept ? 'Ho letto e accetto' : 'Scorri per leggere tutto'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Pessoa</h1>
          <p className="text-gray-600 font-medium">Formazione 3-4-3 | Portafogli Modello</p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
           <button onClick={() => setViewMode('field')} className={`px-6 py-2 rounded-full font-bold ${viewMode === 'field' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow'}`}>Campo</button>
           <button onClick={() => setViewMode('grid')} className={`px-6 py-2 rounded-full font-bold ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow'}`}>Lista</button>
        </div>

        {viewMode === 'field' ? (
          <>
            <SoccerField />
            <DetailView portfolio={selectedPortfolio} />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map(p => (
              <div key={p.id} onClick={() => {setSelectedPortfolio(p); setViewMode('field');}} className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all">
                <h3 className="font-bold">{p.positionNumber}. {p.name}</h3>
                <p className="text-xs text-gray-500 uppercase">{p.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
