import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Video } from '../videos/video.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column()
  userName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  videoId: number;

  @ManyToOne(() => Video, (video) => video.feedbacks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'videoId' })
  video: Video;
}
