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
}

export interface VoltageType {
  day: string;
  voltages: number[];
}
