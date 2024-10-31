import React, { useState, createContext, ReactNode } from "react";
import { AddCategorieType } from "./addCategorieType";

export interface ChildrenProps {
  children: React.ReactNode;
}

export const AddCategorieContext = createContext<AddCategorieType | null>(null);

export const AddCategorieContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [showAddCategorie, setShowAddCategorie] = useState(false);
  const [id, setId] = useState(0);

  return (
    <AddCategorieContext.Provider
      value={{ showAddCategorie, setShowAddCategorie, id, setId }}
    >
      {children}
    </AddCategorieContext.Provider>
  );
};
