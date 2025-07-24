import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { VideoButton } from '../../shared/ui/VideoButton';
import { useFeaturedVideo } from '../../features/video';
import {
  FeaturedVideoProps,
  FeaturedVideoRenderProps,
  Video,
} from '../../entities/video';
import './FeaturedVideo.css';

export const FeaturedVideo: React.FC<FeaturedVideoProps> = ({
  children,
  video: propVideo,
  onPlay,
  onMoreInfo,
  onVideoSelect,
  className = '',
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayingBackground, setIsPlayingBackground] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const {
    video,
    videoState,
    handlePlay,
    handleVideoSelect: hookHandleVideoSelect,
  } = useFeaturedVideo(propVideo || selectedVideo || undefined);

  // Handle video selection from carousel
  useEffect(() => {
    if (propVideo) {
      setSelectedVideo(propVideo);
      setIsPlayingBackground(false);
      setShowVideoPlayer(false);
    }
  }, [propVideo]);

  // Auto-play background video after 2 seconds when video is selected
  useEffect(() => {
    if (selectedVideo && selectedVideo.videoUrl) {
      const timer = setTimeout(() => {
        setIsPlayingBackground(true);
        setShowVideoPlayer(true);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [selectedVideo]);

  // Memoized event handlers
  const handleVideoSelect = useCallback(
    (selectedVideo: Video) => {
      setSelectedVideo(selectedVideo);
      hookHandleVideoSelect(selectedVideo);
      onVideoSelect?.(selectedVideo);
    },
    [hookHandleVideoSelect, onVideoSelect]
  );

  const handlePlayClick = useCallback(() => {
    if (!video) return;
    handlePlay();
    onPlay?.(video);
  }, [video, handlePlay, onPlay]);

  const handleMoreInfoClick = useCallback(() => {
    if (!video) return;
    onMoreInfo?.(video);
  }, [video, onMoreInfo]);

  // Memoized render props
  const renderProps: FeaturedVideoRenderProps = useMemo(
    () => ({
      video,
      isPlaying: videoState.isPlaying,
      isLoading: videoState.isLoading,
      isPlayingBackground,
      showVideoPlayer,
      handlePlay: handlePlayClick,
      handleMoreInfo: handleMoreInfoClick,
      handleVideoSelect,
    }),
    [
      video,
      videoState.isPlaying,
      videoState.isLoading,
      isPlayingBackground,
      showVideoPlayer,
      handlePlayClick,
      handleMoreInfoClick,
      handleVideoSelect,
    ]
  );

  // If children is provided, use render props pattern
  if (children) {
    return <>{children(renderProps)}</>;
  }

  // Default render
  if (!video) {
    return (
      <div className={`featured-video featured-video--loading ${className}`}>
        <div className='featured-video__skeleton'>
          <div className='featured-video__skeleton-cover' />
          <div className='featured-video__skeleton-content'>
            <div className='featured-video__skeleton-title' />
            <div className='featured-video__skeleton-description' />
            <div className='featured-video__skeleton-buttons' />
          </div>
        </div>
      </div>
    );
  }

  const coverImage = video.coverImage;
  const logoImage = video.logoImage;

  return (
    <div className={`featured-video ${className}`}>
      <div className='featured-video__container'>
        {/* Cover Image */}
        <div className='featured-video__cover'>
          <img
            src={coverImage}
            alt={'cover image'}
            className='featured-video__cover-image'
            loading='lazy'
          />
          <div className='featured-video__cover-overlay' />
        </div>

        {/* Content */}
        <div className='featured-video__content'>
          {/* Category Badge */}
          <div className='featured-video__category'>
            <span className='featured-video__category-text'>
              {video.category}
            </span>
          </div>

          {/* Movie Logo */}
          <div className='featured-video__logo'>
            <img
              src={logoImage}
              alt={'logo image'}
              className='featured-video__logo-image'
              loading='lazy'
            />
          </div>

          {/* Video Info */}
          <div className='featured-video__info'>
            <div className='featured-video__meta'>
              <span className='featured-video__year'>{video.releaseYear}</span>
              <span className='featured-video__rating'>{video.mpaRating}</span>
              <span className='featured-video__duration'>{video.duration}</span>
            </div>

            {/* Description */}
            <p className='featured-video__description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Action Buttons */}
            <div className='featured-video__actions'>
              <VideoButton
                variant='play'
                onClick={handlePlayClick}
                loading={videoState.isLoading}
                size='sm'
                className='featured-video__play-button'
              />
              <VideoButton
                variant='info'
                onClick={handleMoreInfoClick}
                size='sm'
                className='featured-video__info-button'
              />
            </div>
          </div>
        </div>

        {/* Background Video Player (after 2 seconds) */}
        {showVideoPlayer && video.videoUrl && (
          <div className='featured-video__player-overlay'>
            <video
              src={video.videoUrl}
              className='featured-video__player'
              autoPlay
              muted
              loop
              playsInline
              controls={false} // No controls as requested
            />
          </div>
        )}
      </div>
    </div>
  );
};
