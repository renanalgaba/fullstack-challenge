import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { FeedbackType } from '../feedbacks/feedback.type';


@ObjectType({ description: 'Represents a video on the platform' })
export class VideoType {
  @Field(() => Int, { description: 'Unique video ID' })
  id: number;

  @Field({ description: 'Video title' })
  title: string;

  @Field({ nullable: true, description: 'Video description' })
  description?: string;

  @Field({ description: 'YouTube video URL (embed)' })
  youtubeUrl: string;

  @Field({ nullable: true, description: 'Video thumbnail URL' })
  thumbnailUrl?: string;

  @Field({ description: 'Record creation date' })
  createdAt: Date;

  @Field(() => [FeedbackType], { description: 'Video feedbacks' })
  feedbacks?: FeedbackType[];

  @Field(() => Float, { nullable: true, description: 'Average rating' })
  averageRating?: number;
}
