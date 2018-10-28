import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Task } from '../../shared/task.model';
import { TaskListService } from '../todo-list.service';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') taskListForm: NgForm;

  constructor(private taskService: TaskListService) { }

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Task;

  ngOnInit() {
    this.subscription = this.taskService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.taskService.getTask(index);
        this.taskListForm.setValue({
          name: this.editedItem.name,
          description: this.editedItem.description
        })
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newTask = new Task(value.name,value.description);
    if(this.editMode){
      this.taskService.updateTask(this.editedItemIndex, newTask);
    } else {
      this.taskService.addTask(newTask);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.taskListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.taskService.deleteTask(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
