import React from "react";
import { DeleteContextProvider } from "./Contexts/deleteContext";
import { TaskListContextProvider } from "./Contexts/taskListContext";
import { ChildrenProps } from "./Contexts/deleteContext";
import { CategoriesContextProvider } from "./Contexts/categoriesContext";
import { AddContextProvider } from "./Contexts/addContext";
import { AuthProvider } from "./Contexts/authContext";
import { AddCategoryContextProvider } from "./Contexts/addCategoryContext";

const ContextProviders: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <TaskListContextProvider>
      <DeleteContextProvider>
        <AddContextProvider>
          <AddCategoryContextProvider>
            <CategoriesContextProvider>
              <AuthProvider>{children}</AuthProvider>
            </CategoriesContextProvider>
          </AddCategoryContextProvider>
        </AddContextProvider>
      </DeleteContextProvider>
    </TaskListContextProvider>
  );
};

export default ContextProviders;
