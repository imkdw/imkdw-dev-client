const MemoFolderErrors = {
  MF0000: '메모 폴더 이름이 유효하지 않습니다.',
  MF0001: '메모 폴더 이름이 중복됩니다.',
  MF0002: '메모 폴더를 찾을 수 없습니다.',
};

const MemoErrors = {
  M0000: '메모 이름이 중복됩니다.',
  M0001: '메모를 찾을 수 없습니다.',
  M0002: '메모 이름이 유효하지 않습니다.',
  M0003: '메모 이미지가 유효하지 않습니다.',
};

const AuthErrors = {
  A0000: '로그인에 실패했습니다.',
  A0001: '지원하지 않는 소셜 로그인 제공자입니다.',
  A0002: '유효하지 않은 토큰입니다.',
  A0003: '토큰이 만료되었습니다.',
};

const MemberErrors = {
  MB0000: '회원을 찾을 수 없습니다.',
};

export const ErrorMessages = {
  ...MemoFolderErrors,
  ...MemoErrors,
  ...AuthErrors,
  ...MemberErrors,
};
