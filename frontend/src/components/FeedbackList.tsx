import type { Feedback } from '../types';
import { StarRating } from './ui';

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No feedbacks yet. Be the first to leave one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-800">{feedback.userName}</span>
            <div className="flex items-center">
              <StarRating rating={feedback.rating} size="sm" />
              <span className="ml-2 text-sm text-gray-500">
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          {feedback.comment && (
            <p className="text-gray-600">{feedback.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
