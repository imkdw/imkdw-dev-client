import { toast } from 'sonner';
import { ErrorMessages } from '../../consts/src/exception/exception.const';

/**
 * 성공 메시지를 표시하는 toast
 */
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

/**
 * 에러 메시지를 표시하는 toast
 */
export const showErrorToast = (message: string) => {
  toast.error(message);
};

/**
 * 정보 메시지를 표시하는 toast
 */
export const showInfoToast = (message: string) => {
  toast.info(message);
};

/**
 * 경고 메시지를 표시하는 toast
 */
export const showWarningToast = (message: string) => {
  toast.warning(message);
};

/**
 * 로딩 토스트를 표시하고 토스트 ID를 반환
 */
export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

/**
 * 특정 toast를 닫기
 */
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

/**
 * 모든 toast를 닫기
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};

/**
 * API 에러 응답에 따른 에러 toast 표시
 */
export const showApiErrorToast = (error: unknown) => {
  // API 에러 객체에서 에러코드 우선 확인
  if (error && typeof error === 'object' && 'apiError' in error) {
    const apiError = (error as { apiError?: { code?: string; message?: string } }).apiError;

    // 에러코드가 있으면 ErrorMessages에서 매핑된 메시지 사용
    if (apiError?.code && apiError.code in ErrorMessages) {
      showErrorToast(ErrorMessages[apiError.code as keyof typeof ErrorMessages]);
      return;
    }

    // 에러코드는 없지만 메시지가 있으면 그대로 사용
    if (apiError?.message) {
      showErrorToast(apiError.message);
      return;
    }
  }

  // 일반 에러 객체의 메시지 확인
  if (error && typeof error === 'object' && 'message' in error) {
    showErrorToast(error.message as string);
  } else if (typeof error === 'string') {
    showErrorToast(error);
  } else {
    showErrorToast('알 수 없는 오류가 발생했습니다.');
  }
};
