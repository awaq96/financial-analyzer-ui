import { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
    {loading ? (
      <LoadingSpinner />
    ) : !analysis ? (
      <div className="flex items-center justify-center h-screen">
        <FileUpload onAnalyzeComplete={setAnalysis} setLoading={setLoading} />
      </div>
    ) : (
      <div className="flex items-center justify-center min-h-screen p-4 transition duration-700 ease-in-out transform animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              💡 Monthly Spending Analysis
            </h2>

            {/* Summary */}
            <div className="mb-6 text-lg text-gray-700 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              {analysis.summary}
            </div>

            {/* Top Categories */}
            <h3 className="text-xl font-bold mb-2 text-gray-800">📊 Top Spending Categories</h3>
            <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.top_spending_categories.map((item, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                  <p className="font-medium text-gray-700">{item.category}</p>
                  <p className="text-blue-600 font-semibold">${item.amount.toFixed(2)}</p>
                </li>
              ))}
            </ul>

            {/* Recommendations */}
            <h3 className="text-xl font-bold mb-2 text-gray-800">✅ Recommendations</h3>
            <ul className="mb-6 list-disc pl-6 text-gray-700">
              {analysis.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>

            {/* Warnings */}
            {analysis.warnings && analysis.warnings.length > 0 && (
              <>
                <h3 className="text-xl font-bold mb-2 text-gray-800 text-red-600">⚠️ Warnings</h3>
                <ul className="list-disc pl-6 text-red-700 mb-6">
                  {analysis.warnings.map((warn, index) => (
                    <li key={index}>{warn}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Reset */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setAnalysis(null)}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                Upload Another File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
