import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = {
  bonds: '#3b82f6', stocks: '#10b981', dividends: '#8b5cf6', highYield: '#f59e0b',
  reit: '#ec4899', gold: '#eab308', commodities: '#14b8a6', momentum: '#6366f1',
  value: '#059669', quality: '#7c3aed', cash: '#94a3b8', bondLong: '#60a5fa', lowVol: '#34d399'
};

const portfolios = [
  { id: 1, name: 'Sotto il materasso', positionNumber: 1, allocation: [{ name: 'Bond Gov Brevi', value: 50, color: COLORS.bonds }, { name: 'Oro', value: 25, color: COLORS.gold }, { name: 'Cash', value: 25, color: COLORS.cash }], rendimento: '1.5-2.5%', volatilita: 'Minima', orizzonte: 'Breve', note: 'Protezione totale.' },
  { id: 2, name: 'Io ce li ho sul libretto', positionNumber: 2, allocation: [{ name: 'Bond Euro', value: 80, color: COLORS.bonds }, { name: 'Oro', value: 20, color: COLORS.gold }], rendimento: '2.5-3.5%', volatilita: 'Molto bassa', orizzonte: 'Breve', note: 'Semplicità.' },
  { id: 3, name: 'Ma io veramente avrei comprato una casa', positionNumber: 3, allocation: [{ name: 'Bond Euro', value: 70, color: COLORS.bonds }, { name: 'Dividend', value: 30, color: COLORS.dividends }], rendimento: '3-4%', volatilita: 'Bassa', orizzonte: 'Medio', note: 'Rendita costante.' },
  { id: 4, name: 'Non ci sono più le mezze stagioni', positionNumber: 4, allocation: [{ name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Azionario', value: 30, color: COLORS.stocks }, { name: 'Oro', value: 15, color: COLORS.gold }, { name: 'Comm.', value: 10, color: COLORS.commodities }, { name: 'Bond Corti', value: 25, color: COLORS.bonds }], rendimento: '5-7%', volatilita: 'Media', orizzonte: 'Lungo', note: 'All Weather.' },
  { id: 5, name: 'Una vita da mediano', positionNumber: 5, allocation: [{ name: 'Quality', value: 30, color: COLORS.quality }, { name: 'Bond Lunghi', value: 20, color: COLORS.bondLong }, { name: 'Oro', value: 15, color: COLORS.gold }, { name: 'Comm.', value: 10, color: COLORS.commodities }, { name: 'Cash', value: 25, color: COLORS.cash }], rendimento: '5-6%', volatilita: 'Media', orizzonte: 'Lungo', note: 'Corazzato.' },
  { id: 6, name: 'Chissà se ci andremo mai', positionNumber: 6, allocation: [{ name: 'MSCI World', value: 50, color: COLORS.stocks }, { name: 'Small Cap', value: 15, color: COLORS.momentum }, { name: 'Bond', value: 20, color: COLORS.bonds }, { name: 'Oro', value: 15, color: COLORS.gold }], rendimento: '6-8%', volatilita: 'Alta', orizzonte: 'Pensionistico', note: 'Accumulo.' },
  { id: 7, name: "Un po' cicala e un po' formica", positionNumber: 7, allocation: [{ name: 'Azionario', value: 60, color: COLORS.stocks }, { name: 'Bond', value: 40, color: COLORS.bonds }], rendimento: '4-6%', volatilita: 'Media', orizzonte: '3-10 anni', note: 'Bilanciato 60/40.' },
  { id: 8, name: "L'ombrellone", positionNumber: 8, allocation: [{ name: 'Cash', value: 20, color: COLORS.cash }, { name: 'Bond Ladder', value: 30, color: COLORS.bonds }, { name: 'Min Vol', value: 25, color: COLORS.lowVol }, { name: 'High Div', value: 25, color: COLORS.dividends }], rendimento: '4-5%', volatilita: 'Bassa-media', orizzonte: 'Decumulo', note: 'Godersi il presente.' },
  { id: 9, name: 'Il fenomeno', positionNumber: 9, allocation: [{ name: 'Momentum', value: 25, color: COLORS.momentum }, { name: 'Quality', value: 25, color: COLORS.quality }, { name: 'Dividend', value: 25, color: COLORS.dividends }, { name: 'Bond/Oro', value: 25, color: COLORS.gold }], rendimento: '7-9%', volatilita: 'Alta', orizzonte: 'Lungo', note: 'Fattoriale.' },
  { id: 10, name: 'Voglia di lavorare', positionNumber: 10, allocation: [{ name: 'High Yield', value: 25, color: COLORS.highYield }, { name: 'Dividend', value: 30, color: COLORS.dividends }, { name: 'Renta Fija', value: 30, color: COLORS.bonds }, { name: 'Momentum', value: 15, color: COLORS.momentum }], rendimento: '5-7%', volatilita: 'Alta', orizzonte: 'Lungo', note: 'Reddito passivo.' },
  { id: 11, name: "Cent'anni", positionNumber: 11, allocation: [{ name: 'MSCI World', value: 100, color: COLORS.stocks }], rendimento: '7-9%', volatilita: 'Molto alta', orizzonte: 'Ereditario', note: 'Buy & Hold.' }
];

const playerPositions = {
  1:  { top: '88%', left: '50%' },
  2:  { top: '75%', left: '50%' }, 3: { top: '75%', left: '80%' }, 4: { top: '75%', left: '20%' },
  5:  { top: '55%', left: '50%' }, 6: { top: '45%', left: '50%' }, 7: { top: '50%', left: '82%' }, 8: { top: '50%', left: '18%' },
  11: { top: '12%', left: '50%' }, 9: { top: '22%', left: '80%' }, 10: { top: '22%', left: '20%' }
};

export default function App() {
  const [selected, setSelected] = useState(portfolios[0]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-900">
      <div className="mx-auto max-w-4xl text-center mb-8">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter text-blue-900">⚽ Squadra Finanziaria</h1>
        <p className="text-gray-500 text-sm">Formazione 3-4-3 | Seleziona un modulo per i dettagli</p>
      </div>

      {/* CAMPO DA CALCIO */}
      <div className="relative mx-auto w-full max-w-2xl aspect-[2/3] rounded-xl bg-gradient-to-b from-green-500 to-green-700 shadow-2xl border-4 border-white/30 overflow-hidden mb-12">
        <div className="absolute inset-0 pointer-events-none border-2 border-white/20 m-2">
           <div className="absolute left-1/2 h-full w-px bg-white/30" />
           <div className="absolute top-1/2 w-full h-px bg-white/30" />
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/30 rounded-full" />
        </div>

        {portfolios.map((p) => (
          <div key={p.id} onClick={() => setSelected(p)} style={{ position: 'absolute', top: playerPositions[p.id].top, left: playerPositions[p.id].left, transform: 'translate(-50%, -50%)' }}
            className={`cursor-pointer rounded-lg bg-white p-1 shadow-xl transition-all hover:scale-110 w-24 text-center border-2 ${selected.id === p.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-500'}`}>
            <div className="text-[10px] font-black text-blue-700 leading-none">#{p.positionNumber}</div>
            <div className="h-10 my-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={p.allocation} cx="50%" cy="50%" innerRadius={8} outerRadius={18} dataKey="value">
                  {p.allocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[9px] font-bold leading-tight uppercase truncate px-1">{p.name}</div>
          </div>
        ))}
      </div>

      {/* DETTAGLI PORTAFOGLIO */}
      <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-blue-900 uppercase italic">#{selected.positionNumber} - {selected.name}</h2>
          <p className="text-gray-500 font-medium italic">{selected.note}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
          <div><p className="text-gray-400 uppercase text-[10px] font-bold">Rendimento</p><p className="font-bold">{selected.rendimento}</p></div>
          <div><p className="text-gray-400 uppercase text-[10px] font-bold">Volatilità</p><p className="font-bold">{selected.volatilita}</p></div>
          <div className="col-span-2 mt-2">
             <p className="text-gray-400 uppercase text-[10px] font-bold mb-2">Composizione Asset</p>
             <div className="space-y-1">
               {selected.allocation.map((a, i) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }} />
                   <span className="text-xs font-bold w-full">{a.name}</span>
                   <span className="text-xs font-mono ml-auto">{a.value}%</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
