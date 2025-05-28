import FileUpload from "../components/FileUpload";

function Home({ onAnalyzeComplete }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Upload Your Transactions</h1>
      <FileUpload onAnalyzeComplete={onAnalyzeComplete} />
    </div>
  );
}

export default Home;
