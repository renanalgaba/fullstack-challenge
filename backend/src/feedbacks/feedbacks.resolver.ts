import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeedbackType } from './feedback.type';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { Feedback } from './feedback.entity';

@Resolver(() => FeedbackType)
export class FeedbacksResolver {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Query(() => [FeedbackType], {
    name: 'feedbacksByVideo',
    description: 'Returns all feedbacks for a specific video',
  })
  async getFeedbacksByVideo(
    @Args('videoId', { type: () => Int, description: 'Video ID' }) 
    videoId: number,
  ): Promise<Feedback[]> {
    return this.feedbacksService.findByVideoId(videoId);
  }

  @Mutation(() => FeedbackType, {
    name: 'createFeedback',
    description: 'Creates a new feedback for a video',
  })
  async createFeedback(
    @Args('input', { description: 'Feedback data' }) 
    input: CreateFeedbackInput,
  ): Promise<Feedback> {
    return this.feedbacksService.create(input);
  }
}
