import { Injectable } from '@angular/core';

import {Project} from './project.model';
import { Task } from '../shared/task.model';
import { TaskListService } from '../todo-list/todo-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class ProjectService{

    projectsChanged = new Subject<Project[]>();


    private projects: Project[] = [
        new Project(
            'Test', 
            'This is a test',
            'https://cdn-images-1.medium.com/max/1600/1*sVpEiHHDkQWphC38yZywNA.png',
            [
                new Task('Project 1 Task 1', 'Task 1 description'),
                new Task('Project 1 Task 2', 'Task 2 description')
            ]),
        new Project(
            'Test2', 
            'This is another test',
            'https://tr4.cbsistatic.com/hub/i/r/2017/02/01/aebb34ab-f843-4e44-a39a-a083da99fcef/resize/770x/cb52e22968e0e566fa93d7d3403d95cc/istock-518310332.jpg',
            [
                new Task('Project 2 Task 3', 'Task 3 description'),
                new Task('Project 2 Task 4', 'Task 4 description'),
                new Task('Project 2 Task 5', 'Task 5 description')
            ])
    ];

    constructor(private taskService: TaskListService) {}

    getProject(id: number){
        return this.projects[id];
    }

    getProjects(){
        return this.projects.slice();
    }

    setProjects(projects: Project[]){
        this.projects = projects;
        this.projectsChanged.next(this.projects.slice());
    }

    addToTaskList(tasks: Task[]){
        this.taskService.addTasks(tasks);
    }

    addProject(project: Project){
        this.projects.push(project);
        this.projectsChanged.next(this.projects.slice());
    }

    updateProject(index: number, newProject: Project){
        this.projects[index] = newProject;
        this.projectsChanged.next(this.projects.slice());
    }

    deleteProject(index: number){
        this.projects.splice(index,1);
        this.projectsChanged.next(this.projects.slice());
    }

}