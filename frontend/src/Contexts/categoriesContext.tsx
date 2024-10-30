import React, { createContext, useState, ReactNode } from "react";
import { CategorieProps, CategorieContextType } from "./categoriesType";

interface ChildrenProps {
  children: React.ReactNode;
}

export const CategoriesContext = createContext<CategorieContextType | null>(
  null
);

export const CategoriesContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [categList, setCategList] = useState<CategorieProps[]>([]);

  return (
    <CategoriesContext.Provider value={{ categList, setCategList }}>
      {children}
    </CategoriesContext.Provider>
  );
};
