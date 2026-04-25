import { useState } from "react";
import axios from "axios";

const BarChartIcon = ({ className }) => (
  <svg className={`fill-none ${className}`} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={`fill-none ${className}`} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={`fill-none ${className}`} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function FileUpload({ onAnalyzeComplete, setLoading }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.name.toLowerCase().endsWith(".csv")) setFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/v1/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => {
        onAnalyzeComplete(response.data.analysis);
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
      alert("Upload failed. Check the console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Brand */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <BarChartIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">FinanceIQ</span>
        </div>
        <p className="text-slate-400 text-sm">AI-powered spending analysis</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-slate-900 mb-1">Analyze Your Spending</h1>
        <p className="text-slate-400 text-sm mb-6">
          Upload a CSV of your bank transactions to get personalized insights.
        </p>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById("csv-file-input").click()}
          className={[
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer select-none transition-all duration-200 mb-5",
            dragOver
              ? "border-indigo-400 bg-indigo-50"
              : file
              ? "border-emerald-400 bg-emerald-50"
              : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50",
          ].join(" ")}
        >
          <input
            id="csv-file-input"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          {file ? (
            <>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-emerald-700 truncate px-4">{file.name}</p>
              <p className="text-xs text-slate-400 mt-1">Click to change file</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UploadIcon className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {dragOver ? "Drop it here" : "Drop your CSV here"}
              </p>
              <p className="text-xs text-slate-400 mt-1">or click to browse files</p>
            </>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file}
          className="w-full py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze Transactions
        </button>
      </div>

      <p className="mt-6 text-xs text-slate-400">Your data is processed securely and never stored.</p>
    </div>
  );
}
