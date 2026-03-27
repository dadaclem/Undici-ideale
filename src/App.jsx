import { useState, useEffect } from 'react';

function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canAccept, setCanAccept] = useState(false);

  useEffect(() => {
    // Controlla se già accettato in passato
    const accepted = localStorage.getItem('pessoa-disclaimer-accepted');
    if (accepted === 'true') {
      setDisclaimerAccepted(true);
    }
  }, []);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setCanAccept(true); // Abilita bottone solo dopo scroll completo
    }
  };

  const acceptDisclaimer = () => {
    localStorage.setItem('pessoa-disclaimer-accepted', 'true');
    setDisclaimerAccepted(true);
  };

  if (!disclaimerAccepted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-green-600 text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold">⚠️ Informativa Importante</h2>
            <p className="text-sm mt-2 opacity-90">
              Prima di accedere ai portafogli modello, ti preghiamo di leggere attentamente
            </p>
          </div>

          {/* Scrollable Content */}
          <div 
            className="p-6 overflow-y-auto flex-1 text-sm leading-relaxed"
            onScroll={handleScroll}
          >
            <h3 className="font-bold text-lg mb-3 text-gray-800">Disclaimer Legale</h3>
            
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Finalità didattica ed educativa:</strong> I contenuti presentati in questa applicazione 
                hanno esclusivamente scopo informativo ed educativo nell'ambito dell'educazione finanziaria. 
                Non costituiscono in alcun modo consulenza finanziaria personalizzata, sollecitazione 
                all'investimento o raccomandazione di prodotti finanziari specifici.
              </p>

              <p>
                <strong>Nessuna attività regolamentata:</strong> Pessoa non è un consulente finanziario 
                autorizzato né presta servizi di investimento ai sensi del D.Lgs 58/1998 (TUF). 
                Non gestiamo capitali, non riceviamo commissioni da intermediari e non abbiamo conflitti 
                di interesse nella presentazione dei portafogli modello.
              </p>

              <p>
                <strong>Portafogli modello teorici:</strong> Le allocazioni presentate sono esempi didattici 
                a scopo illustrativo. Non tengono conto della tua situazione finanziaria personale, 
                obiettivi, propensione al rischio, orizzonte temporale o vincoli specifici.
              </p>

              <p>
                <strong>Rendimenti ipotetici:</strong> I rendimenti indicati sono stime basate su dati 
                storici e proiezioni teoriche. I rendimenti passati non sono indicativi di quelli futuri. 
                Ogni investimento comporta rischi, inclusa la possibile perdita totale o parziale del capitale.
              </p>

              <p>
                <strong>Conformità volontaria:</strong> Pessoa si allinea volontariamente alle Linee Guida 
                ESMA-Consob gennaio 2026 sulla comunicazione finanziaria,pur non essendo soggetto agli obblighi 
                di legge previsti per gli intermediari autorizzati.
              </p>

              <p>
                <strong>Responsabilità:</strong> L'utente è l'unico responsabile delle decisioni di investimento 
                assunte. Pessoa non può essere ritenuta responsabile per eventuali perdite derivanti 
                dall'utilizzo delle informazioni contenute in questa applicazione.
              </p>

              <p>
                <strong>Raccomandazione:</strong> Prima di effettuare qualsiasi investimento, consulta un 
                consulente finanziario abilitato che possa valutare la tua situazione specifica. Leggi sempre 
                con attenzione la documentazione informativa degli strumenti finanziari (KIID, prospetto).
              </p>

              <p className="text-xs text-gray-500 mt-6">
                Ultimo aggiornamento: Marzo 2026
              </p>
            </div>
          </div>

          {/* Footer con bottone */}
          <div className="border-t p-6 bg-gray-50 rounded-b-lg">
            <div className="flex items-start space-x-3 mb-4">
              <input 
                type="checkbox" 
                id="confirm-read"
                className="mt-1"
                checked={canAccept}
                disabled
              />
              <label htmlFor="confirm-read" className="text-sm text-gray-600">
                {canAccept 
                  ? "✓ Hai letto l'informativa completa" 
                  : "Scorri fino in fondo per abilitare il pulsante"}
              </label>
            </div>
            
            <button
              onClick={acceptDisclaimer}
              disabled={!canAccept}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                canAccept
                  ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canAccept ? 'Ho letto e prendo visione' : 'Leggi l\'informativa completa'}
            </button>
            
            <p className="text-xs text-center text-gray-500 mt-3">
              Cliccando confermi di aver letto e compreso l'informativa
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Resto della tua app (portafogli)
  return (
    <div>
      {/* Tua app normale qui */}
    </div>
  );
}import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = {
  bonds: '#3b82f6',
  stocks: '#10b981',
  dividends: '#8b5cf6',
  highYield: '#f59e0b',
  reit: '#ec4899',
  gold: '#eab308',
  commodities: '#14b8a6',
  momentum: '#6366f1',
  value: '#059669',
  quality: '#7c3aed',
  cash: '#94a3b8',
  bondLong: '#60a5fa',
  lowVol: '#34d399'
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
    versionePigra: 'ETF monetario + ETC oro',
    rendimento: '1.5-2.5% annuo',
    volatilita: 'Minima (max drawdown ~2-3%)',
    orizzonte: 'Sempre disponibile',
    note: 'Protezione contro crisi sistemiche e traumi finanziari. Dormo tra due guanciali.'
  },
  {
    id: 2,
    category: 'DIFESA',
    position: 'Difensore Centrale',
    positionNumber: 2,
    name: 'Io ce li ho sul libretto',
    subtitle: 'Zero pensieri, massima semplicità',
    allocation: [
      { name: 'Bond Euro 3-5Y Acc', value: 80, color: COLORS.bonds },
      { name: 'Oro Fisico', value: 20, color: COLORS.gold }
    ],
    versionePigra: null,
    rendimento: '2.5-3.5% annuo',
    volatilita: 'Molto bassa (max drawdown ~3-5%)',
    orizzonte: 'Breve-medio termine',
    note: 'Solidità pura con protezione extra che i vecchi libretti non avevano'
  },
  {
    id: 3,
    category: 'DIFESA',
    position: 'Terzino Destro',
    positionNumber: 3,
    name: 'Ma io veramente avrei comprato una casa',
    subtitle: 'Flussi di cassa regolari, sostituto del mattone',
    allocation: [
      { name: 'Bond Euro 3-5Y Dist', value: 70, color: COLORS.bonds },
      { name: 'Dividend Aristocrats', value: 30, color: COLORS.dividends }
    ],
    versionePigra: 'REIT globali diversificati',
    rendimento: '3-4% distribuito',
    volatilita: 'Bassa (max drawdown ~8-12%)',
    orizzonte: 'Medio termine',
    note: 'Flusso costante come una rendita da affitto'
  },
  {
    id: 4,
    category: 'DIFESA',
    position: 'Terzino Sinistro',
    positionNumber: 4,
    name: 'Non ci sono più le mezze stagioni',
    subtitle: 'All Weather v2.2 - Il mediano corazzato definitivo',
    allocation: [
      { name: 'World Quality (IWQU)', value: 30, color: COLORS.quality },
      { name: 'Bond Lunghi 20-30Y', value: 20, color: COLORS.bondLong },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 15, color: COLORS.gold },
      { name: 'Commodities', value: 10, color: COLORS.commodities },
      { name: 'REITs', value: 5, color: COLORS.reit }
    ],
    versionePigra: '80% Vanguard LifeStrategy 40% + 20% Commodities (approssimativo)',
    rendimento: '5-7% annuo',
    volatilita: 'Media (~9-11% annua)',
    orizzonte: '10-20 anni',
    note: 'v2.2 Barbell + Gold Heavy: Barbell bonds puro (20% lunghi + 20% corti, ZERO intermedi). Quality per crescita resiliente. Hard assets 30% (15% oro + 10% commodities + 5% REIT) = corazza reale contro inflazione.'
  },
  {
    id: 5,
    category: 'CENTROCAMPO',
    position: 'Mediano',
    positionNumber: 5,
    name: 'Una vita da mediano',
    subtitle: 'Conservativo ma non immobile - 40/50/10',
    allocation: [
      { name: 'World Quality', value: 20, color: COLORS.quality },
      { name: 'Dividend Aristocrats Acc', value: 20, color: COLORS.dividends },
      { name: 'Bond Corti 1-3Y', value: 30, color: COLORS.bonds },
      { name: 'Bond Intermedi 5-7Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 10, color: COLORS.gold }
    ],
    versionePigra: 'iShares World Quality + iShares Global Aggregate Bond + Oro',
    rendimento: '4-5% annuo',
    volatilita: 'Bassa-media (~8-10% annua)',
    orizzonte: '5-15 anni',
    note: 'Il ponte tra difesa e centrocampo. Quality + Dividend per crescita difensiva, barbell bonds (30% corti + 20% intermedi) per flessibilità, oro 10% per protezione.'
  },
  {
    id: 6,
    category: 'CENTROCAMPO',
    position: 'Regista',
    positionNumber: 6,
    name: 'Chissà se ci andremo mai',
    subtitle: 'Accumulo pensionistico 20-40 anni con de-risking automatico',
    allocation: [
      { name: 'MSCI World', value: 50, color: COLORS.stocks },
      { name: 'Small Cap', value: 15, color: COLORS.momentum },
      { name: 'Emerging Markets', value: 10, color: COLORS.stocks },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 5, color: COLORS.gold }
    ],
    versionePigra: 'iShares LifePath 2055/2060 (senza oro, de-risking automatico)',
    rendimento: '6-8% annuo (de-risking progressivo)',
    volatilita: 'Alta inizialmente (75% azioni), decresce nel tempo',
    orizzonte: '20-40 anni',
    note: 'Allocazione iniziale per giovani. De-risking automatico riduce azioni e aumenta bond con l\'età. Oro 5% costante per protezione crisi durante accumulo.'
  },
  {
    id: 7,
    category: 'CENTROCAMPO',
    position: 'Mezzala',
    positionNumber: 7,
    name: "Un po' cicala e un po' formica",
    subtitle: 'Risparmio flessibile, possibili prelievi 3-10 anni',
    allocation: [
      { name: 'Azionario Globale', value: 60, color: COLORS.stocks },
      { name: 'Obbligazionario', value: 40, color: COLORS.bonds }
    ],
    versionePigra: 'Vanguard LifeStrategy 60%',
    rendimento: '4-6% annuo',
    volatilita: 'Media (max drawdown ~15-20%)',
    orizzonte: '3-10 anni',
    note: 'Allocazione FISSA 60/40 (no de-risking). Il classico bilanciato.'
  },
  {
    id: 8,
    category: 'CENTROCAMPO',
    position: 'Trequartista',
    positionNumber: 8,
    name: "L'ombrellone",
    subtitle: 'De-cumulo pianificato per godersi il presente',
    allocation: [
      { name: 'Cash (2 anni spese)', value: 20, color: COLORS.cash },
      { name: 'Bond Ladder 2026-2030', value: 30, color: COLORS.bonds },
      { name: 'MSCI World Min Vol', value: 25, color: COLORS.lowVol },
      { name: 'High Dividend Yield', value: 25, color: COLORS.dividends }
    ],
    versionePigra: null,
    rendimento: '4-5% + prelievi programmati',
    volatilita: 'Bassa-media (~11-12% annua)',
    orizzonte: 'Silver Economy / pensionamento attivo',
    note: 'Equity Income: 50% low vol + 50% high dividend per protezione drawdown e cash flow. Bond ladder con scadenze distribuite (iBonds 2026-2030) ricostituisce cash automaticamente. Elimina Sequence of Returns Risk.'
  },
  {
    id: 9,
    category: 'ATTACCO',
    position: 'Ala Destra',
    positionNumber: 9,
    name: 'Il fenomeno',
    subtitle: 'Ricerca alpha attraverso fattori accademici',
    allocation: [
      { name: 'Obbligazionario', value: 20, color: COLORS.bonds },
      { name: 'Momentum Factor', value: 25, color: COLORS.momentum },
      { name: 'Quality Factor', value: 25, color: COLORS.quality },
      { name: 'Dividend Aristocrats', value: 25, color: COLORS.dividends },
      { name: 'Oro', value: 5, color: COLORS.gold }
    ],
    versionePigra: 'iShares Edge MSCI World Multifactor + Bond + Oro',
    rendimento: '7-9% annuo (teorico)',
    volatilita: 'Media-alta (max drawdown ~30-35%)',
    orizzonte: 'Lungo termine',
    note: 'Tre fattori equilibrati (Momentum, Quality, Dividend) con base obbligazionaria e oro per stabilità. Ricerca sovraperformance con rischio controllato.'
  },
  {
    id: 10,
    category: 'ATTACCO',
    position: 'Ala Sinistra',
    positionNumber: 10,
    name: 'Voglia di lavorare',
    subtitle: 'Cash flow perpetuo, pensionamento anticipato',
    allocation: [
      { name: 'Renta Fija', value: 30, color: COLORS.bonds },
      { name: 'Dividend Aristocrats', value: 30, color: COLORS.dividends },
      { name: 'High Yield', value: 25, color: COLORS.highYield },
      { name: 'Momentum', value: 15, color: COLORS.momentum }
    ],
    versionePigra: null,
    rendimento: '5-7% distribuito',
    volatilita: 'Media-alta (max drawdown ~20-25%)',
    orizzonte: 'Lungo termine',
    note: 'Focus su distribuzione di reddito passivo. Cash flow > capital gain.'
  },
  {
    id: 11,
    category: 'ATTACCO',
    position: 'Centravanti',
    positionNumber: 11,
    name: "Cent'anni",
    subtitle: 'Massimizzazione patrimonio eredità, buy & hold purista',
    allocation: [
      { name: 'MSCI World / VWCE', value: 100, color: COLORS.stocks }
    ],
    versionePigra: null,
    rendimento: '7-9% annuo',
    volatilita: 'Alta (max drawdown ~50-55%)',
    orizzonte: '30-50+ anni',
    note: 'Potenza pura. Obiettivo: massimo capitale finale per eredità. La strategia più semplice ed efficace.'
  }
];

export default function PortafogliModello() {
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0]);
  const [viewMode, setViewMode] = useState('field');

  const SoccerField = () => {
    const positions = {
      portiere: [portfolios[0]],
      difesa: portfolios.slice(1, 4),
      centrocampo: portfolios.slice(4, 8),
      attacco: portfolios.slice(8, 11)
    };

    const PlayerCard = ({ portfolio, size = 'normal' }) => (
      <div
        onClick={() => setSelectedPortfolio(portfolio)}
        className={`cursor-pointer rounded-lg border-2 bg-white p-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
          selectedPortfolio.id === portfolio.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-500'
        } ${size === 'small' ? 'w-24' : 'w-32'}`}
      >
        <div className="mb-1 text-center">
          <div className={`${size === 'small' ? 'text-xs' : 'text-sm'} font-bold text-blue-600`}>
            {portfolio.positionNumber}
          </div>
          <div className={`${size === 'small' ? 'text-[10px]' : 'text-xs'} font-semibold text-gray-800`}>
            {portfolio.position}
          </div>
        </div>
        <div className={`${size === 'small' ? 'h-12' : 'h-16'} overflow-hidden`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                innerRadius={size === 'small' ? 10 : 15}
                outerRadius={size === 'small' ? 20 : 28}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolio.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className={`mt-1 ${size === 'small' ? 'text-[9px]' : 'text-[10px]'} text-center font-bold leading-tight text-gray-900`}>
          {portfolio.name}
        </div>
      </div>
    );

    return (
      <div className="relative mx-auto w-full max-w-4xl rounded-lg bg-gradient-to-b from-green-600 to-green-700 p-8 shadow-2xl">
        {/* Field markings */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white"></div>
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"></div>
        </div>

        <div className="relative space-y-8">
          {/* PORTIERE */}
          <div className="flex justify-center">
            <PlayerCard portfolio={positions.portiere[0]} />
          </div>

          {/* DIFESA (3) */}
          <div className="flex justify-around px-8">
            {positions.difesa.map((p) => (
              <PlayerCard key={p.id} portfolio={p} size="small" />
            ))}
          </div>

          {/* CENTROCAMPO (4) */}
          <div className="grid grid-cols-4 gap-4">
            {positions.centrocampo.map((p) => (
              <div key={p.id} className="flex justify-center">
                <PlayerCard portfolio={p} size="small" />
              </div>
            ))}
          </div>

          {/* ATTACCO (3) */}
          <div className="flex justify-around px-8">
            {positions.attacco.map((p) => (
              <PlayerCard key={p.id} portfolio={p} size="small" />
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm font-bold text-white">
          FORMAZIONE: 3-4-3
        </div>
      </div>
    );
  };

  const PortfolioCard = ({ portfolio }) => (
    <div
      onClick={() => setSelectedPortfolio(portfolio)}
      className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
        selectedPortfolio.id === portfolio.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="mb-2">
        <span className="text-xs font-semibold text-gray-500">
          {portfolio.category} - {portfolio.position}
        </span>
        <h3 className="text-lg font-bold text-gray-900">{portfolio.name}</h3>
        <p className="text-sm text-gray-600">{portfolio.subtitle}</p>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolio.allocation}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolio.allocation.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-1 text-xs">
        <div><strong>Rendimento:</strong> {portfolio.rendimento}</div>
        <div><strong>Volatilità:</stron
