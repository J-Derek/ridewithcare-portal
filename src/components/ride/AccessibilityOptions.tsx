
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Accessibility, HandMetal, Speech, Eye, Zap } from 'lucide-react';

type AccessibilityOptionProps = {
  icon: React.ElementType;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
};

const AccessibilityOption = ({
  icon: Icon,
  label,
  description,
  isSelected,
  onClick,
}: AccessibilityOptionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative p-4 rounded-xl cursor-pointer transition-all duration-300",
        "border-2 shadow-sm",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/30 hover:bg-secondary"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "p-2 rounded-full",
          isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
        )}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-medium">{label}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className={cn(
          "absolute right-4 top-4 w-4 h-4 rounded-full border-2",
          isSelected 
            ? "border-primary bg-primary" 
            : "border-muted-foreground/30"
        )}>
          {isSelected && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface AccessibilityOptionsProps {
  onOptionsChange: (options: string[]) => void;
}

const AccessibilityOptions = ({ onOptionsChange }: AccessibilityOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    {
      id: 'wheelchair',
      icon: Accessibility,
      label: 'Wheelchair Access',
      description: 'Vehicle with ramp or lift for wheelchair users'
    },
    {
      id: 'mobility',
      icon: HandMetal,
      label: 'Mobility Assistance',
      description: 'Driver assistance for transfers and boarding'
    },
    {
      id: 'visual',
      icon: Eye,
      label: 'Visual Impairment',
      description: 'Verbal announcements and direct assistance'
    },
    {
      id: 'audio',
      icon: Speech,
      label: 'Hearing Assistance',
      description: 'Text communication and visual alerts'
    },
    {
      id: 'quick',
      icon: Zap,
      label: 'Minimized Wait Time',
      description: 'Priority matching for urgent rides'
    }
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const newOptions = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId];
      
      // Call the callback with updated options
      onOptionsChange(newOptions);
      return newOptions;
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Accessibility Requirements</h2>
        <p className="text-muted-foreground">Select the options that match your needs for this ride</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {options.map(option => (
          <AccessibilityOption
            key={option.id}
            icon={option.icon}
            label={option.label}
            description={option.description}
            isSelected={selectedOptions.includes(option.id)}
            onClick={() => toggleOption(option.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessibilityOptions;
