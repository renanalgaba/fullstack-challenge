import { useQuery } from '@apollo/client/react';
import { GET_VIDEO } from '../graphql/queries';
import { FeedbackForm } from '../components/FeedbackForm';
import { FeedbackList } from '../components/FeedbackList';
import { Loading, StarRating, BackButton } from '../components/ui';
import type { Video } from '../types';

interface VideoPageProps {
  videoId: number;
  onBack: () => void;
}

export function VideoPage({ videoId, onBack }: VideoPageProps) {
  const { data, loading, error } = useQuery<{ video: Video }>(GET_VIDEO, {
    variables: { id: videoId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error || !data?.video) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading video</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to videos
        </button>
      </div>
    );
  }

  const video = data.video;

  return (
    <div>
      <BackButton onClick={onBack} label="Back to videos" />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={video.youtubeUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{video.title}</h1>
          {video.description && (
            <p className="text-gray-600 mt-2">{video.description}</p>
          )}
          <div className="mt-4 flex items-center">
            <StarRating rating={video.averageRating || 0} size="lg" />
            <span className="ml-2 text-gray-600">
              {video.averageRating
                ? `${video.averageRating.toFixed(1)} average`
                : 'No ratings yet'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedbacks</h2>
          <FeedbackList feedbacks={video.feedbacks || []} />
        </div>
        <div>
          <FeedbackForm videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
