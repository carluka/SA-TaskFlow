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

  const addCat = (cat: CategorieProps) => {
    categList.push(cat);
    setCategList([...categList]);
  };

  return (
    <CategoriesContext.Provider value={{ categList, setCategList, addCat }}>
      {children}
    </CategoriesContext.Provider>
  );
};
