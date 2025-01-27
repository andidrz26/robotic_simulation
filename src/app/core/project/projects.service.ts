import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Object } from './object.model';
import { invoke } from '@tauri-apps/api/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  async downloadProject(): Promise<Project> {
    const answer = await invoke<Project>('get_project');
    return answer;
  }

  uploadProject(project: Project): void {
    console.log('Uploading project:', project);
    invoke<void>('post_project', { project: project });
  }

  private currentProjectsSubject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  public currentProjects$: Observable<Project[]> = this.currentProjectsSubject.asObservable();

  loadProjects(): void {
    invoke<Project[]>('get_list_of_projects').then((answer) => {
      this.currentProjectsSubject.next(answer);
    });
  }

  addObject(value: Object, name: string): void {
    let date: Date = new Date();
    let project = {
      name: name,
      location: '',
      savedate: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes()
      },
      object: value
    };
    this.uploadProject(project);
    this.loadProjects();
  }
}
