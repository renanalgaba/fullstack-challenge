import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackInput } from './dto/create-feedback.input';
import { VideosService } from '../videos/videos.service';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly videosService: VideosService,
  ) {}

  async findByVideoId(videoId: number): Promise<Feedback[]> {
    await this.videosService.findOne(videoId);
    
    return this.feedbackRepository.find({
      where: { videoId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(input: CreateFeedbackInput): Promise<Feedback> {
    await this.videosService.findOne(input.videoId);
    
    const feedback = this.feedbackRepository.create(input);
    return this.feedbackRepository.save(feedback);
  }

  async getAverageRating(videoId: number): Promise<number | null> {
    const result = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .select('AVG(feedback.rating)', 'average')
      .where('feedback.videoId = :videoId', { videoId })
      .getRawOne();
    
    return result?.average ? parseFloat(result.average) : null;
  }
}
