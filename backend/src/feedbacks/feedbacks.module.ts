import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksResolver } from './feedbacks.resolver';
import { VideosModule } from '../videos/videos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    forwardRef(() => VideosModule),
  ],
  providers: [FeedbacksService, FeedbacksResolver],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
