export interface Video {
  id: number;
  title: string;
  description?: string;
  youtubeUrl: string;
  thumbnailUrl?: string;
  createdAt: string;
  feedbacks?: Feedback[];
  averageRating?: number;
}

export interface Feedback {
  id: number;
  rating: number;
  comment?: string;
  userName: string;
  createdAt: string;
  videoId: number;
}

export interface CreateFeedbackInput {
  videoId: number;
  rating: number;
  comment?: string;
  userName: string;
}
