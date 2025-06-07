import { Keyboard } from '@imkdw-dev-client/consts';
import { useCallback, useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onSave: () => void;
}

export function useKeyboardShortcuts({ onSave }: UseKeyboardShortcutsProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ctrl + S 또는 Cmd + S로 저장
      if ((event.ctrlKey || event.metaKey) && event.key === Keyboard.S) {
        event.preventDefault();
        onSave();
      }
    },
    [onSave],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
