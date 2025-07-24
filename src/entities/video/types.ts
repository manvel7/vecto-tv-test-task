import React from 'react';

export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  releaseYear: string;
  mpaRating: string;
  duration: string;
  coverImage: string;
  logoImage: string;
  videoUrl?: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Raw data structure from JSON
export interface RawVideoData {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

export interface RawFeaturedData {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  Description: string;
}

export interface RawDataStructure {
  Featured: RawFeaturedData;
  TendingNow: RawVideoData[];
}

export interface FeaturedVideoProps {
  children?: (props: FeaturedVideoRenderProps) => React.ReactNode;
  video?: Video;
  onPlay?: (video: Video) => void;
  onMoreInfo?: (video: Video) => void;
  onVideoSelect?: (video: Video) => void;
  className?: string;
}

export interface FeaturedVideoRenderProps {
  video: Video | null;
  isPlaying: boolean;
  isLoading: boolean;
  isPlayingBackground?: boolean;
  showVideoPlayer?: boolean;
  handlePlay: () => void;
  handleMoreInfo: () => void;
  handleVideoSelect: (video: Video) => void;
}

export interface VideoState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}

export interface TrendingCarouselProps {
  children?: (props: TrendingCarouselRenderProps) => React.ReactNode;
  videos?: Video[];
  maxItems?: number;
  visibleItems?: number;
  onVideoSelect?: (video: Video) => void;
  onVideoClick?: (video: Video) => void;
  className?: string;
}

export interface TrendingCarouselRenderProps {
  videos: Video[];
  currentIndex: number;
  visibleItems: number;
  totalItems: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  handleVideoClick: (video: Video) => void;
  handleScrollLeft: () => void;
  handleScrollRight: () => void;
  handleScrollToIndex: (index: number) => void;
}

export interface CarouselState {
  currentIndex: number;
  isDragging: boolean;
  startX: number;
  scrollLeft: number;
  isAutoScrolling: boolean;
}
