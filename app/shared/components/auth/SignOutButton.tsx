import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '~/context/authContext';

const SignOutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // đường dẫn login
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
