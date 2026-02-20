import { useQuery } from '@apollo/client/react';
import { GET_VIDEOS } from '../graphql/queries';
import { VideoCard } from '../components/VideoCard';
import { Loading } from '../components/ui';
import type { Video } from '../types';

interface HomePageProps {
  onSelectVideo: (id: number) => void;
}

export function HomePage({ onSelectVideo }: HomePageProps) {
  const { data, loading, error } = useQuery<{ videos: Video[] }>(GET_VIDEOS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading videos: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => onSelectVideo(video.id)}
          />
        ))}
      </div>
    </div>
  );
}
