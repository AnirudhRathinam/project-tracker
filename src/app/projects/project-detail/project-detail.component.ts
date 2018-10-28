import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project:Project;
  id: number;

  constructor(
    private projectService: ProjectService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.project = this.projectService.getProject(this.id);
      }
    );
  }

  onAddToTaskList() {
    this.projectService.addToTaskList(this.project.tasks);
  }

  onEditProject(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProject(){
    this.projectService.deleteProject(this.id);
    this.router.navigate(['/projects']);
  }

}
