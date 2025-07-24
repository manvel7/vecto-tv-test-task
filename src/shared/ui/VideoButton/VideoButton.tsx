import React from 'react';
import './VideoButton.css';

interface VideoButtonProps {
  variant: 'play' | 'info';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VideoButton: React.FC<VideoButtonProps> = ({
  variant,
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  className = '',
}) => {
  const buttonClasses = [
    'video-button',
    `video-button--${variant}`,
    `video-button--${size}`,
    disabled && 'video-button--disabled',
    loading && 'video-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getIcon = () => {
    if (loading) return '⏳';
    switch (variant) {
      case 'play':
        return '▶️';
      case 'info':
        return '';
      default:
        return '';
    }
  };

  const getLabel = () => {
    if (loading) return 'Loading...';
    switch (variant) {
      case 'play':
        return 'Play';
      case 'info':
        return 'More Info';
      default:
        return '';
    }
  };

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      type='button'
    >
      <span className='video-button__icon'>{getIcon()}</span>
      <span className='video-button__label'>{getLabel()}</span>
    </button>
  );
};
