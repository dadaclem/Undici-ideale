import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, ShieldCheck, Activity, Target } from 'lucide-react';

const COLORS = {
  bonds: '#3b82f6', stocks: '#10b981', dividends: '#8b5cf6', highYield: '#f59e0b',
  reit: '#ec4899', gold: '#eab308', commodities: '#14b8a6', momentum: '#6366f1',
  value: '#059669', quality: '#7c3aed', cash: '#94a3b8', bondLong: '#60a5fa', lowVol: '#34d399'
};

const portfolios = [
  { id: 1, positionNumber: 1, name: 'Sotto il materasso', subtitle: 'Estremo difensore - massima protezione', allocation: [{ name: 'Bond Gov Brevi', value: 50, color: COLORS.bonds }, { name: 'Oro', value: 25, color: COLORS.gold }, { name: 'Cash', value: 25, color: COLORS.cash }], rendimento: '1.5-2.5%', volatilita: 'Minima', orizzonte: 'Sempre disponibile', note: 'Protezione contro crisi sistemiche.' },
  { id: 2, positionNumber: 2, name: 'Io ce li ho sul libretto', subtitle: 'Zero pensieri, massima semplicità', allocation: [{ name: 'Bond Euro 3-5Y', value: 80, color: COLORS.bonds }, { name: 'Oro Fisico', value: 20, color: COLORS.gold }], rendimento: '2.5-3.5%', volatilita: 'Molto bassa', orizzonte: 'Breve termine', note: 'Solidità pura.' },
  { id: 3, positionNumber: 3, name: 'Ma io veramente avrei comprato una casa', subtitle: 'Sostituto del mattone', allocation: [{ name: 'Bond Euro Dist', value: 70, color: COLORS.bonds }, { name: 'Dividend Aristocrats', value: 30, color: COLORS.dividends }], rendimento: '3-4%', volatilita: 'Bassa', orizzonte: 'Medio termine', note: 'Flusso costante come un affitto.' },
  { id: 4, positionNumber: 4, name: 'Non ci sono più le mezze stagioni', subtitle: 'All Weather v2.1', allocation: [{ name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Azionario', value: 30, color: COLORS.stocks }, { name: 'Commodities', value: 10, color: COLORS.commodities }, { name: 'Oro', value: 20, color: COLORS.gold }], rendimento: '5-7%', volatilita: 'Media', orizzonte: '10-20 anni', note: 'Equilibrio in ogni scenario.' },
  { id: 5, positionNumber: 5, name: 'Una vita da mediano', subtitle: 'All-Weather moderno v2.2', allocation: [{ name: 'World Quality', value: 30, color: COLORS.quality }, { name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Bond Corti', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 15, color: COLORS.gold }, { name: 'Comm.', value: 10, color: COLORS.commodities }, { name: 'REITs', value: 5, color: COLORS.reit }], rendimento: '5-6%', volatilita: 'Media', orizzonte: 'Lungo termine', note: 'Corazza contro inflazione.' },
  { id: 6, positionNumber: 6, name: 'Chissà se ci andremo mai', subtitle: 'Accumulo pensionistico', allocation: [{ name: 'MSCI World', value: 50, color: COLORS.stocks }, { name: 'Small Cap', value: 15, color: COLORS.momentum }, { name: 'Emerging', value: 10, color: COLORS.stocks }, { name: 'Bond', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '6-8%', volatilita: 'Alta', orizzonte: '20-40 anni', note: 'Allocazione per giovani.' },
  { id: 7, positionNumber: 7, name: "Un po' cicala e un po' formica", subtitle: 'Risparmio flessibile', allocation: [{ name: 'Azionario Globale', value: 60, color: COLORS.stocks }, { name: 'Obbligazionario', value: 40, color: COLORS.bonds }], rendimento: '4-6%', volatilita: 'Media', orizzonte: '3-10 anni', note: 'Il classico bilanciato.' },
  { id: 8, positionNumber: 8, name: "L'ombrellone", subtitle: 'De-cumulo pianificato', allocation: [{ name: 'Cash', value: 20, color: COLORS.cash }, { name: 'Bond Ladder', value: 30, color: COLORS.bonds }, { name: 'Min Vol', value: 25, color: COLORS.lowVol }, { name: 'High Dividend', value: 25, color: COLORS.dividends }], rendimento: '4-5%', volatilita: 'Bassa-media', orizzonte: 'Silver Economy', note: 'Protezione prelievi.' },
  { id: 9, positionNumber: 9, name: 'Il fenomeno', subtitle: 'Ricerca Alpha fattoriale', allocation: [{ name: 'Obbligazionario', value: 20, color: COLORS.bonds }, { name: 'Momentum', value: 25, color: COLORS.momentum }, { name: 'Quality', value: 25, color: COLORS.quality }, { name: 'Dividend', value: 25, color: COLORS.dividends }, { name: 'Oro', value: 5, color: COLORS.gold }], rendimento: '7-9%', volatilita: 'Media-alta', orizzonte: 'Lungo termine', note: 'Tre fattori accademici.' },
  { id: 10, positionNumber: 10, name: 'Voglia di lavorare', subtitle: 'Cash flow perpetuo', allocation: [{ name: 'Bond', value: 30, color: COLORS.bonds }, { name: 'Dividend', value: 30, color: COLORS.dividends }, { name: 'High Yield', value: 25, color: COLORS.highYield }, { name: 'Momentum', value: 15, color: COLORS.momentum }], rendimento: '5-7%', volatilita: 'Media-alta', orizzonte: 'Lungo termine', note: 'Focus su rendita passiva.' },
  { id: 11, positionNumber: 11, name: "Cent'anni", subtitle: 'Buy & Hold purista', allocation: [{ name: 'MSCI World / VWCE', value: 100, color: COLORS.stocks }], rendimento: '7-9%', volatilita: 'Alta', orizzonte: '30-50+ anni', note: 'Massimizzazione eredità.' }
];

const playerPositions = {
  1: { top: '88%', left: '50%' },
  2: { top: '74%', left: '50%' }, 3: { top: '74%', left: '82%' }, 4: { top: '74%', left: '18%' },
  5: { top: '55%', left: '52%' }, 6: { top: '45%', left: '48%' }, 7: { top: '50%', left: '82%' }, 8: { top: '50%', left: '18%' },
  11: { top: '12%', left: '50%' }, 9: { top: '22%', left: '80%' }, 10: { top: '22%', left: '20%' }
};

export default function App() {
  const [selected, setSelected] = useState(portfolios[0]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">⚽ Squadra Finanziaria</h1>
          <p className="text-slate-500 font-medium">Strategia Modulo 3-4-3 | Gestione Patrimoniale</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CAMPO DA CALCIO */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[2/3] bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden">
              {/* Marcature campo */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute left-1/2 h-full w-0.5 bg-white" />
                <div className="absolute top-1/2 w-full h-0.5 bg-white" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 border-b-2 border-x-2 border-white" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-white" />
              </div>

              {portfolios.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{ position: 'absolute', top: playerPositions[p.id].top, left: playerPositions[p.id].left, transform: 'translate(-50%, -50%)' }}
                  className={`cursor-pointer w-24 md:w-28 bg-white/95 backdrop-blur-sm rounded-xl p-1 shadow-xl transition-all hover:scale-110 z-10 border-2 ${selected.id === p.id ? 'border-yellow-400 ring-4 ring-yellow-400/30' : 'border-blue-600'}`}
                >
                  <div className="text-center mb-1">
                    <span className="text-[10px] font-black text-blue-700">#{p.positionNumber}</span>
                  </div>
                  <div className="h-12 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={p.allocation} cx="50%" cy="50%" innerRadius={10} outerRadius={22} dataKey="value">
                          {p.allocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-[9px] font-black text-center uppercase leading-tight truncate px-1 pb-1 text-slate-800">
                    {p.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DETTAGLI SCHEDA */}
          <div className="lg:col-span-5 sticky top-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                   <span className="px-3 py-1 bg-blue-700 rounded-full text-[10px] font-bold tracking-widest uppercase">Scheda Tecnica #{selected.positionNumber}</span>
                </div>
                <h2 className="text-3xl font-black italic uppercase leading-tight">{selected.name}</h2>
                <p className="text-blue-100 italic text-sm mt-1 opacity-90">{selected.subtitle}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg"><TrendingUp className="text-emerald-600" size={20} /></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">Rendimento</p><p className="font-bold text-slate-800">{selected.rendimento}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg"><Activity className="text-orange-600" size={20} /></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">Volatilità</p><p className="font-bold text-slate-800">{selected.volatilita}</p></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Target size={14} /> Asset Allocation
                  </h3>
                  <div className="space-y-3">
                    {selected.allocation.map((a, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: a.color }} />
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{a.name}</span>
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-400">{a.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> Nota dell'allenatore
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed italic">{selected.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
