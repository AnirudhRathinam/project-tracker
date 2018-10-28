import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import {Task} from '../shared/task.model';
import { TaskListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  tasks:Task[] = [];
  private subscription: Subscription;

  constructor(private taskListService: TaskListService) { }

  ngOnInit() {
    this.tasks = this.taskListService.getTasks();
    this.subscription = this.taskListService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  onEditItem(index: number){
    this.taskListService.startedEditing.next(index);

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
