import React from "react";
import { TaskProps } from "./taskType";



export type AddType ={
    showAdd:boolean;
    setShowAdd: Function;
    id: number;
    setId: Function;
    task: TaskProps | null;
    setTask: Function;
}