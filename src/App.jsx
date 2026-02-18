import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, ChevronRight, Layout, TrendingUp, ShieldCheck } from 'lucide-react';

const App = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const portfolios = [
    { id: 1, name: 'Conto Deposito', risk: 'Molto Basso', color: '#22c55e', role: 'Portiere' },
    { id: 2, name: 'Io ce li ho sul libretto', risk: 'Basso', color: '#16a34a', role: 'Difensore Centrale' },
    { id: 3, name: 'Obbligazionario Governativo 1-3y', risk: 'Basso', color: '#16a34a', role: 'Terzino Destro' },
    { id: 4, name: 'Obbligazionario Governativo 3-5y', risk: 'Medio-Basso', color: '#84cc16', role: 'Terzino Sinistro' },
    { id: 5, name: 'Obbligazionario Corporate IG', risk: 'Medio', color: '#eab308', role: 'Mediano' },
    { id: 6, name: 'Chissà se ci andremo mai', risk: 'Medio', color: '#eab308', role: 'Regista' },
    { id: 7, name: 'Bilanciato 40/60', risk: 'Medio-Alto', color: '#f97316', role: 'Mezzala' },
    { id: 8, name: "L'Incassatore", risk: 'Medio-Alto', color: '#f97316', role: 'Trequartista' },
    { id: 9, name: 'Azionario World (MSCI ACWI)', risk: 'Alto', color: '#ef4444', role: 'Ala Destra' },
    { id: 10, name: 'Voglia di lavorare', risk: 'Alto', color: '#ef4444', role: 'Ala Sinistra' },
    { id: 11, name: 'Azionario Emerging Markets', risk: 'Molto Alto', color: '#b91c1c', role: 'Centravanti' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          LA SQUADRA FINANZIARIA
        </h1>
        <p className="text-gray-400 text-lg uppercase tracking-widest">Modulo 3-4-3 | Strategia di Investimento</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {portfolios.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPortfolio(p)}
            className="group relative bg-gray-800 border-2 border-gray-700 p-6 rounded-2xl hover:border-green-500 transition-all duration-300 text-left overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{p.role}</span>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors italic">{p.name}</h3>
            <p className="text-sm text-gray-400">Rischio: <span style={{ color: p.color }}>{p.risk}</span></p>
            <ChevronRight className="absolute bottom-4 right-4 text-gray-600 group-hover:text-green-500 transition-colors" />
          </button>
        ))}
      </div>

      {selectedPortfolio && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-full border-2 border-green-500 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black italic">{selectedPortfolio.name}</h2>
              <button onClick={() => setSelectedPortfolio(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-4 bg-gray-900 rounded-xl mb-6 border border-gray-700">
              <p className="text-green-400 font-mono">Dettagli tecnico-tattici in caricamento...</p>
            </div>
            <button 
              onClick={() => setSelectedPortfolio(null)}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-black font-black uppercase tracking-widest rounded-xl transition-colors"
            >
              Torna in Spogliatoio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
