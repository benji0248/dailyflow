// components/ProfileHeader.tsx
import React from 'react';
import Avatar from '../../../components/avatarPhoto/avatarPhoto';

interface ProfileHeaderProps {
  name: string;
  progress: number; // 0 a 100
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, progress }) => {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="h-50 bg-gray-100 relative">
        {/* Avatar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
          <Avatar name={name} />
        </div>
      </div>

      {/* Progreso semanal */}
      <div className="mt-2 px-4">
        <div className="text-center text-lg text-gray-600 mb-1">Progreso semanal</div>
        <div className="w-1/2 mx-auto bg-gray-200 rounded-full h-6 relative overflow-hidden shadow-inner">
        <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-md flex items-center justify-center text-white text-sm font-semibold transition-all duration-300"
            style={{ width: `${progress}%` }}
        >
            {progress}%
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
