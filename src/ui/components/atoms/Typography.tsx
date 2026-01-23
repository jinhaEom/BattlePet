import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface CustomTextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'white' | 'zinc-400' | 'zinc-500' | 'zinc-800' | 'indigo-400' | 'indigo-500' | 'red-500' | 'amber-400' | 'orange-400' | 'cyan-400' | 'yellow-400' | 'emerald-400';
  italic?: boolean;
  bold?: boolean;
  black?: boolean;
  tracking?: 'tighter' | 'normal' | 'widest';
  uppercase?: boolean;
  className?: string;
}

const Typography: React.FC<CustomTextProps> = ({
  children,
  variant = 'body',
  color = 'white',
  italic = false,
  bold = false,
  black = false,
  tracking = 'normal',
  uppercase = false,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'h1': return 'text-4xl';
      case 'h2': return 'text-3xl';
      case 'h3': return 'text-xl';
      case 'caption': return 'text-[10px]';
      case 'label': return 'text-xs';
      default: return 'text-base';
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'white': return 'text-white';
      case 'zinc-400': return 'text-zinc-400';
      case 'zinc-500': return 'text-zinc-500';
      case 'indigo-400': return 'text-indigo-400';
      case 'indigo-500': return 'text-indigo-500';
      case 'red-500': return 'text-red-500';
      case 'zinc-800': return 'text-zinc-800';
      case 'amber-400': return 'text-amber-400';
      case 'orange-400': return 'text-orange-400';
      case 'cyan-400': return 'text-cyan-400';
      case 'yellow-400': return 'text-yellow-400';
      case 'emerald-400': return 'text-emerald-400';
      default: return 'text-white';
    }
  };

  const getTrackingStyles = () => {
    switch (tracking) {
      case 'tighter': return 'tracking-tighter';
      case 'widest': return 'tracking-widest';
      default: return '';
    }
  };

  const fontStyle = `${black ? 'font-black' : bold ? 'font-bold' : 'font-medium'} ${italic ? 'italic' : ''}`;
  const caseStyle = uppercase ? 'uppercase' : '';

  return (
    <RNText
      className={`${getVariantStyles()} ${getColorStyles()} ${getTrackingStyles()} ${fontStyle} ${caseStyle} ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Typography;
