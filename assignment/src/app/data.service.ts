import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../app/project'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private get_url = 'http://localhost:3000/projects';
  private _url = "http://localhost:3000/projects/";

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.get_url);
  }

  getProject(project): Observable<Project> {
    return this.http.get<Project>(this._url + project);
  }

  updateProject(project): Observable<Project> {
    console.log(project.value);
    return this.http.put<Project>(this._url + project.id, project);
  }

  deleteProject(project) {
    return this.http.delete(this._url + project.id);
  }

  createProject(project): Observable<Project>{
    return this.http.post<Project>(this.get_url,project)
  }

}
