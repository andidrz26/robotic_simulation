import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Object } from './object.model';
import { invoke } from '@tauri-apps/api/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quaternion } from '../quaternion/quaternion.model';
import { EulerAngles } from '../euler/euler_angles.model';

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

  private currentProjectSubject: BehaviorSubject<Project> = new BehaviorSubject<Project>({} as Project);
  public currentProject$: Observable<Project> = this.currentProjectSubject.asObservable();

  private currentMatrixSubject: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([]);
  public currentMatrix$: Observable<number[][]> = this.currentMatrixSubject.asObservable();

  private currentQuaternionSubject: BehaviorSubject<Quaternion> = new BehaviorSubject<Quaternion>({} as Quaternion);
  public currentQuaternion$: Observable<Quaternion> = this.currentQuaternionSubject.asObservable();

  private currentEulerSubject: BehaviorSubject<EulerAngles> = new BehaviorSubject<EulerAngles>({} as EulerAngles);
  public currentEuler$: Observable<EulerAngles> = this.currentEulerSubject.asObservable();

  loadProjects(): void {
    invoke<Project[]>('get_list_of_projects').then((answer) => {
      this.currentProjectsSubject.next(answer);
    });
  }

  setProject(project: Project): void {
    this.currentProjectSubject.next(project);
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

  setMatrix(matrix: number[][]): void {
    this.currentMatrixSubject.next(matrix);
  }

  setQuaternion(quaternion: Quaternion): void { 
    this.currentQuaternionSubject.next(quaternion);
  }

  setEuler(eulerAngles: EulerAngles): void {
    this.currentEulerSubject.next(eulerAngles);
  }
}
