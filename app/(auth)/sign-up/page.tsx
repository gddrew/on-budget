'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';

export default function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setError(error.message ?? 'Sign up failed');
      setIsPending(false);
      return;
    }

    window.location.href = '/';
  };

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'>
          <h1 className='font-bold text-3xl text-[#2E2A47]'>Welcome!</h1>
          <p className='text-base text-[#7E8CA0]'>
            Create your account to get started!
          </p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <form onSubmit={onSubmit} className='w-full max-w-sm space-y-4'>
            <Input
              type='text'
              placeholder='Name'
              autoComplete='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type='email'
              placeholder='Email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              placeholder='Password'
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='text-sm text-rose-500'>{error}</p>}
            <Button type='submit' className='w-full' disabled={isPending}>
              Sign up
            </Button>
            <p className='text-sm text-center text-muted-foreground'>
              Already have an account?{' '}
              <Link href='/sign-in' className='underline'>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className='h-full bg-blue-600 hidden lg:flex items-center justify-center'>
        <Image src='/logo.svg' height={100} width={100} alt='Logo' />
      </div>
    </div>
  );
}
