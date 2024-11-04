import React, { useState, createContext, ReactNode } from "react";
import { AddType } from "./addType";

export interface ChildrenProps {
  children: React.ReactNode;
}

export const AddContext = createContext<AddType | null>(null);

export const AddContextProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [id, setId] = useState(0);
  const [task, setTask] = useState(null);

  return (
    <AddContext.Provider
      value={{ showAdd, setShowAdd, id, setId, task, setTask }}
    >
      {children}
    </AddContext.Provider>
  );
};
