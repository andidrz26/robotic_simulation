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
  div: HTMLElement | null = null;

  ngOnInit(): void {
    let first: boolean = true;
    this.projectsService.setQuaternion({
      scalar: 0,
      vector_x: 0,
      vector_y: 0,
      vector_z: 0,
    });
    this.projectsService.currentProject$.subscribe((project) => {
      if (project.object != undefined) {
        this.div = document.getElementById('spinDiv');
        this.selectedProject = project;
        this.type = project.object.types;
        if (this.div) {
          if (this.type == 'Cube' || this.type == 'Sphere') {
            if (this.div) {
              this.div.style.width = this.selectedProject.object.width + 'px';
              this.div.style.height = this.selectedProject.object.height + 'px';
            } else {
              console.error('Div could not be set');
            }
          } else if (this.type == 'Pyramid') {
            if (this.div) {
              this.div.style.width = '0px';
              this.div.style.height = '0px';
              this.div.style.borderLeft = (this.selectedProject.object.width / 2) + 'px solid transparent';
              this.div.style.borderRight = (this.selectedProject.object.width / 2) + 'px solid transparent';
              this.div.style.borderBottom = this.selectedProject.object.height + 'px solid rgba(0, 128, 0, 0.5)';
            } else {
              console.error('Div could not be set');
            }
          } else {
            console.error('Invalid object type');
          }
          this.div.style.top = `calc(50% - ${this.selectedProject.object.height / 2}px)`;
          this.div.style.left = `calc(50% - ${this.selectedProject.object.width / 2}px)`;
        }
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
    if (this.div) {

      let translateX: number = this.matrix[0][2];
      let translateY: number = this.matrix[1][2];
      if (this.matrix.length > 3) {
        translateX = this.matrix[0][3];
        translateY = this.matrix[1][3];
      }
      translateY = -translateY;
      let rotateAngle = Math.atan2(this.matrix[1][0], this.matrix[0][0]) * (180 / Math.PI);  
      if(translateY > 0) {
        rotateAngle = rotateAngle + 180;
      }
      this.div.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotateAngle}deg)`;
    }
  }
} 
