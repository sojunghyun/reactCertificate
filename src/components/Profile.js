import React from 'react';

function Profile({ user }) {
  const { email, password, name } = user || {};
  return (
    <>      
      <div>{name}님! 환영합니다!</div>
    </>
  );
}

export default Profile;