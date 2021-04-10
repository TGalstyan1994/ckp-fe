import React from 'react';

interface IComponentProps {
  value: string;
  onChange: (val: string) => void;
  error: string;
  placeholder: string;
  label: string;
  validate: (val: string) => boolean;
}

export const Input: React.FC<IComponentProps> = ({
  value,
  onChange,
  error,
  placeholder,
  label,
  validate,
}) => {
  return (
    <div>
      
    </div>
  )
}