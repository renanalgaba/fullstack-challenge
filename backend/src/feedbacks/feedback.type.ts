import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Represents a user feedback on a video' })
export class FeedbackType {
  @Field(() => Int, { description: 'Unique feedback ID' })
  id: number;

  @Field(() => Int, { description: 'Rating from 1 to 5' })
  rating: number;

  @Field({ nullable: true, description: 'User comment' })
  comment?: string;

  @Field({ description: 'Name of the user who left the feedback' })
  userName: string;

  @Field({ description: 'Feedback creation date' })
  createdAt: Date;

  @Field(() => Int, { description: 'Related video ID' })
  videoId: number;
}
