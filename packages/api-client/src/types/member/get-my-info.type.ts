import { MemberRole } from '@imkdw-dev-client/consts';

export interface ResponseGetMyInfo {
  id: string;
  email: string;
  role: keyof typeof MemberRole;
  nickname: string;
  profileImage: string;
}
