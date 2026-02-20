import { gql } from '@apollo/client';

const VIDEO_FIELDS = gql`
  fragment VideoFields on VideoType {
    id
    title
    description
    youtubeUrl
    thumbnailUrl
    averageRating
  }
`;

const FEEDBACK_FIELDS = gql`
  fragment FeedbackFields on FeedbackType {
    id
    rating
    comment
    userName
    createdAt
  }
`;

export const GET_VIDEOS = gql`
  ${VIDEO_FIELDS}
  query GetVideos {
    videos {
      ...VideoFields
    }
  }
`;

export const GET_VIDEO = gql`
  ${VIDEO_FIELDS}
  ${FEEDBACK_FIELDS}
  query GetVideo($id: Int!) {
    video(id: $id) {
      ...VideoFields
      feedbacks {
        ...FeedbackFields
      }
    }
  }
`;

export const CREATE_FEEDBACK = gql`
  ${FEEDBACK_FIELDS}
  mutation CreateFeedback($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      ...FeedbackFields
    }
  }
`;
