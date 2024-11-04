export interface TaskProps{
    id: number;
    naziv: string;
    opis: string;
    rok: string;
    kategorija: number;
    opravljeno: boolean;
    uporabnik: string;
};
  

export type TaskListType = {
    taskList: TaskProps[];
    doneTasks: TaskProps[];
    notDoneTasks: TaskProps[];
    addAllTasks:(task: TaskProps[])=>void;
    addTask:(task: TaskProps)=>void;
    checkTask: (id:number) =>void;
    deleteTask: (id:number)=>void;
    clearAllTasks: ()=>void;
    editTask: (task: TaskProps)=>void;
}