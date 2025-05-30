import { useState } from "react";
import axios from "axios";

export default function FileUpload({ onAnalyzeComplete, setLoading }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      alert("Upload failed. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-xl text-center mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Upload Your CSV</h1>


    <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-700 file:text-white
                    hover:file:bg-blue-600 mb-4"
    />


      {file && <p className="text-sm text-gray-600 mb-4">Selected file: {file.name}</p>}

    <button
        onClick={handleUpload}
        disabled={!file}
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
        Upload & Analyze
    </button>

    </div>
  );
}
