import React, { createContext, useState, ReactNode } from "react";
import { CategoryProps, CategoryContextType } from "./categoriesType";

interface ChildrenProps {
  children: React.ReactNode;
}

export const CategoriesContext = createContext<CategoryContextType | null>(
  null
);

export const CategoriesContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [categList, setCategList] = useState<CategoryProps[]>([]);

  const addCat = (cat: CategoryProps) => {
    categList.push(cat);
    setCategList([...categList]);
  };

  return (
    <CategoriesContext.Provider value={{ categList, setCategList, addCat }}>
      {children}
    </CategoriesContext.Provider>
  );
};
