import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { Project } from '../../core/project/project.model';
import { ProjectsService } from '../../core/project/projects.service';
import { ProjectDate } from '../../core/project/date.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TableModule, PanelMenuModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

  constructor(private router: Router, private projectsService: ProjectsService) { }

  projects!: Project[];

  ngOnInit(): void {
    this.projectsService.loadProjects();
    this.projectsService.currentProjects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  selectedProject: Project | undefined;

  options: MenuItem[] = [
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

  createReadableDateTime(saveDate: ProjectDate): string {
    const date = saveDate.day;
    const month = saveDate.month;
    const year = saveDate.year;
    const hours = saveDate.hours;
    const minutes = saveDate.minutes;
    return `${date}/${month}/${year} ${hours}:${minutes}`;
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    if(project.object.dimension == '3D') {
      this.router.navigate(['/simulation3d', this.selectedProject.name]);
    } else {
      this.router.navigate(['/simulation2d', this.selectedProject.name]);
    }
  }
}
