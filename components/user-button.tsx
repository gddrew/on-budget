'use client';

import { LogOut } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export const UserButton = () => {
  const onSignOut = async () => {
    await authClient.signOut();
    window.location.href = '/sign-in';
  };

  return (
    <Button
      size='sm'
      variant='ghost'
      onClick={onSignOut}
      className='text-white hover:bg-white/20 hover:text-white'
    >
      <LogOut className='size-4 mr-2' />
      Sign out
    </Button>
  );
};
