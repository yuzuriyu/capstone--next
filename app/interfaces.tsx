export interface PageContextType {
  activePage: string;
  handleActivePage: (page: string) => void;
}

export interface ToggleMenuProps {
  handleToggleMenu: () => void;
}

export interface Inquiry {
  _id: string;
  senderEmail: string;
  recipientEmail: string;
  senderName: string;
  message: string;
  timeStamp: string;
  profilePicture?: string;
  subject: string;
  adminPrivilege?: boolean;
}

export interface VoltageType {
  day: string;
  voltages: number[];
}

export interface BadgeType {
  badgeId: string;
  name: string;
  description: string;
  imgUrl: string;
  completed: boolean;
}

export interface User {
  username?: string;
  bio?: string; // Allow bio to be undefined
  profilePicture?: string;
  email?: string;
  coverPhoto?: string;
  badges?: any[];
  role?: string;
}

export interface Session {
  user: User;
}

export interface EmailData {
  senderName: string;
  senderEmail: string;
  profilePicture?: string;
  timeStamp: string;
  subject: string;
  message: string;
}
