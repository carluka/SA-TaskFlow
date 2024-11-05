import React, { useState, createContext, ReactNode } from "react";
import { AddCategoryType } from "./addCategoryType";

export interface ChildrenProps {
  children: React.ReactNode;
}

export const AddCategoryContext = createContext<AddCategoryType | null>(null);

export const AddCategoryContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [id, setId] = useState(0);

  return (
    <AddCategoryContext.Provider
      value={{ showAddCategory, setShowAddCategory, id, setId }}
    >
      {children}
    </AddCategoryContext.Provider>
  );
};
