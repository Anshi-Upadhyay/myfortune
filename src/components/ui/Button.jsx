import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import Loader from './Loader'; // We will create this shortly, but referencing it now
import { triggerHaptic } from '../../utils/helpers';

const Button = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, outline, ghost, glass
  size = 'md', // sm, md, lg
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  type = 'button',
  className = '',
  ...props
}) => {
  
  // Base styles
  const baseStyles = `
    relative inline-flex items-center justify-center 
    font-medium transition-all duration-200 overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Size variations
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-2xl',
    md: 'px-6 py-3 text-base rounded-3xl', // Large rounded corners as per design
    lg: 'px-8 py-4 text-lg rounded-3xl',
  };

  // Variant styles
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 
      text-white shadow-lg shadow-purple-500/30 
      border border-transparent
      hover:shadow-cyan-500/40 hover:from-blue-500 hover:to-purple-500
    `,
    secondary: `
      bg-gray-800 text-white border border-gray-700
      hover:bg-gray-700 hover:border-gray-600
    `,
    outline: `
      bg-transparent border-2 border-cyan-500/50 text-cyan-400
      hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300
      shadow-[0_0_10px_rgba(34,211,238,0.2)]
    `,
    ghost: `
      bg-transparent text-gray-300 hover:text-white hover:bg-white/5
    `,
    glass: `
      backdrop-blur-md bg-white/10 border border-white/20 text-white
      shadow-card hover:bg-white/20
    `
  };

  // Handle click with haptics
  const handleClick = (e) => {
    if (!isLoading && !disabled && onClick) {
      triggerHaptic();
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.96 }}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Background Glow for Primary */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Loading State */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </span>
      )}

      {/* Content */}
      <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </span>
    </motion.button>
  );
};

export default Button;
