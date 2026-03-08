import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { Camera, Upload, RefreshCw, Scan } from 'lucide-react'; // Assuming we have lucide-react or similar icons
import PalmGuide from './PalmGuide'; // We will create this shortly
import { theme } from '../../styles/theme';

const PalmScanner = ({ onScanComplete, isAnalyzing }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        startScanningEffect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate Scanning Effect before actual analysis
  const startScanningEffect = (imageData) => {
    setIsScanning(true);
    // Scanning animation runs for 3 seconds then triggers the callback
    setTimeout(() => {
      setIsScanning(false);
      if (onScanComplete) {
        onScanComplete(imageData);
      }
    }, 3000);
  };

  // Reset Logic
  const handleRetake = () => {
    setImagePreview(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      
      {/* Scanner Viewport */}
      <div className="relative w-full aspect-[3/4] max-w-sm rounded-3xl overflow-hidden bg-black/40 border-2 border-white/10 shadow-2xl">
        
        {/* Hidden Input for PWA Camera/Gallery Access */}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
        />

        <AnimatePresence>
          {!imagePreview ? (
            /* Empty State / Guide */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="absolute inset-0 opacity-30">
                {/* We will implement actual SVG guide in PalmGuide component */}
                <PalmGuide /> 
              </div>
              <div className="z-10 bg-black/60 backdrop-blur-sm p-4 rounded-2xl">
                <p className="text-white text-sm font-medium mb-2">Align your palm within the frame</p>
                <p className="text-gray-400 text-xs">Ensure good lighting and visible lines</p>
              </div>
            </motion.div>
          ) : (
            /* Image Preview */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="absolute inset-0"
            >
              <img 
                src={imagePreview} 
                alt="Palm Scan" 
                className="w-full h-full object-cover" 
              />
              
              {/* Scanning Laser Animation */}
              {(isScanning || isAnalyzing) && (
                <motion.div 
                  className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* Grid Overlay Effect during scan */}
              {(isScanning || isAnalyzing) && (
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-20 mix-blend-overlay z-10" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan Status Text */}
        {isScanning && (
          <div className="absolute bottom-6 left-0 right-0 text-center z-30">
            <span className="inline-block px-4 py-1 rounded-full bg-black/60 text-cyan-400 text-sm font-mono animate-pulse border border-cyan-500/30">
              SCANNING PALM LINES...
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full max-w-sm flex gap-4 px-4">
        {!imagePreview ? (
          <Button 
            variant="primary" 
            fullWidth 
            onClick={triggerCamera}
            leftIcon={<Camera size={20} />}
          >
            Scan Palm
          </Button>
        ) : (
          <>
            {!isScanning && !isAnalyzing && (
              <Button 
                variant="outline" 
                onClick={handleRetake}
                leftIcon={<RefreshCw size={18} />}
                className="flex-1"
              >
                Retake
              </Button>
            )}
            
            {!isScanning && !isAnalyzing && (
              <Button 
                variant="primary" 
                onClick={() => onScanComplete(imagePreview)}
                leftIcon={<Scan size={20} />}
                className="flex-1"
              >
                Analyze Now
              </Button>
            )}
          </>
        )}
      </div>

      {/* Upload Alternative */}
      {!imagePreview && (
        <button 
          onClick={triggerCamera} 
          className="text-gray-400 text-sm flex items-center gap-2 hover:text-white transition-colors"
        >
          <Upload size={14} /> or upload from gallery
        </button>
      )}

    </div>
  );
};

export default PalmScanner;
