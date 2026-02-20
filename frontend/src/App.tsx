import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { VideoPage } from './pages/VideoPage';

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setSelectedVideoId(null)}
          >
            Video Feedback Platform
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedVideoId ? (
          <VideoPage
            videoId={selectedVideoId}
            onBack={() => setSelectedVideoId(null)}
          />
        ) : (
          <HomePage onSelectVideo={setSelectedVideoId} />
        )}
      </main>
    </div>
  );
}

export default App;
