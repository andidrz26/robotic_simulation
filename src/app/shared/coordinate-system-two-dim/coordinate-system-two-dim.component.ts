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
  standalone: true,
  imports: [CommonModule, CommandInputComponent],
  templateUrl: './coordinate-system-two-dim.component.html',
  styleUrls: ['./coordinate-system-two-dim.component.scss']
})
export class CoordinateSystemTwoDimComponent implements OnInit {

  constructor(private projectsService: ProjectsService, private quaternionService: QuaternionService) { }

  selectedProject: Project = {} as Project;
  type: String = 'Cube';
  matrix: number[][] = [];
  quaternion: Quaternion = {} as Quaternion;
  eulerAngles: EulerAngles = {} as EulerAngles;

  ngOnInit(): void {
    let first: boolean = true;
    this.projectsService.currentProject$.subscribe((project) => {
      if (project.object != undefined) {
        this.selectedProject = project;
        this.type = project.object.types;
      }
    });
    this.projectsService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
      if (!first) {
        this.update2DObject();
      } else {
        first = false;
      }
    });
    this.projectsService.currentQuaternion$.subscribe((quaternion) => {
      this.quaternion = quaternion;
    });
    this.projectsService.currentEuler$.subscribe((euler) => {
      this.eulerAngles = euler;
    });
  }

  update2DObject(): void {
    const div = document.getElementById('spinDiv');
    if (div) {

      let translateX: number = this.matrix[0][2];
      let translateY: number = this.matrix[1][2];
      if (this.matrix.length > 3) {
        translateX = this.matrix[0][3];
        translateY = this.matrix[1][3];
      }
      console.log(this.matrix);

      const rotateAngle = Math.atan2(this.matrix[1][0], this.matrix[0][0]) * (180 / Math.PI);
      div.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateAngle}deg)`;
    }
  }
} 
