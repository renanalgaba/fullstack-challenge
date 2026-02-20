import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { VideosService } from './videos.service';
import { VideosResolver } from './videos.resolver';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    forwardRef(() => FeedbacksModule),
  ],
  providers: [VideosService, VideosResolver],
  exports: [VideosService],
})
export class VideosModule {}
