import FileUpload from "../components/FileUpload";

export default function Home({ onAnalyzeComplete, setLoading }) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <FileUpload onAnalyzeComplete={onAnalyzeComplete} setLoading={setLoading} />
      </div>
    );
  }

