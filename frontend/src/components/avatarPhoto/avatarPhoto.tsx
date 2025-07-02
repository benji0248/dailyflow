// components/Avatar.tsx
import React from "react";

interface AvatarProps {
  name: string;
  imageUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUrl }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative w-28 h-28">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1"></div>
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-black text-2xl font-bold overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
