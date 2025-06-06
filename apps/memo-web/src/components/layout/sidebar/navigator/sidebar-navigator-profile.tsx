'use client';

import { useOAuth } from '@imkdw-dev-client/hooks';
import { OAuthModal } from '@imkdw-dev-client/ui';
import { useState } from 'react';
import { useAuthStore } from '../../../../stores/auth-store';
import { LoggedInProfile } from './logged-in-profile';
import { LoggedOutProfile } from './logged-out-profile';

export function SidebarNavigatorProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login: googleLogin } = useOAuth({ provider: 'google' });
  const { login: githubLogin } = useOAuth({ provider: 'github' });

  const { isLoggedIn, member } = useAuthStore();

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  // 로그인 상태에 따라 다른 컴포넌트 렌더링
  const ProfileComponent = isLoggedIn && member ? LoggedInProfile : LoggedOutProfile;

  return (
    <>
      <ProfileComponent member={member} onClick={handleLoginClick} />

      <OAuthModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        onGoogleLogin={googleLogin}
        onGithubLogin={githubLogin}
        // TODO: 다국어처리
        title='로그인'
        description='원하는 로그인 방법을 선택해주세요'
      />
    </>
  );
}
