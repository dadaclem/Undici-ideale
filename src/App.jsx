import React, { useState } from 'react';
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
      { name: 'Bond Governativi Brevi 1-3Y', value: 50, color: COLORS.bonds },
      { name: 'Oro Fisico', value: 25, color: COLORS.gold },
      { name: 'Contanti/ETF monetario', value: 25, color: COLORS.cash }
    ],
    note: 'Protezione contro crisi sistemiche e traumi finanziari. Dormo tra due guanciali.'
  },
  {
    id: 2,
    category: 'DIFESA',
    position: 'Centrale di destra',
    positionNumber: 2,
    name: 'Io ce li ho sul libretto',
    subtitle: 'Zero pensieri, massima semplicità',
    allocation: [
      { name: 'Bond Euro 3-5Y Acc', value: 80, color: COLORS.bonds },
      { name: 'Oro Fisico', value: 20, color: COLORS.gold }
    ],
    versionePigra: null,
    note: 'Solidità pura con protezione extra che i libretti non hanno (oro).'
  },
  {
    id: 3,
    category: 'DIFESA',
    position: 'Centrale',
    positionNumber: 3,
    name: 'Non ci sono più le mezze stagioni',
    subtitle: 'All Weather',
    allocation: [
      { name: 'World Quality', value: 30, color: COLORS.quality },
      { name: 'Bond Lunghi 20-30Y', value: 20, color: COLORS.bondLong },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 15, color: COLORS.gold },
      { name: 'Commodities', value: 10, color: COLORS.commodities },
      { name: 'REITs', value: 5, color: COLORS.reit }
    ],
    versionePigra: '80% ETF tipo "Life Strategy" + 20% Commodities (approssimativo)',
    note: 'All Weather aggiornato.'
  },
  {
    id: 4,
    category: 'DIFESA',
    position: 'Centrale di sinistra',
    positionNumber: 4,
    name: 'Ma io veramente avrei comprato una casa',
    subtitle: 'Flussi di cassa regolari, sostituto del mattone',
    allocation: [
      { name: 'Bond Euro 3-5Y Dist', value: 70, color: COLORS.bonds },
      { name: 'Dividend Aristocrats Dist', value: 30, color: COLORS.dividends }
    ],
    versionePigra: 'REITs globali diversificati',
    note: 'Flusso costante come una rendita da affitto + apprezzamento del patrimonio.'
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
    versionePigra: 'World Quality + ETF tipo Global Aggregate Bond + Oro',
    note: 'Il ponte tra difesa e centrocampo. Quality + Dividend per crescita difensiva, barbell bonds (30% corti + 20% intermedi) per flessibilità, oro 10% per protezione.'
  },
  {
    id: 6,
    category: 'CENTROCAMPO',
    position: 'Regista',
    positionNumber: 6,
    name: "L'ombrellone",
    subtitle: 'De-cumulo pianificato per godersi il presente',
    allocation: [
      { name: 'Contanti (2 anni di spese)', value: 20, color: COLORS.cash },
      { name: 'Bond Ladder Dist (prossimi 5 anni)', value: 30, color: COLORS.bonds },
      { name: 'MSCI World Volatilità Minima', value: 25, color: COLORS.lowVol },
      { name: 'High Dividend Yield Dist', value: 25, color: COLORS.dividends }
    ],
    versionePigra: null,
    note: 'Equity Income: 50% azionario low vol + high dividend per protezione drawdown e cash flow. Bond ladder con scadenze distribuite per ricostituire liquidità automaticamente. Diminuisce il Sequence of Returns Risk.'
  },
  {
    id: 7,
    category: 'CENTROCAMPO',
    position: 'Mezzala',
    positionNumber: 7,
    name: "Un po' cicala e un po' formica",
    subtitle: 'Risparmio flessibile, possibili prelievi',
    allocation: [
      { name: 'Azionario globale diversificato', value: 60, color: COLORS.stocks },
      { name: 'Obbligazionario corto e intermedio', value: 40, color: COLORS.bonds }
    ],
    versionePigra: 'ETF tipo Life Strategy',
    note: 'Allocazione fissa 60/40. Il classico bilanciato. La composizione indicata è volutamente generica per privilegiare la semplicità dell\'allocazione, ma entrambi i comparti possono essere raffinati a seconda delle esigenze e la propensione al rischio personale.'
  },
  {
    id: 8,
    category: 'CENTROCAMPO',
    position: 'Trequartista',
    positionNumber: 8,
    name: 'Chissà se ci andremo mai',
    subtitle: 'Accumulo a lungo termine tipo pensione alternativa',
    allocation: [
      { name: 'MSCI World', value: 50, color: COLORS.stocks },
      { name: 'Small Cap', value: 15, color: COLORS.momentum },
      { name: 'Emerging Markets', value: 10, color: COLORS.stocks },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 5, color: COLORS.gold }
    ],
    versionePigra: 'ETF tipo Life Path a scadenza 30/40 anni',
    note: 'Allocazione iniziale. Il Sequence of Returns Risk richiede de-risking con riduzione di azioni e aumento bond progressivo. Oro 5% costante per protezione crisi durante accumulo.'
  },
  {
    id: 9,
    category: 'ATTACCO',
    position: 'Ala Destra',
    positionNumber: 9,
    name: 'Il fenomeno',
    subtitle: 'Se proprio vogliamo provare a battere il mercato',
    allocation: [
      { name: 'Obbligazionario', value: 20, color: COLORS.bonds },
      { name: 'Momentum Factor', value: 25, color: COLORS.momentum },
      { name: 'Quality Factor', value: 25, color: COLORS.quality },
      { name: 'Dividend Aristocrats', value: 25, color: COLORS.dividends },
      { name: 'Oro', value: 5, color: COLORS.gold }
    ],
    versionePigra: 'MSCI World Multifactor + Bond + Oro',
    note: 'Tre fattori equilibrati (Momentum, Quality, Dividend) con base obbligazionaria e oro per stabilità. Ricerca sovraperformance e resilienza.'
  },
  {
    id: 10,
    category: 'ATTACCO',
    position: 'Centravanti',
    positionNumber: 10,
    name: "Cent'anni",
    subtitle: 'Massimizzazione patrimonio, buy & hold purista',
    allocation: [
      { name: 'MSCI World / FTSE All-World', value: 100, color: COLORS.stocks }
    ],
    versionePigra: null,
    note: 'Potenza pura. Obiettivo: massimo capitale possibile a lungo termine. La strategia più semplice ed efficace.'
  },
  {
    id: 11,
    category: 'ATTACCO',
    position: 'Ala Sinistra',
    positionNumber: 11,
    name: 'Voglia di lavorare',
    subtitle: 'Cash flow perpetuo',
    allocation: [
      { name: 'Obbligazionario', value: 30, color: COLORS.bonds },
      { name: 'Dividend Aristocrats Dist', value: 30, color: COLORS.dividends },
      { name: 'High Yield Dist', value: 25, color: COLORS.highYield },
      { name: 'Momentum', value: 15, color: COLORS.momentum }
    ],
    versionePigra: null,
    note: 'Focus su distribuzione di reddito passivo a discapito della crescita del patrimonio.'
  }
];

export default function PortafogliModello() {
  const [selectedPortfolio, setSelectedPortfolio] = useState(portfolios[0]);
  const [viewMode, setViewMode] = useState('field');
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [canAccept, setCanAccept] = useState(false);
  const [countdown, setCountdown] = useState(5);

  React.useEffect(() => {
    if (!disclaimerAccepted) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanAccept(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [disclaimerAccepted]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 10) {
      setCanAccept(true);
    }
  };

  const acceptDisclaimer = () => setDisclaimerAccepted(true);

  if (!disclaimerAccepted) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', zIndex: 9999
      }}>
        <div style={{
          backgroundColor: 'white', borderRadius: '12px',
          maxWidth: '600px', width: '100%',
          maxHeight: '90vh', display: 'flex',
          flexDirection: 'column', overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#f59e0b', color: 'white', padding: '16px',
            borderTopLeftRadius: '12px', borderTopRightRadius: '12px', flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>⚠️</span>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                Informativa Importante
              </h2>
            </div>
          </div>

          <div
            style={{
              padding: '20px', fontSize: '14px', lineHeight: '1.6',
              overflowY: 'auto', maxHeight: '50vh', flex: '1'
            }}
            onScroll={handleScroll}
          >
            <p style={{ marginBottom: '10px' }}>
              <strong>Finalità didattica ed educativa:</strong> I contenuti presentati in questa applicazione hanno esclusivamente scopo informativo ed educativo nell'ambito dell'educazione finanziaria. Non costituiscono in alcun modo consulenza finanziaria personalizzata, sollecitazione all'investimento o raccomandazione di prodotti finanziari specifici.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Nessuna attività regolamentata:</strong> Pessoa non è un consulente finanziario autorizzato né presta servizi di investimento ai sensi del D.Lgs 58/1998 (TUF). Non gestiamo capitali, non riceviamo commissioni da intermediari e non abbiamo conflitti di interesse nella presentazione dei portafogli modello.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Portafogli modello teorici:</strong> Le allocazioni presentate sono esempi didattici a scopo illustrativo. Non tengono conto della tua situazione finanziaria personale, obiettivi, propensione al rischio, orizzonte temporale o vincoli specifici.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Rendimenti ipotetici:</strong> I rendimenti indicati sono stime basate su dati storici e proiezioni teoriche. I rendimenti passati non sono indicativi di quelli futuri. Ogni investimento comporta rischi, inclusa la possibile perdita totale o parziale del capitale.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Conformità volontaria:</strong> Pessoa si allinea volontariamente alle Linee Guida ESMA-Consob gennaio 2026 sulla comunicazione finanziaria, pur non essendo soggetto agli obblighi di legge previsti per gli intermediari autorizzati.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Responsabilità:</strong> L'utente è l'unico responsabile delle decisioni di investimento assunte. Pessoa non può essere ritenuta responsabile per eventuali perdite derivanti dall'utilizzo delle informazioni contenute in questa applicazione.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Raccomandazione:</strong> Prima di effettuare qualsiasi investimento, consulta un consulente finanziario abilitato che possa valutare la tua situazione specifica. Leggi sempre con attenzione la documentazione informativa degli strumenti finanziari (KIID, prospetto).
            </p>
            <p style={{ fontSize: '11px', color: '#999', marginTop: '20px', fontStyle: 'italic' }}>
              ↓ Scorri fino in fondo per abilitare il pulsante
            </p>
          </div>

          <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', flexShrink: 0 }}>
            <button
              onClick={acceptDisclaimer}
              disabled={!canAccept}
              style={{
                width: '100%', padding: '14px', fontSize: '15px',
                fontWeight: 'bold', borderRadius: '8px', border: 'none',
                backgroundColor: canAccept ? '#16a34a' : '#d1d5db',
                color: canAccept ? 'white' : '#6b7280',
                cursor: canAccept ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              {canAccept ? '✓ Ho letto e accetto' : 'Scorri per abilitare'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const SoccerField = () => {
    const positions = {
      portiere: [portfolios[0]],
      difesa: portfolios.slice(1, 4),
      centrocampo: portfolios.slice(4, 8),
      attacco: portfolios.slice(8, 11)
    };

    // Lookup by id for precise field positioning
    const byId = (id) => portfolios.find(p => p.id === id);

    const PlayerCard = ({ portfolio, size = 'normal', overridePosition = null, overrideName = null }) => (
      <div
        onClick={() => setSelectedPortfolio(portfolio)}
        className={`cursor-pointer rounded-lg border-2 bg-white p-2 shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
          selectedPortfolio.id === portfolio.id ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-blue-500'
        } w-36`}
      >
        <div className="mb-1 text-center">
          <div className="text-xs font-semibold text-gray-800">
            {overridePosition || portfolio.position}
          </div>
        </div>
        <div className="h-20 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                innerRadius={18}
                outerRadius={36}
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
        <div className="mt-1 text-[10px] text-center font-bold leading-tight text-gray-900">
          {overrideName || portfolio.name}
        </div>
      </div>
    );

    return (
      <div className="relative mx-auto w-full max-w-4xl rounded-lg bg-gradient-to-b from-green-600 to-green-700 p-8 shadow-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white"></div>
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"></div>
        </div>

        <div className="relative space-y-8">
          <div className="flex justify-center">
            <PlayerCard portfolio={positions.portiere[0]} />
          </div>
          <div className="flex justify-around px-4">
            <PlayerCard portfolio={byId(4)} size="small" />
            <PlayerCard portfolio={byId(3)} size="small" />
            <PlayerCard portfolio={byId(2)} size="small" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center">
              <PlayerCard portfolio={byId(5)} size="small" overridePosition="Mediano" />
            </div>
            <div className="flex justify-around w-full px-4">
              <PlayerCard portfolio={byId(6)} size="small" overridePosition="Regista" />
              <PlayerCard portfolio={byId(7)} size="small" />
            </div>
            <div className="flex justify-center">
              <PlayerCard portfolio={byId(8)} size="small" overridePosition="Trequartista" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-around w-full px-4">
              <PlayerCard portfolio={byId(9)} size="small" />
              <PlayerCard portfolio={byId(11)} size="small" />
            </div>
            <div className="flex justify-center">
              <PlayerCard portfolio={byId(10)} size="small" />
            </div>
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
      <div className="mb-3">
        <span className="text-xs font-semibold text-gray-500">
          {portfolio.category} - {portfolio.position}
        </span>
        <h3 className="text-lg font-bold text-gray-900">{portfolio.name}</h3>
        <p className="text-sm text-gray-600">{portfolio.subtitle}</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex-shrink-0" style={{ width: 100, height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                innerRadius={22}
                outerRadius={44}
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

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {portfolio.allocation.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5 min-w-0">
              <div
                className="flex-shrink-0 rounded-sm"
                style={{ width: 10, height: 10, backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-700 truncate">{entry.name}</span>
              <span className="text-xs font-semibold text-gray-900 flex-shrink-0 ml-auto">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {portfolio.note && (
        <p className="mt-3 text-xs text-gray-600 italic border-t pt-2">{portfolio.note}</p>
      )}
    </div>
  );

  const DetailView = ({ portfolio }) => (
    <div className="rounded-lg border-2 border-blue-500 bg-white p-6">
      <div className="mb-4">
        <span className="text-sm font-semibold text-blue-600">
          {portfolio.category} - {portfolio.position}
        </span>
        <h2 className="text-2xl font-bold text-gray-900">{portfolio.name}</h2>
        <p className="text-gray-600">{portfolio.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Allocazione Asset</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolio.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-col gap-1.5 md:hidden">
            {portfolio.allocation.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-shrink-0 rounded-sm" style={{ width: 12, height: 12, backgroundColor: entry.color }} />
                <span className="text-sm text-gray-700 flex-1">{entry.name}</span>
                <span className="text-sm font-bold text-gray-900">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <h3 className="mb-3 text-lg font-semibold">Composizione</h3>
          <div className="flex flex-col gap-2 mt-2">
            {portfolio.allocation.map((entry, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="truncate pr-2">{entry.name}</span>
                  <span className="font-bold flex-shrink-0">{entry.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-5 rounded-full transition-all"
                    style={{ width: `${entry.value}%`, backgroundColor: entry.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {(portfolio.note || portfolio.versionePigra) && (
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:justify-end">
          {portfolio.versionePigra && (
            <div className="rounded-lg bg-gray-50 p-4 md:w-1/2">
              <h4 className="mb-2 font-semibold text-gray-700">Versione Pigra</h4>
              <p className="text-sm text-gray-800">{portfolio.versionePigra}</p>
            </div>
          )}
          {portfolio.note && (
            <div className="rounded-lg bg-yellow-50 p-4 md:w-1/2">
              <h4 className="mb-2 font-semibold text-yellow-800">Note</h4>
              <p className="text-sm text-yellow-900">{portfolio.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const categories = ['PORTIERE', 'DIFESA', 'CENTROCAMPO', 'ATTACCO'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">⚽ Portafogli Modello</h1>
          <p className="text-lg text-gray-600">L'undici ideale</p>
          <p className="mt-2 text-xs text-gray-500">
            Finalità illustrativa - Non costituisce consulenza personalizzata
          </p>
        </div>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setViewMode('field')}
            className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
              viewMode === 'field' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⚽ Campo da Calcio
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 Vista Griglia
          </button>
          <button
            onClick={() => setViewMode('detail')}
            className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
              viewMode === 'detail' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🔍 Vista Dettaglio
          </button>
        </div>

        {viewMode === 'field' ? (
          <div className="space-y-6">
            <SoccerField />
            <DetailView portfolio={selectedPortfolio} />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">{category}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {portfolios
                    .filter((p) => p.category === category)
                    .map((portfolio) => (
                      <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {portfolios.map((portfolio) => (
                <button
                  key={portfolio.id}
                  onClick={() => setSelectedPortfolio(portfolio)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedPortfolio.id === portfolio.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {portfolio.name}
                </button>
              ))}
            </div>
            <DetailView portfolio={selectedPortfolio} />
          </div>
        )}

        <div className="mt-8 space-y-4 rounded-lg bg-white p-6 text-sm text-gray-600">
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Disclaimer</h3>
            <p>
              Il profilo di rischio associato alle posizioni in campo si riferisce a rendimenti e drawdown medi calcolati su serie storiche pubbliche e non costituiscono garanzia di risultati futuri. I modelli presentati hanno finalità didattica e illustrativa. L'investitore è
              responsabile della propria asset allocation e della selezione degli strumenti finanziari.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Note Metodologiche</h3>

            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">¹ Perché non usiamo bond inflation-linked come i BTP Italia?</h4>
              <p className="mt-1">
                Gli inflation-linked bonds presentano svantaggi significativi:
                (1) <strong>Tassazione</strong> - si paga il 12,5% sia sul coupon reale che sull'aggiustamento inflazione annuale,
                erodendo il vantaggio; (2) <strong>Rendimento reale più basso</strong> - se l'inflazione resta moderata,
                il rendimento totale è inferiore ai bond nominali; (3) <strong>Maggiore volatilità</strong> - i prezzi si muovono
                in base alle aspettative di inflazione futura; (4) <strong>Duration più lunga</strong> - tipicamente 7-15 anni
                vs 3-5 anni dei bond corti. Per protezione inflazione reale preferiamo commodities, oro e REIT nei portafogli
                che lo richiedono (es. "Non ci sono più le mezze stagioni"); (5) <strong>Liquidità inferiore</strong> - i bond inflation-linked 
                hanno un mercato secondario meno profondo con spread bid-ask più ampi. Per protezione inflazione preferiamo hard assets che 
                offrono diversificazione aggiuntiva e possono essere gestiti indipendentemente come commodities, oro e REIT.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700">² Perché bond lunghi (20-25 anni) nel portafoglio "Non ci sono più le mezze stagioni"?</h4>
              <p className="mt-1">
                I bond lunghi proteggono efficacemente dalla <strong>deflazione e dalle recessioni</strong>.
                Durante deflazione il valore reale dei pagamenti fissi aumenta, e le banche centrali tagliano i tassi
                verso zero. I bond lunghi beneficiano massimamente dal calo tassi grazie alla loro alta duration
                (~20 vs ~4 dei bond corti): un calo dell'1% nei tassi genera +20% di apprezzamento vs +4% dei bond corti.
                Questo effetto è stato evidente in Giappone (1990-2020) e durante la crisi 2008-2009 (bond lunghi USA +25%
                mentre azioni -22%). Nel portafoglio All Weather, i bond lunghi sono la protezione specifica per scenari
                deflazionistici/recessivi, mentre commodities e oro proteggono dall'inflazione.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
