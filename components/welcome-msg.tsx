'use client';

import { authClient } from '@/lib/auth-client';

export const WelcomeMsg = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className='space-y-2 mb-4'>
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>
        Welcome Back{!isPending ? ', ' : ' '}
        {session?.user.name}{' '}
      </h2>
      <p className='text-sm lg:text-base text-[#89b6fd]'>
        This is your Financial Overview Report
      </p>
    </div>
  );
};
