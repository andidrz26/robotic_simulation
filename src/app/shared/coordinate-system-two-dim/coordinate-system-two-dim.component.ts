import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/project/projects.service';
import { Project } from '../../core/project/project.model';
import { CommonModule } from '@angular/common';
import { CommandInputComponent } from "../command-input/command-input.component";
import { Quaternion } from '../../core/quaternion/quaternion.model';
import { EulerAngles } from '../../core/euler/euler_angles.model';
import { QuaternionService } from '../../core/quaternion/quaternion.service';

@Component({
  selector: 'app-coordinate-system-two-dim',
  imports: [CommonModule, CommandInputComponent],
  templateUrl: './coordinate-system-two-dim.component.html',
  styleUrl: './coordinate-system-two-dim.component.scss'
})
export class CoordinateSystemTwoDimComponent implements OnInit {
 
  constructor(private projectsService: ProjectsService, private quaternionService: QuaternionService) { }

  selectedProject: Project = {} as Project;
  type: String = 'Cube';
  matrix: number[][] = [];
  quaternion: Quaternion = {} as Quaternion;
  eulerAngles: EulerAngles = {} as EulerAngles;

  ngOnInit(): void {
    this.projectsService.currentProject$.subscribe((project) => {
      this.selectedProject = project;
      this.type = project.object.types;
    });
    this.projectsService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
    });
    this.projectsService.currentQuaternion$.subscribe((quaternion) => {
      this.quaternion = quaternion;
    });
    this.projectsService.currentEuler$.subscribe((euler) => {
      this.eulerAngles = euler;
    });
  } 
}
