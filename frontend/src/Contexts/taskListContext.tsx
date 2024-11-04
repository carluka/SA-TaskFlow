import React, { useState, createContext, ReactNode, useEffect } from "react";
import { TaskProps, TaskListType } from "./taskType";

interface ChildrenProps {
  children: React.ReactNode;
}

export const TaskListContext = createContext<TaskListType | null>(null);

export const TaskListContextProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);

  const [doneTasks, setDoneTasks] = useState<TaskProps[]>([]);
  const [notDoneTasks, setNotDoneTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    setDoneTasks(
      taskList.filter((task: TaskProps) => task.opravljeno === true)
    );
    setNotDoneTasks(
      taskList.filter((task: TaskProps) => task.opravljeno === false)
    );
  }, [taskList]);

  const addAllTasks = (tasks: TaskProps[]) => {
    setTaskList(tasks);
  };

  const addTask = (task: TaskProps) => {
    setTaskList([task, ...taskList]);
    setNotDoneTasks([...notDoneTasks, task]);
  };

  const editTask = (updatedTask: TaskProps) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTaskList);
    setDoneTasks(updatedTaskList.filter((task) => task.opravljeno === true));
    setNotDoneTasks(
      updatedTaskList.filter((task) => task.opravljeno === false)
    );
  };

  const checkTask = (id: number) => {
    taskList.filter((task: TaskProps) => {
      if (task.id === id) {
        task.opravljeno = !task.opravljeno;
        setTaskList([...taskList]);
        setDoneTasks(
          taskList.filter((task: TaskProps) => task.opravljeno == true)
        );
        setDoneTasks(
          taskList.filter((task: TaskProps) => task.opravljeno != true)
        );
      }
    });
  };

  const deleteTask = (id: number) => {
    const index = taskList.findIndex((task: TaskProps) => task.id == id);
    taskList.splice(index, 1);
    setTaskList([...taskList]);
    setDoneTasks(taskList.filter((task: TaskProps) => task.opravljeno == true));
    setNotDoneTasks(
      taskList.filter((task: TaskProps) => task.opravljeno != true)
    );
  };

  const clearAllTasks = () => {
    setTaskList([]);
    setDoneTasks([]);
    setNotDoneTasks([]);
  };

  return (
    <TaskListContext.Provider
      value={{
        taskList,
        doneTasks,
        notDoneTasks,
        addAllTasks,
        addTask,
        checkTask,
        deleteTask,
        clearAllTasks,
        editTask,
      }}
    >
      {children}
    </TaskListContext.Provider>
  );
};
