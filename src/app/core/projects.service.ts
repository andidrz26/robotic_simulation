import { Injectable } from '@angular/core';
import { Project } from './project/project.model';
import { Object } from './project/object.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor() { }

  // projects filled with dummy data
  projects: Project[] = [
    {
      name: 'Enshrouded',
      location: 'C:/Users/andip/Saved Games/Enshrouded',
      saveDate: new Date(2020, 9, 31, 15, 30), // 31st October 2020, 3:30 PM
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
      saveDate: new Date(2020, 4, 16, 12, 30), // 16th May 2020, 12:30 PM
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
      saveDate: new Date(2020, 6, 21, 9, 30), // 21st July 2020, 9:30 AM
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
      saveDate: new Date(2020, 2, 4, 18, 30), // 4th March 2020, 6:30 PM
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
      saveDate: new Date(2020, 11, 25, 21, 30), // 25th December 2020, 9:30 PM
      object: {
        types: 'Sphere',
        dimension: '3D',
        height: 10,
        width: 10,
        depth: 10
      }
    }
  ];

  addProject(value: Project): void {
    this.projects.push(value);
  }

  getProjects(): Project[] {
    return this.projects;
  }

  addObject(value: Object, name: string, location: string): void {
    this.projects.push(
      {
        name: name,
        location: location,
        saveDate: new Date(), // Current date and time
        object: value
      }
    );
  }
}
