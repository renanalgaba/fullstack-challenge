import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });
    
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    
    return video;
  }

  async create(data: Partial<Video>): Promise<Video> {
    const video = this.videoRepository.create(data);
    return this.videoRepository.save(video);
  }
}
