import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 shadow-lg shadow-indigo-500/50';
      case 'secondary':
        return 'bg-zinc-800 border border-zinc-700';
      case 'outline':
        return 'bg-transparent border border-indigo-500';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'bg-indigo-600';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return 'text-zinc-300';
      case 'outline':
        return 'text-indigo-400';
      case 'ghost':
        return 'text-zinc-500';
      default:
        return 'text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4 rounded-lg';
      case 'md':
        return 'py-4 px-6 rounded-xl';
      case 'lg':
        return 'py-5 px-8 rounded-2xl';
      default:
        return 'py-4 px-6 rounded-xl';
    }
  };

  const getLabelSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={onPress}
      className={`${getVariantStyles()} ${getSizeStyles()} items-center justify-center ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text className={`${getTextStyles()} ${getLabelSize()} font-black italic`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
