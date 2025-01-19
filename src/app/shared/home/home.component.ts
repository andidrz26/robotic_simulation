import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { Project } from '../../core/project/project.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TableModule, PanelMenuModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  selectedProject: Project | undefined;

  options: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => {
        this.router.navigate(['/']);
      }
    },
    {
      label: 'New',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.router.navigate(['/create']);
      }
    },
    {
      label: 'Open',
      icon: 'pi pi-fw pi-folder-open',
    }
  ]

  // projects filled with dummy data
  projects: Project[] = [
    {
      name: 'Enshrouded',
      location: 'C:/Users/andip/Saved Games/Enshrouded',
      saveDate: new Date(2020, 9, 31, 15, 30) // 31st October 2020, 3:30 PM
    },
    {
      name: 'Respawn',
      location: 'C:/Users/andip/Saved Games/Respawn',
      saveDate: new Date(2020, 4, 16, 12, 30) // 16th May 2020, 12:30 PM
    },
    {
      name: 'The Last of Us',
      location: 'C:/Users/andip/Saved Games/The Last of Us',
      saveDate: new Date(2020, 6, 21, 9, 30) // 21st July 2020, 9:30 AM
    },
    {
      name: 'The Witcher 3',
      location: 'C:/Users/andip/Saved Games/The Witcher 3',
      saveDate: new Date(2020, 2, 4, 18, 30) // 4th March 2020, 6:30 PM
    },
    {
      name: 'Uncharted',
      location: 'C:/Users/andip/Saved Games/Uncharted',
      saveDate: new Date(2020, 11, 25, 21, 30) // 25th December 2020, 9:30 PM
    }
  ];

  createReadableDateTime(saveDate: Date): string {
    const date = saveDate.getDate();
    const month = saveDate.getMonth();
    const year = saveDate.getFullYear();
    const hours = saveDate.getHours();
    const minutes = saveDate.getMinutes();
    return `${date}/${month}/${year} ${hours}:${minutes}`;
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.router.navigate(['/simulation', project.name]);
  }
}
