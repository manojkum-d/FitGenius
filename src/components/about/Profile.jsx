// Profile.js
import React from 'react';

const Profile = ({ username, email }) => {
  return (
    <div>
      <h1>Welcome, {username}</h1>
      <p>Email: {email}</p>
      
    </div>
  );
}

export default Profile;
