function ResultPage({ result, onBack }) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
        <pre className="whitespace-pre-wrap text-gray-700">{result}</pre>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload Another
        </button>
      </div>
    );
  }
  
  export default ResultPage;
  