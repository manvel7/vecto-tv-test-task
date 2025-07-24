import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useCarousel, useSessionStorage } from '../../features/video';
import {
  TrendingCarouselProps,
  TrendingCarouselRenderProps,
  Video,
} from '../../entities/video';
import { getTrendingVideos } from '../../entities/video';
import './TrendingCarousel.css';

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  children,
  videos: propVideos,
  maxItems = 50,
  visibleItems = 8, // Show 8 items initially
  onVideoSelect,
  onVideoClick,
  className = '',
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get videos and sort by session storage
  const [defaultVideos, setDefaultVideos] = useState<Video[]>([]);
  const { getSortedVideosByViewed, addViewedVideo, isRecentlyViewed } =
    useSessionStorage();

  // Load trending videos on mount if not provided
  useEffect(() => {
    if (!propVideos) {
      const loadTrendingVideos = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const videos = await getTrendingVideos(maxItems);
          setDefaultVideos(videos);
        } catch {
          setError('Failed to load trending videos');
        } finally {
          setIsLoading(false);
        }
      };

      loadTrendingVideos();
    }
  }, [propVideos, maxItems]);

  const sortedVideos = useMemo(() => {
    const videos = propVideos || defaultVideos;
    return getSortedVideosByViewed(videos);
  }, [propVideos, defaultVideos, getSortedVideosByViewed]);

  // Carousel functionality
  const {
    carouselRef,
    currentIndex,
    canScrollLeft,
    canScrollRight,
    needsScrolling,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(sortedVideos.length, visibleItems);

  // Memoized event handlers
  const handleVideoClick = useCallback(
    (video: Video) => {
      setSelectedVideoId(video.id);
      addViewedVideo(video.id);

      // Call external handlers
      onVideoClick?.(video);
      onVideoSelect?.(video);

      // Auto-scroll to center the selected video
      const videoIndex = sortedVideos.findIndex(v => v.id === video.id);
      if (videoIndex !== -1) {
        scrollToIndex(Math.max(0, videoIndex - Math.floor(visibleItems / 2)));
      }
    },
    [
      addViewedVideo,
      onVideoClick,
      onVideoSelect,
      sortedVideos,
      scrollToIndex,
      visibleItems,
    ]
  );

  const handleVideoHover = useCallback((videoId: string | null) => {
    setHoveredVideoId(videoId);
  }, []);

  const handleScrollLeft = useCallback(() => {
    scrollLeft();
  }, [scrollLeft]);

  const handleScrollRight = useCallback(() => {
    scrollRight();
  }, [scrollRight]);

  const handleScrollToIndex = useCallback(
    (index: number) => {
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  // Memoized render props
  const renderProps: TrendingCarouselRenderProps = useMemo(
    () => ({
      videos: sortedVideos,
      currentIndex,
      visibleItems,
      totalItems: sortedVideos.length,
      canScrollLeft,
      canScrollRight,
      handleVideoClick,
      handleScrollLeft,
      handleScrollRight,
      handleScrollToIndex,
    }),
    [
      sortedVideos,
      currentIndex,
      visibleItems,
      canScrollLeft,
      canScrollRight,
      handleVideoClick,
      handleScrollLeft,
      handleScrollRight,
      handleScrollToIndex,
    ]
  );

  // Memoized video card renderer - only show movie covers
  const renderVideoCard = useCallback(
    (video: Video) => {
      const isActive = selectedVideoId === video.id;
      const isHovered = hoveredVideoId === video.id;
      const wasRecentlyViewed = isRecentlyViewed(video.id);

      const handleClick = () => handleVideoClick(video);
      const handleMouseEnter = () => handleVideoHover(video.id);
      const handleMouseLeave = () => handleVideoHover(null);

      return (
        <div
          key={video.id}
          className={`trending-carousel__video-card ${
            isActive ? 'trending-carousel__video-card--active' : ''
          } ${isHovered ? 'trending-carousel__video-card--hovered' : ''} ${
            wasRecentlyViewed
              ? 'trending-carousel__video-card--recently-viewed'
              : ''
          }`}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role='button'
          tabIndex={0}
          aria-label={`Select ${video.title}`}
        >
          {/* Only show movie cover image */}
          <img
            src={video.coverImage}
            alt={video.title}
            className='trending-carousel__video-cover'
            loading='lazy'
          />

          {/* Recently viewed indicator */}
          {wasRecentlyViewed && (
            <div className='trending-carousel__recently-viewed-indicator'>
              <span>✓</span>
            </div>
          )}
        </div>
      );
    },
    [
      selectedVideoId,
      hoveredVideoId,
      isRecentlyViewed,
      handleVideoClick,
      handleVideoHover,
    ]
  );

  // If children is provided, use render props pattern
  if (children) {
    return <>{children(renderProps)}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`trending-carousel ${className}`}>
        <div className='trending-carousel__header'>
          <h2 className='trending-carousel__title'>Trending Now</h2>
        </div>
        <div className='trending-carousel__loading'>
          <div className='trending-carousel__loading-spinner' />
          <p className='trending-carousel__loading-text'>
            Loading trending videos...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`trending-carousel ${className}`}>
        <div className='trending-carousel__header'>
          <h2 className='trending-carousel__title'>Trending Now</h2>
        </div>
        <div className='trending-carousel__error'>
          <p className='trending-carousel__error-text'>{error}</p>
          <button
            className='trending-carousel__error-retry'
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Default render
  return (
    <div className={`trending-carousel ${className}`}>
      {/* Section Header */}
      <div className='trending-carousel__header'>
        <h2 className='trending-carousel__title'>Trending Now</h2>
        {/* Only show controls if scrolling is needed */}
        {needsScrolling && (
          <div className='trending-carousel__controls'>
            <button
              className={`trending-carousel__control trending-carousel__control--left ${
                !canScrollLeft ? 'trending-carousel__control--disabled' : ''
              }`}
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label='Scroll left'
            >
              ‹
            </button>
            <button
              className={`trending-carousel__control trending-carousel__control--right ${
                !canScrollRight ? 'trending-carousel__control--disabled' : ''
              }`}
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label='Scroll right'
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className='trending-carousel__container'>
        <div
          ref={carouselRef}
          className='trending-carousel__track'
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          role='region'
          aria-label='Trending videos carousel'
          tabIndex={0}
        >
          {sortedVideos.map(renderVideoCard)}
        </div>

        {/* Scroll Indicators - only show if scrolling is needed */}
        {needsScrolling && (
          <div className='trending-carousel__indicators'>
            {Array.from(
              { length: Math.ceil(sortedVideos.length / visibleItems) },
              (_, _index) => (
                <button
                  key={_index}
                  className={`trending-carousel__indicator ${
                    Math.floor(currentIndex / visibleItems) === _index
                      ? 'trending-carousel__indicator--active'
                      : ''
                  }`}
                  onClick={() => handleScrollToIndex(_index * visibleItems)}
                  aria-label={`Go to page ${_index + 1}`}
                />
              )
            )}
          </div>
        )}

        {/* Progress Bar - only show if scrolling is needed */}
        {needsScrolling && (
          <div className='trending-carousel__progress'>
            <div
              className='trending-carousel__progress-bar'
              style={{
                width: `${(currentIndex / Math.max(1, sortedVideos.length - visibleItems)) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
