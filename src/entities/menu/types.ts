import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface ProfileInfo {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface MenuState {
  isExpanded: boolean;
  activeItemId: string | null;
  hoveredItemId: string | null;
}

export interface MenuProps {
  children?: (props: MenuRenderProps) => React.ReactNode;
  onItemClick?: (item: MenuItem) => void;
  onProfileClick?: (profile: ProfileInfo) => void;
  onLanguageChange?: () => void;
  onGetHelp?: () => void;
  onExit?: () => void;
}

export interface MenuRenderProps {
  isExpanded: boolean;
  activeItemId: string | null;
  hoveredItemId: string | null;
  menuItems: MenuItem[];
  profileInfo: ProfileInfo;
  bottomMenuItems: MenuItem[];
  handleItemClick: (item: MenuItem) => void;
  handleItemHover: (itemId: string | null) => void;
  handleProfileClick: () => void;
  handleLanguageChange: () => void;
  handleGetHelp: () => void;
  handleExit: () => void;
}
