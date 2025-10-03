import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  size?: 'small' | 'normal' | 'large';
  color?: string;
}

const RippleEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    let rippleId = 0;

    const handleClick = (event: MouseEvent) => {
      if (!isEnabled) return;

      // Get the click coordinates relative to the viewport
      const x = event.clientX;
      const y = event.clientY;

      // Determine ripple characteristics based on target element
      const target = event.target as HTMLElement;
      let size: 'small' | 'normal' | 'large' = 'normal';
      let color = 'rgba(59, 130, 246, 0.6)'; // Default blue
      let duration = 800;

      // Customize ripple based on element type
      if (target.tagName === 'BUTTON') {
        size = 'small';
        color = 'rgba(34, 197, 94, 0.6)'; // Green for buttons
        duration = 600;
      } else if (target.closest('.chat-widget')) {
        color = 'rgba(168, 85, 247, 0.6)'; // Purple for chat
        duration = 700;
      } else if (target.closest('a, [role="button"]')) {
        size = 'small';
        color = 'rgba(59, 130, 246, 0.7)'; // Bright blue for links
        duration = 600;
      } else if (target.closest('header, nav')) {
        color = 'rgba(16, 185, 129, 0.5)'; // Teal for navigation
      }

      // Create a new ripple
      const newRipple: Ripple = {
        id: rippleId++,
        x,
        y,
        timestamp: Date.now(),
        size,
        color
      };

      // Add the ripple to the state
      setRipples(prev => [...prev, newRipple]);

      // Remove the ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, duration);
    };

    // Handle keyboard shortcuts to toggle ripple effect
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle with Ctrl/Cmd + R
      if ((event.ctrlKey || event.metaKey) && event.key === 'r' && event.shiftKey) {
        event.preventDefault();
        setIsEnabled(prev => !prev);
        
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = `Ripple Effect ${!isEnabled ? 'Enabled' : 'Disabled'}`;
        feedback.className = 'fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg z-[10000] transition-opacity duration-300';
        document.body.appendChild(feedback);
        
        setTimeout(() => {
          feedback.style.opacity = '0';
          setTimeout(() => document.body.removeChild(feedback), 300);
        }, 2000);
      }
    };

    // Add global click listener
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled]);

  const getRippleStyle = (ripple: Ripple) => {
    const baseSize = ripple.size === 'small' ? 15 : ripple.size === 'large' ? 25 : 20;
    const animationClass = ripple.size === 'small' ? 'animate-ripple-small' : 
                          ripple.size === 'large' ? 'animate-ripple-large' : 'animate-ripple';

    return {
      left: ripple.x - baseSize / 2,
      top: ripple.y - baseSize / 2,
      width: `${baseSize}px`,
      height: `${baseSize}px`,
      background: `radial-gradient(circle, ${ripple.color} 0%, ${ripple.color.replace('0.6', '0.3')} 50%, transparent 100%)`,
      transform: 'scale(0)',
      animation: `${animationClass.replace('animate-', '')} ${ripple.size === 'small' ? '0.6s' : ripple.size === 'large' ? '1s' : '0.8s'} cubic-bezier(0.4, 0, 0.2, 1) forwards`
    };
  };

  return (
    <>
      {isEnabled && (
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute rounded-full"
              style={getRippleStyle(ripple)}
            />
          ))}
        </div>
      )}
      
      {/* Ripple Status Indicator (only visible briefly when toggled) */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 pointer-events-none z-[9998]">
        {!isEnabled && (
          <div className="bg-gray-800 text-white px-2 py-1 rounded opacity-50">
            Ripple: Off (Ctrl+Shift+R to toggle)
          </div>
        )}
      </div>
    </>
  );
};

export default RippleEffect;