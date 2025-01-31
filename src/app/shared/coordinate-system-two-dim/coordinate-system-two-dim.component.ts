import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/project/projects.service';
import { Project } from '../../core/project/project.model';
import { CommonModule } from '@angular/common';
import { CommandInputComponent } from "../command-input/command-input.component";

@Component({
  selector: 'app-coordinate-system-two-dim',
  imports: [CommonModule, CommandInputComponent],
  templateUrl: './coordinate-system-two-dim.component.html',
  styleUrl: './coordinate-system-two-dim.component.scss'
})
export class CoordinateSystemTwoDimComponent implements OnInit {
 
  constructor(private projectsService: ProjectsService) { }

  selectedProject: Project = {} as Project;
  type: String = 'Cube';

  ngOnInit(): void {
    this.projectsService.currentProject$.subscribe((project) => {
      this.selectedProject = project;
      this.type = project.object.types;
      console.log('Selected project:', this.selectedProject);
    });
  } 
}
