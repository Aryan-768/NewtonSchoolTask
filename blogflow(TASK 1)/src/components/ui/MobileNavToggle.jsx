import React from 'react';
import Icon from '../AppIcon';

const MobileNavToggle = ({ isOpen = false, onToggle = () => {} }) => {
  return (
    <button
      onClick={onToggle}
      className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth hover-lift press-scale"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? "X" : "Menu"} 
        size={20} 
        className="text-foreground"
      />
    </button>
  );
};

export default MobileNavToggle;