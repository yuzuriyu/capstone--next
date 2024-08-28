export interface PageContextType {
  activePage: string;
  handleActivePage: (page: string) => void;
}

export interface ToggleMenuProps {
  handleToggleMenu: () => void;
}

export interface InquiriesType {
  name: string;
  email: string;
  subject: string;
  message: string;
  profilePicture: string;
  timestamp: string;
}

export interface VoltageType {
  day: string;
  voltages: number[];
}

export interface BadgeType {
  badge_id: string;
  name: string;
  description: string;
  imgUrl: string;
  completed: boolean;
}
