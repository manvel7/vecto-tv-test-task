import React from 'react';
import './MenuIcon.css';

interface MenuIconProps {
  icon: string;
  isActive?: boolean;
  isHovered?: boolean;
  isExpanded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
  icon,
  isActive = false,
  isHovered = false,
  isExpanded = false,
  size = 'md',
  className = '',
}) => {
  const iconClasses = [
    'menu-icon',
    `menu-icon--${size}`,
    isActive && 'menu-icon--active',
    isHovered && 'menu-icon--hovered',
    isExpanded && 'menu-icon--expanded',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={iconClasses}>
      <img src={icon} alt='icon' className='menu-icon__image' />
      {isActive && <div className='menu-icon__active-indicator' />}
    </div>
  );
};
