import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ProjectService } from "../projects/project.service";
import { Project } from "../projects/project.model";
import { map } from 'rxjs/operators';

@Injectable()
export class PersistenceService{
    constructor(private http: Http, 
        private projectService: ProjectService){}

    saveProjects(){
        return this.http.put('--insert database url here--', 
        this.projectService.getProjects());
    }

    getProjects(){
        this.http.get('--insert database url here--')
            .pipe(map(
                (response: Response) => {
                    const projects: Project[] = response.json();
                    for(let p of projects){
                        if(!p['tasks']){
                            p['tasks'] = [];
                        }
                    }
                    return projects;
                }
            ))
            .subscribe(
                (projects: Project[]) => {
                    this.projectService.setProjects(projects);
                }
        )
    }


}