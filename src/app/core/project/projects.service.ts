import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { Object } from './object.model';
import { invoke } from '@tauri-apps/api/core';

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

  // projects filled with dummy data
  projects: Project[] = [
    {
      name: 'Enshrouded',
      location: 'C:/Users/andip/Saved Games/Enshrouded',
      savedate: {
        day: 10,
        month: 3,
        year: 2020,
        hours: 9,
        minutes: 30
      },
      object: {
        types: 'Cube',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    },
    {
      name: 'Respawn',
      location: 'C:/Users/andip/Saved Games/Respawn',
      savedate: {
        day: 15,
        month: 5,
        year: 2020,
        hours: 12,
        minutes: 30
      },
      object: {
        types: 'Sphere',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    },
    {
      name: 'The Last of Us',
      location: 'C:/Users/andip/Saved Games/The Last of Us',
      savedate: {
        day: 20,
        month: 7,
        year: 2020,
        hours: 15,
        minutes: 30
      },
      object: {
        types: 'Pyramid',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    },
    {
      name: 'The Witcher 3',
      location: 'C:/Users/andip/Saved Games/The Witcher 3',
      savedate: {
        day: 25,
        month: 9,
        year: 2020,
        hours: 18,
        minutes: 30
      },
      object: {
        types: 'Cube',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    },
    {
      name: 'Uncharted',
      location: 'C:/Users/andip/Saved Games/Uncharted',
      savedate: {
        day: 30,
        month: 11,
        year: 2020,
        hours: 21,
        minutes: 30
      },
      object: {
        types: 'Sphere',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    }
  ];

  getProjects(): Project[] {
    return this.projects;
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
    }

    this.projects.push(project);
    this.uploadProject(project);
  }
}
