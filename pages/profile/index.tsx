import React from 'react';
import Profile from '../../src/components/Profile/Profile';
import { AuthCheck } from '../../src/components/AuthCheck';

const ProfilePage = () => {
  return (
    <AuthCheck>
      <Profile />
    </AuthCheck>
  );
};

export default ProfilePage;