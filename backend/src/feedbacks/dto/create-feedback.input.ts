import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, Max, IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

@InputType({ description: 'Data required to create a feedback' })
export class CreateFeedbackInput {
  @Field(() => Int, { description: 'ID of the video to receive feedback' })
  @IsInt({ message: 'videoId must be an integer' })
  videoId: number;

  @Field(() => Int, { description: 'Rating from 1 to 5' })
  @IsInt({ message: 'rating must be an integer' })
  @Min(1, { message: 'Minimum rating is 1' })
  @Max(5, { message: 'Maximum rating is 5' })
  rating: number;

  @Field({ nullable: true, description: 'Optional comment' })
  @IsOptional()
  @IsString({ message: 'comment must be a string' })
  @MaxLength(1000, { message: 'Comment must be at most 1000 characters' })
  comment?: string;

  @Field({ description: 'Name of the user leaving the feedback' })
  @IsString({ message: 'userName must be a string' })
  @IsNotEmpty({ message: 'userName is required' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  userName: string;
}
