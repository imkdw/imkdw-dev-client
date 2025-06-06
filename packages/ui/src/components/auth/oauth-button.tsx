import { cn } from '@imkdw-dev-client/utils';
import { ReactNode } from 'react';

interface OAuthButtonProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
  ariaLabel: string;
}

export function OAuthButton({ icon, text, onClick, ariaLabel }: OAuthButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex w-full items-center justify-center gap-4 rounded-md border border-gray-600 bg-[#2D2D2D] px-4 py-3 text-base font-medium text-gray-200',
        'transition-colors hover:bg-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1E1E1E]',
      )}
      aria-label={ariaLabel}
    >
      {icon}
      {text}
    </button>
  );
}
