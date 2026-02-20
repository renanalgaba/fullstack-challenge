import { DataSource } from 'typeorm';
import { Video } from './videos/video.entity';
import { Feedback } from './feedbacks/feedback.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Video, Feedback],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Connected to database');

  const videoRepository = dataSource.getRepository(Video);
  const feedbackRepository = dataSource.getRepository(Feedback);

  await feedbackRepository.createQueryBuilder().delete().execute();
  await videoRepository.createQueryBuilder().delete().execute();
  console.log('Previous data cleared');

  const videos: Partial<Video>[] = [
    {
      title: 'ARQUITETANDO O YOUTUBE NA PRÁTICA | SYSTEM DESIGN',
      description: 'Learn how to architect a system like YouTube in practice, covering fundamental System Design concepts.',
      youtubeUrl: 'https://www.youtube.com/embed/JBivKeZVex0',
      thumbnailUrl: 'https://img.youtube.com/vi/JBivKeZVex0/maxresdefault.jpg',
    },
    {
      title: 'Arquitetura Orientada a Eventos | O Guia Completo para ESCALAR MICROSSERVIÇOS do Jeito Certo!',
      description: 'Complete guide on Event-Driven Architecture and how to scale microservices efficiently.',
      youtubeUrl: 'https://www.youtube.com/embed/8xFBQc1A4B8',
      thumbnailUrl: 'https://img.youtube.com/vi/8xFBQc1A4B8/maxresdefault.jpg',
    },
    {
      title: 'Escalabilidade com Mensageria | Kafka, RabbitMQ e SQS',
      description: 'Understand the differences between messaging systems and when to use each one to scale your application.',
      youtubeUrl: 'https://www.youtube.com/embed/xJllDyCIyws',
      thumbnailUrl: 'https://img.youtube.com/vi/xJllDyCIyws/maxresdefault.jpg',
    },
    {
      title: 'Arquitetando um Encurtador de URL: O Maior Desafio dos Programadores em Entrevistas de System Design',
      description: 'Learn how to solve the classic System Design problem: designing a scalable URL shortener.',
      youtubeUrl: 'https://www.youtube.com/embed/m_anIoKW7Jg',
      thumbnailUrl: 'https://img.youtube.com/vi/m_anIoKW7Jg/maxresdefault.jpg',
    },
    {
      title: 'Como Escolher o Banco de Dados Correto pra sua Aplicação | System Design & Arquitetura de Software',
      description: 'SQL vs NoSQL, when to use each database type and how to make correct architectural decisions.',
      youtubeUrl: 'https://www.youtube.com/embed/bhw4-Kq_RPs',
      thumbnailUrl: 'https://img.youtube.com/vi/bhw4-Kq_RPs/maxresdefault.jpg',
    },
    {
      title: 'System Design: Escalando uma Arquitetura do Zero a Um Milhão de Usuários | Arquitetura de Software',
      description: 'From monolith to distributed architecture: how to scale your application to millions of users.',
      youtubeUrl: 'https://www.youtube.com/embed/9g7twJrXqoY',
      thumbnailUrl: 'https://img.youtube.com/vi/9g7twJrXqoY/maxresdefault.jpg',
    },
    {
      title: 'CACHE-ASIDE: Escalabilidade, Performance e Arquitetura de Software pra Mandar Bem na Entrevista',
      description: 'Cache-Aside pattern explained: how to implement caching efficiently to improve performance.',
      youtubeUrl: 'https://www.youtube.com/embed/vRO0UfvsbDw',
      thumbnailUrl: 'https://img.youtube.com/vi/vRO0UfvsbDw/maxresdefault.jpg',
    },
  ];

  if (videos.length === 0) {
    console.log('Warning: No videos configured. Add videos to the "videos" array.');
    await dataSource.destroy();
    return;
  }

  const savedVideos = await videoRepository.save(videos);
  console.log(`${savedVideos.length} videos created`);

  const feedbacks = [
    {
      videoId: savedVideos[0]?.id,
      rating: 5,
      comment: 'Excellent content! Very well explained.',
      userName: 'John Smith',
    },
    {
      videoId: savedVideos[0]?.id,
      rating: 4,
      comment: 'Good video, but could use more practical examples.',
      userName: 'Mary Johnson',
    },
    {
      videoId: savedVideos[1]?.id,
      rating: 5,
      comment: 'Straight to the point! Loved it.',
      userName: 'Peter Brown',
    },
  ].filter(f => f.videoId);

  await feedbackRepository.save(feedbacks);
  console.log(`${feedbacks.length} feedbacks created`);

  await dataSource.destroy();
  console.log('Seed completed successfully!');
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
