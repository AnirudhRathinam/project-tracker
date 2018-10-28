import { Task } from "../shared/task.model";

export class Project{
    
    constructor(
        public name:string, 
        public description:string, 
        public imagePath:string,
        public tasks: Task[]
    ){}
}