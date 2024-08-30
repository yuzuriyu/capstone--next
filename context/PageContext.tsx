"use client";

import { createContext, useState, ReactNode } from "react";
import { PageContextType } from "@/app/interfaces";

interface PageContextProps {
  children: ReactNode;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

const PageContextProvider: React.FC<PageContextProps> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>("Overview");

  const handleActivePage = (page: string) => {
    setActivePage(page);
  };

  const value: PageContextType = {
    activePage,
    handleActivePage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageContextProvider;

export { PageContext, PageContextProvider };
