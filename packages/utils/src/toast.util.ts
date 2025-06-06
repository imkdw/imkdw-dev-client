import { toast } from 'sonner';
import { ErrorMessages } from '../../consts/src/exception/exception.const';

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};

export const showWarningToast = (message: string) => {
  toast.warning(message);
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

export const dismissAllToasts = () => {
  toast.dismiss();
};
export const showApiErrorToast = (error: unknown) => {
  if (error && typeof error === 'object' && 'apiError' in error) {
    const apiError = (error as { apiError?: { code?: string; message?: string } }).apiError;

    if (apiError?.code && apiError.code in ErrorMessages) {
      showErrorToast(ErrorMessages[apiError.code as keyof typeof ErrorMessages]);
      return;
    }

    if (apiError?.message) {
      showErrorToast(apiError.message);
      return;
    }
  }

  if (error && typeof error === 'object' && 'message' in error) {
    showErrorToast(error.message as string);
  } else if (typeof error === 'string') {
    showErrorToast(error);
  } else {
    showErrorToast('알 수 없는 오류가 발생했습니다.');
  }
};
