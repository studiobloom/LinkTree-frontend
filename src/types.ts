// src/types.ts

// Define the structure for a single link
export type Link = {
  id: string;
  title: string;
  url: string;
  icon?: string; // Optional: for link icons
};

// Define the structure for social media links
export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

// Define the structure for the user profile
export type UserProfile = {
  username: string;
  displayName?: string;
  avatar: string;
  bio?: string;
  links: Link[];
  socialLinks?: SocialLink[];
  theme?: string; // Optional: for customizable themes
};

// Define props for the HomePage component
export type HomePageProps = {
  profile: UserProfile;
};

// Define props for a Link component (if you create one)
export type LinkProps = {
  link: Link;
  onClick?: (url: string) => void;
};

// Define props for a Profile component (if you create one)
export type ProfileProps = {
  profile: UserProfile;
};

// Define a type for theme options (if you implement theming)
export type ThemeType = 'light' | 'dark' | 'custom';

// Define a type for analytics data (if you implement click tracking)
export type LinkClickData = {
  linkId: string;
  clickedAt: Date;
};

// Define a type for app settings (if you implement user preferences)
export type AppSettings = {
  theme: ThemeType;
  showSocialLinks: boolean;
  // Add any other app-wide settings here
};


export type User = {
  _id: string;
  email: string;
  username: string;
 
};

