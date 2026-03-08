import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CosmicBackground from '../components/ui/CosmicBackground';
import PalmLogo from '../assets/images/PalmLogo'; // We'll create this asset later
import { useNavigation } from '../hooks/useNavigation';
import { theme } from '../styles/theme';

const SplashScreen = () => {
  const { replace } = useNavigation();

  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading time for assets/resources
      await new Promise(resolve => setTimeout(resolve, 2500));

      // check local storage for onboarding status
      const hasSelectedLanguage = localStorage.getItem('app_language');
      const hasOnboarded = localStorage.getItem('app_onboarding_complete');
      const hasProfile = localStorage.getItem('user_profile');

      if (!hasSelectedLanguage) {
        replace('/language');
      } else if (!hasOnboarded) {
        replace('/onboarding');
      } else if (!hasProfile) {
        replace('/profile-setup');
      } else {
        replace('/home');
      }
    };

    initializeApp();
  }, [replace]);

  return (
    <CosmicBackground className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">
      
      {/* Logo Container with Glow */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Animated Glow behind logo */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl opacity-30"
          />
          
          {/* Main Logo */}
          <div className="w-40 h-40 md:w-56 md:h-56 relative z-10 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
             {/* Placeholder until asset is created, effectively acting as the logo */}
             <PalmLogo className="w-full h-full text-white" />
          </div>
        </motion.div>

        {/* Text Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-200 tracking-wider font-heading">
            AI PALM
          </h1>
          <p className="text-cyan-400/80 tracking-[0.3em] text-sm mt-2 uppercase">
            Reader & Guide
          </p>
        </motion.div>
      </div>

      {/* Loading Indicator at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12"
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.4, 1, 0.4] 
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>

    </CosmicBackground>
  );
};

export default SplashScreen;
