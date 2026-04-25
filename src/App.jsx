import { useState } from "react";
import FileUpload from "./components/FileUpload";

const COLORS = [
  { bar: "bg-indigo-500",  text: "text-indigo-600"  },
  { bar: "bg-emerald-500", text: "text-emerald-600" },
  { bar: "bg-amber-500",   text: "text-amber-600"   },
  { bar: "bg-rose-500",    text: "text-rose-600"    },
  { bar: "bg-sky-500",     text: "text-sky-600"     },
  { bar: "bg-violet-500",  text: "text-violet-600"  },
];

const Icon = ({ path, className }) => (
  <svg className={`fill-none shrink-0 ${className}`} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

const ICONS = {
  barChart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  checkSmall: "M5 13l4 4L19 7",
  upload: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
};

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-5">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
        <Icon path={ICONS.barChart} className="w-5 h-5 text-white" />
      </div>
      <div className="text-center">
        <p className="text-slate-900 font-semibold">Analyzing your transactions…</p>
        <p className="text-slate-400 text-sm mt-1">This may take a moment</p>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-indigo-400 bounce-dot-1" />
        <div className="w-2 h-2 rounded-full bg-indigo-400 bounce-dot-2" />
        <div className="w-2 h-2 rounded-full bg-indigo-400 bounce-dot-3" />
      </div>
    </div>
  );
}

function AnalysisResults({ analysis, onReset }) {
  const categories = analysis.top_spending_categories ?? [];
  const maxAmount = categories.length ? Math.max(...categories.map((c) => c.amount)) : 1;
  const total = categories.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Sticky header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Icon path={ICONS.barChart} className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">FinanceIQ</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors px-3 py-1.5 rounded-lg"
          >
            <Icon path={ICONS.upload} className="w-4 h-4" />
            New Analysis
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Summary */}
        <div className="bg-indigo-600 rounded-2xl p-6 shadow-md shadow-indigo-200">
          <div className="flex items-center gap-2 mb-3">
            <Icon path={ICONS.info} className="w-4 h-4 text-indigo-300" />
            <span className="text-indigo-200 text-xs font-semibold uppercase tracking-widest">Summary</span>
          </div>
          <p className="text-white leading-relaxed text-sm">{analysis.summary}</p>
        </div>

        {/* Spending Categories */}
        {categories.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon path={ICONS.barChart} className="w-5 h-5 text-slate-400" />
                <h2 className="font-semibold text-slate-900">Top Spending Categories</h2>
              </div>
              <span className="text-xs text-slate-400">
                Total:{" "}
                <span className="font-semibold text-slate-600">${total.toFixed(2)}</span>
              </span>
            </div>

            <div className="divide-y divide-slate-50">
              {categories.map((item, i) => {
                const color = COLORS[i % COLORS.length];
                const barPct = ((item.amount / maxAmount) * 100).toFixed(1);
                const sharePct = total > 0 ? ((item.amount / total) * 100).toFixed(1) : "0.0";
                return (
                  <div key={i} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{sharePct}%</span>
                        <span className={`text-sm font-bold ${color.text}`}>
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color.bar} rounded-full transition-all duration-500`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations?.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon path={ICONS.check} className="w-5 h-5 text-emerald-500" />
              <h2 className="font-semibold text-slate-900">Recommendations</h2>
            </div>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="mt-0.5 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Icon path={ICONS.checkSmall} className="w-3 h-3 text-emerald-600" />
                  </span>
                  <span className="text-slate-600 leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {analysis.warnings?.length > 0 && (
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon path={ICONS.warning} className="w-5 h-5 text-amber-500" />
              <h2 className="font-semibold text-amber-800">Warnings</h2>
            </div>
            <ul className="space-y-2.5">
              {analysis.warnings.map((warn, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-amber-400 shrink-0 mt-0.5 font-bold">!</span>
                  <span className="text-amber-800 leading-relaxed">{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pb-4" />
      </main>
    </div>
  );
}

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (analysis) return <AnalysisResults analysis={analysis} onReset={() => setAnalysis(null)} />;
  return <FileUpload onAnalyzeComplete={setAnalysis} setLoading={setLoading} />;
}

export default App;
