import React, { useCallback, memo } from 'react';
import { SidebarMenu } from '@/widgets/SidebarMenu';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = memo(({ children }) => {
  const handleMenuClick = useCallback(() => {
    // Menu item click handler
  }, []);

  const handleProfileClick = useCallback(() => {
    // Profile click handler
  }, []);

  const handleLanguageChange = useCallback(() => {
    // Language change handler
  }, []);

  const handleGetHelp = useCallback(() => {
    // Get help handler
  }, []);

  const handleExit = useCallback(() => {
    // Exit handler
  }, []);

  return (
    <div className='layout'>
      <SidebarMenu
        onItemClick={handleMenuClick}
        onProfileClick={handleProfileClick}
        onLanguageChange={handleLanguageChange}
        onGetHelp={handleGetHelp}
        onExit={handleExit}
      />
      <main className='layout__content'>{children}</main>
    </div>
  );
});

Layout.displayName = 'Layout';
