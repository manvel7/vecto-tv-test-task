import { useState, useCallback } from 'react';
import { MenuState, MenuItem } from '@/entities/menu';

export const useMenuState = (initialActiveItemId: string = 'home') => {
  const [menuState, setMenuState] = useState<MenuState>({
    isExpanded: false,
    activeItemId: initialActiveItemId,
    hoveredItemId: null,
  });

  const setExpanded = useCallback((isExpanded: boolean) => {
    setMenuState(prev => ({ ...prev, isExpanded }));
  }, []);

  const setActiveItem = useCallback((itemId: string | null) => {
    setMenuState(prev => ({ ...prev, activeItemId: itemId }));
  }, []);

  const setHoveredItem = useCallback((itemId: string | null) => {
    setMenuState(prev => ({ ...prev, hoveredItemId: itemId }));
  }, []);

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      setActiveItem(item.id);
      if (window.innerWidth <= 1024) {
        setExpanded(false);
      }
    },
    [setActiveItem, setExpanded]
  );

  const handleItemHover = useCallback(
    (itemId: string | null) => {
      setHoveredItem(itemId);
    },
    [setHoveredItem]
  );

  const handleMenuHover = useCallback(
    (isHovered: boolean) => {
      setExpanded(isHovered);
    },
    [setExpanded]
  );

  return {
    menuState,
    setExpanded,
    setActiveItem,
    setHoveredItem,
    handleItemClick,
    handleItemHover,
    handleMenuHover,
  };
};
