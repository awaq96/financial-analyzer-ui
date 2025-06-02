import { useState } from "react";
import FileUpload from "./components/FileUpload";
import "./spinner.css"; // Make sure this is imported if you extract styles
import ResultPage from "./pages/ResultPage";
import LoadingSpinner from "./components/LoadingSpinner";


function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
    {loading ? (
      <LoadingSpinner />
    ) : !analysis ? (
      <div className="flex items-center justify-center w-full min-h-screen p-4">
        <FileUpload onAnalyzeComplete={setAnalysis} setLoading={setLoading} />
      </div>
    ) : (
      <ResultPage analysis={analysis} onReset={() => setAnalysis(null)} />
    )}
  </div>
);

}

export default App;
