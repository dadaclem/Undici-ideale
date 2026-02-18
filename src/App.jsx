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
    subtitle: 'All Weather v2.1 - protezione ogni scenario macro',
    allocation: [
      { name: 'Bond Lunghi 20-25Y', value: 20, color: COLORS.bondLong },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Azionario Globale', value: 30, color: COLORS.stocks },
      { name: 'Bond Intermedi 5-7Y', value: 5, color: COLORS.bonds },
      { name: 'Commodities', value: 10, color: COLORS.commodities },
      { name: 'Oro', value: 15, color: COLORS.gold }
    ],
    versionePigra: '80% Vanguard LifeStrategy 40% + 20% Commodities (approssimativo)',
    rendimento: '5-7% annuo',
    volatilita: 'Media (~7-9% annua)',
    orizzonte: '10-20 anni',
    note: 'Equilibrio totale. Funziona in ogni regime economico: crescita, recessione, inflazione, deflazione. Versione 2.1 con oro 15% per maggiore protezione crisi sistemiche.'
  },
  {
    id: 5,
    category: 'CENTROCAMPO',
    position: 'Mediano',
    positionNumber: 5,
    name: 'Una vita da mediano',
    subtitle: 'All-Weather moderno v2.2 - Il mediano corazzato',
    allocation: [
      { name: 'World Quality (IWQU)', value: 30, color: COLORS.quality },
      { name: 'Bond Lunghi 20-30Y', value: 20, color: COLORS.bondLong },
      { name: 'Bond Corti 1-3Y', value: 20, color: COLORS.bonds },
      { name: 'Oro', value: 15, color: COLORS.gold },
      { name: 'Commodities', value: 10, color: COLORS.commodities },
      { name: 'REITs', value: 5, color: COLORS.reit }
    ],
    versionePigra: 'iShares World Quality + iShares Global Aggregate Bond + Oro + Commodities',
    rendimento: '5-6% annuo',
    volatilita: 'Media (~9-11% annua)',
    orizzonte: '10-20 anni',
    note: 'v2.2 Definitive: Barbell bonds puro (20% lunghi + 20% corti, zero intermedi). World Quality per crescita resiliente. Hard assets 30% (oro 15% + commodities 10% + REIT 5%) = corazza reale contro inflazione.'
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
        <div><strong>Volatilità:</strong> {portfolio.volatilita}</div>
      </div>
    </div>
  );

  const DetailView = ({ portfolio }) => (
    <div className="rounded-lg border-2 border-blue-500 bg-white p-6">
      <div className="mb-4">
        <span className="text-sm font-semibold text-blue-600">
          {portfolio.category} - {portfolio.position} #{portfolio.positionNumber}
        </span>
        <h2 className="text-2xl font-bold text-gray-900">{portfolio.name}</h2>
        <p className="text-gray-600">{portfolio.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">Allocazione Asset</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolio.allocation}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
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

        <div>
          <h3 className="mb-3 text-lg font-semibold">Composizione</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={portfolio.allocation} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6">
                {portfolio.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold text-gray-700">Caratteristiche</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Rendimento atteso:</strong> {portfolio.rendimento}</li>
            <li><strong>Volatilità:</strong> {portfolio.volatilita}</li>
            <li><strong>Orizzonte:</strong> {portfolio.orizzonte}</li>
            {portfolio.versionePigra && (
              <li><strong>Versione pigra:</strong> {portfolio.versionePigra}</li>
            )}
          </ul>
        </div>

        {portfolio.note && (
          <div className="rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-2 font-semibold text-yellow-800">Note</h4>
            <p className="text-sm text-yellow-900">{portfolio.note}</p>
          </div>
        )}
      </div>
    </div>
  );

  const categories = ['PORTIERE', 'DIFESA', 'CENTROCAMPO', 'ATTACCO'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">⚽ Portafogli Modello</h1>
          <p className="text-lg text-gray-600">La tua squadra di investimenti - Formazione 3-4-3</p>
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
                  {portfolio.positionNumber}. {portfolio.name}
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
              I rendimenti storici citati sono calcolati su serie storiche pubbliche e non costituiscono garanzia
              di risultati futuri. I modelli presentati hanno finalità didattica e illustrativa. L'investitore è
              responsabile della propria asset allocation e della selezione degli strumenti finanziari.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Note Metodologiche</h3>
            
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700">¹ Perché bond a breve scadenza (3-5 anni) e non inflation-linked?</h4>
              <p className="mt-1">
                Gli inflation-linked bonds (TIPS europei) presentano svantaggi significativi per investitori italiani: 
                (1) <strong>Tassazione penalizzante</strong> - si paga il 26% sia sul coupon reale che sull'aggiustamento inflazione annuale, 
                erodendo il vantaggio; (2) <strong>Rendimento reale più basso</strong> - se l'inflazione resta moderata, 
                il rendimento totale è inferiore ai bond nominali; (3) <strong>Maggiore volatilità</strong> - i prezzi si muovono 
                in base alle aspettative di inflazione futura; (4) <strong>Duration più lunga</strong> - tipicamente 7-15 anni 
                vs 3-5 anni dei bond corti. Per protezione inflazione reale preferiamo commodities, oro e REIT nei portafogli 
                che lo richiedono (es. "Non ci sono più le mezze stagioni").
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
