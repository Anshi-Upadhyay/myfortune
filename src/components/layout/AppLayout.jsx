import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import SafeArea from './SafeArea';
import PageTransition from './PageTransition';
import CosmicBackground from '../ui/CosmicBackground';
import { useScrollToTop } from '../../hooks/useNavigation'; // Assuming we might add this later, or just use standard logic

const AppLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Screens where we want a completely full screen (no header/nav)
  const isFullScreen = 
    path === '/' || 
    path === '/splash' || 
    path === '/language' || 
    path === '/onboarding' || 
    path === '/profile-setup';

  // Screens where we might want Header but NO Bottom Nav (e.g. detailed flows)
  const hideBottomNav = 
    isFullScreen || 
    path.includes('/palm-scan') || 
    path.includes('/chat');

  // Screens where we hide the Header
  const hideHeader = isFullScreen;

  return (
    <CosmicBackground>
      <SafeArea className="flex flex-col h-full w-full overflow-hidden">
        
        {/* Top Header */}
        {!hideHeader && <Header title={getHeaderTitle(path)} />}

        {/* Main Content Area */}
        <main className="flex-1 relative w-full h-full overflow-hidden">
          <PageTransition>
            <div className={`w-full h-full overflow-y-auto overflow-x-hidden ${!hideBottomNav ? 'pb-24' : ''}`}>
              {children}
            </div>
          </PageTransition>
        </main>

        {/* Bottom Navigation Bar */}
        {!hideBottomNav && <BottomNavigation />}
        
      </SafeArea>
    </CosmicBackground>
  );
};

// Helper to determine header title based on route
const getHeaderTitle = (path) => {
  if (path.includes('/home')) return 'Home';
  if (path.includes('/tarot')) return 'Tarot Reading';
  if (path.includes('/horoscope')) return 'Horoscope';
  if (path.includes('/daily')) return 'Daily Guidance';
  if (path.includes('/settings')) return 'Settings';
  if (path.includes('/love')) return 'Love Compatibility';
  return '';
};

export default AppLayout;
