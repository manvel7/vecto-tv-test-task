import React from 'react';
import './VideoCard.css';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    coverImage: string;
  };
  isActive?: boolean;
  isHovered?: boolean;
  isRecentlyViewed?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive = false,
  isHovered = false,
  isRecentlyViewed = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  const cardClasses = [
    'video-card',
    isActive && 'video-card--active',
    isHovered && 'video-card--hovered',
    isRecentlyViewed && 'video-card--recently-viewed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role='button'
      tabIndex={0}
      aria-label={`Select ${video.title}`}
    >
      <div className='video-card__cover'>
        <img
          src={video.coverImage}
          alt={video.title}
          className='video-card__cover-image'
          loading='lazy'
        />
        <div className='video-card__cover-overlay' />

        {/* Recently viewed indicator */}
        {isRecentlyViewed && (
          <div className='video-card__recently-viewed-badge'>
            <span className='video-card__recently-viewed-icon'>👁️</span>
          </div>
        )}

        {/* Active indicator */}
        {isActive && (
          <div className='video-card__active-indicator'>
            <span className='video-card__active-icon'>▶️</span>
          </div>
        )}
      </div>

      {/* Title overlay */}
      <div className='video-card__title'>
        <span className='video-card__title-text'>{video.title}</span>
      </div>
    </div>
  );
};
