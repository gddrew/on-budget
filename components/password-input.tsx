'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input, InputProps } from '@/components/ui/input';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'type'>
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        type={isVisible ? 'text' : 'password'}
        className={cn('pr-10', className)}
        ref={ref}
        {...props}
      />
      <button
        type='button'
        onClick={() => setIsVisible((v) => !v)}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        aria-pressed={isVisible}
        className='absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground'
      >
        {isVisible ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
      </button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';
