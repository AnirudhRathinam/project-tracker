import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {Project} from '../project.model';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects: Project[];
  subscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.projectService.projectsChanged.subscribe(
      (projects: Project[]) =>{
        this.projects = projects;
      }
    );
    this.projects = this.projectService.getProjects();
  }

  onNewProject(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
