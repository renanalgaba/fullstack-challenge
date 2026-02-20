import type { Video } from '../types';
import { StarRating } from './ui';
import { extractVideoId } from '../utils/youtube';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const thumbnailUrl = video.thumbnailUrl || 
    `https://img.youtube.com/vi/${extractVideoId(video.youtubeUrl)}/hqdefault.jpg`;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={thumbnailUrl}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {video.description}
          </p>
        )}
        <div className="mt-3 flex items-center">
          <StarRating rating={video.averageRating || 0} />
          <span className="ml-2 text-sm text-gray-500">
            {video.averageRating ? video.averageRating.toFixed(1) : 'No ratings'}
          </span>
        </div>
      </div>
    </div>
  );
}
