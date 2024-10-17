import React from 'react';
import { Button } from './ui/Button';

interface TwitterPostButtonProps {
  onPost: () => Promise<void>;
  disabled?: boolean;
}

export const TwitterPostButton: React.FC<TwitterPostButtonProps> = ({ onPost, disabled }) => {
  return (
    <Button onClick={onPost} disabled={disabled}>
      Post to Twitter
    </Button>
  );
};