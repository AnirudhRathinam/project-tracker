import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ProjectStartComponent } from './projects/project-start/project-start.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';

const appRoutes: Routes = [
    {path:'', redirectTo: '/projects', pathMatch: 'full'},
    {path: 'projects', component: ProjectsComponent, children: [
        {path: '', component: ProjectStartComponent},
        {path: 'new', component:ProjectEditComponent},
        {path: ':id', component: ProjectDetailComponent},
        {path: ':id/edit', component:ProjectEditComponent}
    ]},
    {path: 'todo-list', component: TodoListComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}