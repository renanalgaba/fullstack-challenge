import { StarIcon } from './StarIcon';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, size = 'md' }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= Math.round(rating)} size={size} />
      ))}
    </div>
  );
}
