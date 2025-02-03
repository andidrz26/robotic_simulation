import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../core/project/projects.service';
import { Project } from '../../core/project/project.model';
import { CommonModule } from '@angular/common';
import { CommandInputComponent } from "../command-input/command-input.component";

@Component({
  selector: 'app-coordinate-system-three-dim',
  imports: [CommonModule, CommandInputComponent],
  templateUrl: './coordinate-system-three-dim.component.html',
  styleUrl: './coordinate-system-three-dim.component.scss'
})
export class CoordinateSystemThreeDimComponent implements OnInit {

  constructor(private projectsService: ProjectsService) { }

  matrix: number[][] = [];
  type: String = 'Sphere';
  selectedProject: Project = {} as Project;

  ngOnInit(): void {
    let first: boolean = true;
    this.projectsService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
      if (!first) {
        this.spinDiv();
      } else {
        first = false;
      }
    });
    this.projectsService.currentProject$.subscribe((project) => {
      if (project.object != undefined) {
        this.selectedProject = project;
        this.type = project.object.types;
      }
    });
  }


  spinDiv(): void {
    let elementName = this.type.toLowerCase();
    const div = document.getElementById(elementName);
    if (div) {
      // Remove scaling factors from the matrix
      this.matrix[0][0] = 1;
      this.matrix[1][1] = 1;
      this.matrix[2][2] = 1;

      // Get the first 16 values of the matrix and convert them to a string
      const matrixString = this.matrix.flat().slice(0, 16).join(',');

      if (this.type == 'Sphere') {
        let translateY = 420 - this.matrix[1][3];
        let translateZ = -200 + this.matrix[2][3];
        div.style.transform = `translateX(${this.matrix[0][3]}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
      } else {
        let translateY = 420 - this.matrix[0][3];
        let translateZ = this.matrix[1][3];
        if(this.type == 'Cube') {
          translateZ = -210 + translateZ;
        } else {
          translateZ = -200 + translateZ;
        }
        div.style.transform = `rotateX(${this.matrix[1][2]}rad) rotateY(${this.matrix[2][1]}rad) rotateZ(${this.matrix[0][2]}rad) translateX(${this.matrix[0][3]}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
        console.log(div.style.transform);
      }
    }
  }
}
