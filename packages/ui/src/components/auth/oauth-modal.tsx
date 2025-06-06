'use client';

import { cn } from '@imkdw-dev-client/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { OAuthButton } from './oauth-button';

interface OAuthModalProps {
  open?: boolean;
  onClose?: (open: boolean) => void;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  title: string;
  description: string;
}

export function OAuthModal({ open, onClose, onGoogleLogin, onGithubLogin, title, description }: OAuthModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70' />
        <Dialog.Content
          // 기본 포커스 비활성화
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-600 bg-[#1E1E1E] p-6 text-white shadow-lg',
            'focus:outline-none',
          )}
        >
          <Dialog.Title className='mb-2 text-2xl font-semibold'>{title}</Dialog.Title>
          <Dialog.Description className='mb-7 text-base text-gray-400'>{description}</Dialog.Description>

          <div className='flex flex-col space-y-4'>
            <OAuthButton
              icon={<FcGoogle size={24} />}
              text='Sign in with Google'
              onClick={onGoogleLogin}
              ariaLabel='Google OAuth Login'
            />
            <OAuthButton
              icon={<BsGithub size={24} />}
              text='Sign in with GitHub'
              onClick={onGithubLogin}
              ariaLabel='Github OAuth Login'
            />
          </div>

          <Dialog.Close asChild>
            <button
              type='button'
              className='absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-[#3C3C3C] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500'
              aria-label='Close OAuth Modal'
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
