import { Component, OnInit } from '@angular/core';
import { PersistenceService } from '../shared/persistence.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private persistenceService: PersistenceService) { }

  onSaveData(){
    this.persistenceService.saveProjects().subscribe(
      (response: Response) => console.log(response));
  }

  onGetData(){
    this.persistenceService.getProjects();
  }

  ngOnInit() {
  }

}
