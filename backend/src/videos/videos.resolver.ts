import { Resolver, Query, Args, Int, ResolveField, Parent, Float } from '@nestjs/graphql';
import { VideoType } from './video.type';
import { VideosService } from './videos.service';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { FeedbackType } from '../feedbacks/feedback.type';
import { Video } from './video.entity';

@Resolver(() => VideoType)
export class VideosResolver {
  constructor(
    private readonly videosService: VideosService,
    private readonly feedbacksService: FeedbacksService,
  ) {}

  @Query(() => [VideoType], { 
    name: 'videos',
    description: 'Returns the list of all videos' 
  })
  async getVideos(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Query(() => VideoType, { 
    name: 'video',
    description: 'Returns a specific video by ID' 
  })
  async getVideo(
    @Args('id', { type: () => Int, description: 'Video ID' }) id: number,
  ): Promise<Video> {
    return this.videosService.findOne(id);
  }

  @ResolveField(() => [FeedbackType], { 
    name: 'feedbacks',
    description: 'List of video feedbacks' 
  })
  async getFeedbacks(@Parent() video: Video): Promise<FeedbackType[]> {
    return this.feedbacksService.findByVideoId(video.id);
  }

  @ResolveField(() => Float, { 
    name: 'averageRating',
    nullable: true,
    description: 'Video average rating' 
  })
  async getAverageRating(@Parent() video: Video): Promise<number | null> {
    return this.feedbacksService.getAverageRating(video.id);
  }
}
