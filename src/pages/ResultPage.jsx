import React from "react";
import BarChart from "../components/BarChart";

export default function ResultPage({ analysis, onReset }) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full animate-slide-in">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          💡 Monthly Spending Analysis
        </h2>

        {/* Summary */}
        <div className="mb-6 text-lg text-gray-700 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          {analysis.summary}
        </div>

        {/* Top Spending Categories */}
        <h3 className="text-xl font-bold mb-2 text-gray-800">📊 Top Spending Categories</h3>
        <BarChart data={analysis.top_spending_categories} />

        {/* Recommendations */}
        <h3 className="text-xl font-bold mb-4 text-gray-800">✅ Recommendations</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {analysis.recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-sm"
            >
              <p className="text-gray-800">{rec}</p>
            </div>
          ))}
        </div>


        {/* Warnings */}
        {analysis.warnings?.length > 0 && (
          <>
            <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ Warnings</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {analysis.warnings.map((warn, index) => (
                <div
                  key={index}
                  className="bg-red-50 border-l-4 border-red-400 p-4 rounded shadow-sm"
                >
                  <p className="text-red-800">{warn}</p>
                </div>
              ))}
            </div>
          </>
        )}



        {/* Reset Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onReset}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Upload Another File
          </button>
        </div>
      </div>
    </div>
  );
}
