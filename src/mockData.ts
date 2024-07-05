// src/mockData.ts

import { UserProfile } from './types';

export const mockUserProfile: UserProfile = {
  username: 'adelsultan',
  displayName: 'Adel Sultan',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Welcome to my Linktree clone',
  links: [
    { id: '1', title: 'Link 1', url: 'https://link1.com' },
    { id: '2', title: 'Link 2', url: 'https://link2.com' },
    { id: '3', title: 'Link 3', url: 'https://link3.com' },
  ],
  socialLinks: [
    { platform: 'Twitter', url: 'https://twitter.com/adelsultan', icon: 'twitter-icon' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/adelsultan', icon: 'linkedin-icon' },
  ],
  theme: 'light',
};
