import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  searchText: String;
  public projects : object;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getProjects().subscribe(
      data=>this.projects=data
    );
    
  }

}
