'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import * as React from 'react';

const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={`fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] ${className ?? ''}`}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
    variant?: 'default' | 'destructive';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={`group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full
      ${variant === 'default' && 'border bg-background text-foreground'}
      ${variant === 'destructive' && 'destructive group border-destructive bg-destructive text-destructive-foreground'}
      ${className ?? ''}`}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={`inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive ${className ?? ''}`}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={`absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 ${className ?? ''}`}
    toast-close=''
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={`text-sm font-semibold ${className ?? ''}`} {...props} />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={`text-sm opacity-90 ${className ?? ''}`} {...props} />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

// useToast 훅과 Toaster 컴포넌트는shadcn/ui의 것을 참고하여 단순화했습니다.
// 실제 사용 시에는 상태 관리 라이브러리 (zustand, jotai 등) 또는 React Context를 사용하여
// 애플리케이션 전역에서 토스트를 쉽게 띄울 수 있도록 확장하는 것이 좋습니다.

interface ToastNotification {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  duration?: number;
  variant?: 'default' | 'destructive';
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000; // 실제로는 더 짧은 시간을 사용해야 합니다.

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const reducer = (
  state: ToasterToast[],
  action:
    | { type: 'ADD_TOAST'; toast: ToasterToast }
    | { type: 'UPDATE_TOAST'; toast: Partial<ToasterToast> }
    | { type: 'DISMISS_TOAST'; toastId?: string }
    | { type: 'REMOVE_TOAST'; toastId?: string },
) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [action.toast, ...state].slice(0, TOAST_LIMIT);

    case 'UPDATE_TOAST':
      return state.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t));

    case 'DISMISS_TOAST': {
      const { toastId } = action;
      return state.map((t) => (t.id === toastId || toastId === undefined ? { ...t, open: false } : t));
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return [];
      }
      return state.filter((t) => t.id !== action.toastId);
    default:
      return state;
  }
};

const listeners: Array<(toast: ToastNotification) => void> = [];

let memoryState: ToasterToast[] = [];

function dispatch(action: Parameters<typeof reducer>[1]) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState[0]); // 가장 최근 토스트만 알림
  });
}

function toast(props: Omit<ToasterToast, 'id'>) {
  const id = crypto.randomUUID();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<ToasterToast | undefined>(memoryState[0]);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
    currentToast: state, // 현재 표시되고 있는 토스트 (가장 최근 것 하나)
  };
}

function Toaster() {
  const { currentToast } = useToast();
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]); // 화면에 표시될 토스트 목록

  React.useEffect(() => {
    // currentToast가 변경되면 toasts 상태를 업데이트
    // 이 로직은 단일 토스트만 표시하도록 단순화되었습니다.
    // 여러 토스트를 동시에 표시하려면 이 부분을 수정해야 합니다.
    if (currentToast) {
      setToasts([currentToast]); // 항상 새로운 토스트로 교체 (하나만 표시)
    } else {
      setToasts([]);
    }
  }, [currentToast]);

  React.useEffect(() => {
    const timers = new Map<string, number>();

    const anObserver = new MutationObserver(() => {
      const newToasts = Array.from(document.querySelectorAll('.ToastRoot[data-state="open"]'))
        .map((el) => el.getAttribute('data-toast-id'))
        .filter(Boolean) as string[];

      const toastsToRemove = toasts.filter((t) => t.open && !newToasts.includes(t.id));

      toastsToRemove.forEach((toast) => {
        if (!timers.has(toast.id)) {
          const timer = window.setTimeout(() => {
            dispatch({ type: 'REMOVE_TOAST', toastId: toast.id });
            timers.delete(toast.id);
          }, TOAST_REMOVE_DELAY);
          timers.set(toast.id, timer);
        }
      });
    });

    if (typeof document !== 'undefined') {
      const viewport = document.querySelector('.ToastViewport');
      if (viewport) {
        anObserver.observe(viewport, { childList: true, attributes: true, attributeFilter: ['data-state'] });
      }
    }

    return () => {
      anObserver.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [toasts]);

  if (!toasts.length) {
    return null;
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} data-toast-id={id} variant={variant}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toast,
  useToast,
  Toaster,
};
