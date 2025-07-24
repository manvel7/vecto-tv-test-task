import React, { useCallback, useMemo, useState } from 'react';
import { MenuIcon } from '@/shared/ui/MenuIcon';
import { useMenuState } from '@/features/menu';
import { MenuItem, MenuProps, MenuRenderProps } from '@/entities/menu';
import {
  defaultMenuItems,
  defaultProfileInfo,
  defaultBottomMenuItems,
} from '@/entities/menu';
import './SidebarMenu.css';

export const SidebarMenu: React.FC<MenuProps> = ({
  children,
  onItemClick,
  onProfileClick,
  onLanguageChange,
  onGetHelp,
  onExit,
}) => {
  const { menuState, handleItemClick, handleItemHover, handleMenuHover } =
    useMenuState();
  const [avatarError, setAvatarError] = useState(false);

  const handleProfileClick = useCallback(() => {
    onProfileClick?.(defaultProfileInfo);
  }, [onProfileClick]);

  const handleLanguageChange = useCallback(() => {
    onLanguageChange?.();
  }, [onLanguageChange]);

  const handleGetHelp = useCallback(() => {
    onGetHelp?.();
  }, [onGetHelp]);

  const handleExit = useCallback(() => {
    onExit?.();
  }, [onExit]);

  const handleMenuClick = useCallback(
    (item: MenuItem) => {
      handleItemClick(item);
      onItemClick?.(item);
    },
    [handleItemClick, onItemClick]
  );

  const handleMenuEnter = useCallback(() => {
    handleMenuHover(true);
  }, [handleMenuHover]);

  const handleMenuLeave = useCallback(() => {
    handleMenuHover(false);
  }, [handleMenuHover]);

  const handleBottomItemClick = useCallback(
    (item: MenuItem) => {
      switch (item.id) {
        case 'language':
          handleLanguageChange();
          break;
        case 'get-help':
          handleGetHelp();
          break;
        case 'exit':
          handleExit();
          break;
        default:
          handleMenuClick(item);
      }
    },
    [handleLanguageChange, handleGetHelp, handleExit, handleMenuClick]
  );

  const handleAvatarError = useCallback(() => {
    setAvatarError(true);
  }, []);

  const renderProps: MenuRenderProps = useMemo(
    () => ({
      isExpanded: menuState.isExpanded,
      activeItemId: menuState.activeItemId,
      hoveredItemId: menuState.hoveredItemId,
      menuItems: defaultMenuItems,
      profileInfo: defaultProfileInfo,
      bottomMenuItems: defaultBottomMenuItems,
      handleItemClick: handleMenuClick,
      handleItemHover,
      handleProfileClick,
      handleLanguageChange,
      handleGetHelp,
      handleExit,
    }),
    [
      menuState.isExpanded,
      menuState.activeItemId,
      menuState.hoveredItemId,
      handleMenuClick,
      handleItemHover,
      handleProfileClick,
      handleLanguageChange,
      handleGetHelp,
      handleExit,
    ]
  );

  const renderMenuItem = useCallback(
    (item: MenuItem) => {
      const isActive = menuState.activeItemId === item.id;
      const isHovered = menuState.hoveredItemId === item.id;

      const handleItemMouseEnter = () => handleItemHover(item.id);
      const handleItemMouseLeave = () => handleItemHover(null);
      const handleItemClick = () => handleMenuClick(item);

      return (
        <div
          key={item.id}
          className={`sidebar-menu__item ${
            isActive ? 'sidebar-menu__item--active' : ''
          }`}
          onClick={handleItemClick}
          onMouseEnter={handleItemMouseEnter}
          onMouseLeave={handleItemMouseLeave}
        >
          <MenuIcon
            icon={item.icon}
            isActive={isActive}
            isHovered={isHovered}
            isExpanded={menuState.isExpanded}
          />
          {menuState.isExpanded && (
            <span className='sidebar-menu__item-label'>{item.label}</span>
          )}
        </div>
      );
    },
    [
      menuState.activeItemId,
      menuState.hoveredItemId,
      menuState.isExpanded,
      handleItemHover,
      handleMenuClick,
    ]
  );

  const profileSection = useMemo(
    () => (
      <div className='sidebar-menu__profile'>
        <div
          className='sidebar-menu__profile-info'
          onClick={handleProfileClick}
          onMouseEnter={() => handleItemHover('profile')}
          onMouseLeave={() => handleItemHover(null)}
        >
          <div className='sidebar-menu__profile-avatar'>
            {avatarError ? (
              <div className='sidebar-menu__profile-fallback'>
                {defaultProfileInfo.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <img
                src={defaultProfileInfo.avatar}
                alt={defaultProfileInfo.name}
                className='sidebar-menu__profile-image'
                onError={handleAvatarError}
              />
            )}
          </div>
          {menuState.isExpanded && (
            <div className='sidebar-menu__profile-details'>
              <span className='sidebar-menu__profile-name'>
                {defaultProfileInfo.name}
              </span>
              <span className='sidebar-menu__profile-email'>
                {defaultProfileInfo.email}
              </span>
            </div>
          )}
        </div>
      </div>
    ),
    [
      menuState.isExpanded,
      handleProfileClick,
      handleItemHover,
      avatarError,
      handleAvatarError,
    ]
  );

  const mainMenuItems = useMemo(
    () => (
      <div className='sidebar-menu__main'>
        {defaultMenuItems.map(renderMenuItem)}
      </div>
    ),
    [renderMenuItem]
  );

  const bottomMenuItems = useMemo(
    () => (
      <div className='sidebar-menu__bottom'>
        {defaultBottomMenuItems.map(item => (
          <div
            key={item.id}
            className={`sidebar-menu__item sidebar-menu__item--bottom ${
              menuState.hoveredItemId === item.id
                ? 'sidebar-menu__item--hovered'
                : ''
            }`}
            onClick={() => handleBottomItemClick(item)}
            onMouseEnter={() => handleItemHover(item.id)}
            onMouseLeave={() => handleItemHover(null)}
          >
            <MenuIcon
              icon={item.icon}
              size='sm'
              isActive={false}
              isHovered={menuState.hoveredItemId === item.id}
              isExpanded={menuState.isExpanded}
            />
            {menuState.isExpanded && (
              <span className='sidebar-menu__item-label'>{item.label}</span>
            )}
          </div>
        ))}
      </div>
    ),
    [
      menuState.hoveredItemId,
      menuState.isExpanded,
      handleItemHover,
      handleBottomItemClick,
    ]
  );

  if (children) {
    return <>{children(renderProps)}</>;
  }

  return (
    <nav
      className={`sidebar-menu ${menuState.isExpanded ? 'sidebar-menu--expanded' : ''}`}
      onMouseEnter={handleMenuEnter}
      onMouseLeave={handleMenuLeave}
    >
      <div className='sidebar-menu__container'>
        {menuState.isExpanded && profileSection}
        {mainMenuItems}
        {menuState.isExpanded && bottomMenuItems}
      </div>
    </nav>
  );
};
