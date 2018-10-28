import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  id: number;
  editMode:boolean = false; 
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private projectService: ProjectService,
    private router: Router  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit(){
    if(this.editMode){
      this.projectService.updateProject(this.id, this.projectForm.value);
    } else {
      this.projectService.addProject(this.projectForm.value);
    }
    this.onCancel();
  }

  onAddTask(){
    (<FormArray>this.projectForm.get('tasks')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })
    );
  }
  onDeleteTask(index: number){
    (<FormArray>this.projectForm.get('tasks')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){

    let projName = '';
    let projImagePath = '';
    let projDescription = '';
    let projTasks = new FormArray([]);

    if(this.editMode){
      const project = this.projectService.getProject(this.id);
      projName = project.name;
      projImagePath = project.imagePath;
      projDescription = project.description;
      if(project['tasks']){
        for (let t of project.tasks){
          projTasks.push(
            new FormGroup({
              'name': new FormControl(t.name, Validators.required),
              'description': new FormControl(t.description, Validators.required)
            })
          );
        }
      }
    }

    this.projectForm = new FormGroup({
      'name': new FormControl(projName, Validators.required),
      'imagePath': new FormControl(projImagePath, Validators.required),
      'description': new FormControl(projDescription, Validators.required),
      'tasks': projTasks
    });

  }

}
