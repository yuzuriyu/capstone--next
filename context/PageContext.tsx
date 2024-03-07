"use client";

import { PageContextType } from "@/app/interfaces";
import { createContext, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

const PageContextProvider: React.FC<Props> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>("overview");

  const handleActivePage = (page: string) => {
    setActivePage(page);
  };

  const value = {
    activePage,
    handleActivePage,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export default PageContextProvider;

export { PageContext, PageContextProvider };
