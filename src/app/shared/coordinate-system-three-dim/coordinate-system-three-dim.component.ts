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
    this.projectsService.setQuaternion({
      scalar: 0,
      vector_x: 0,
      vector_y: 0,
      vector_z: 0,
    });
    this.projectsService.setMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
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
      let translateY = 210 + this.matrix[1][3];
      let translateZ = -105 + this.matrix[2][3];
      let translateX = 200 + this.matrix[0][3];

      if (this.type == 'Sphere') {
        div.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
      } else {
        div.style.transform = `rotateX(${this.matrix[1][2]}rad) rotateY(${this.matrix[2][1]}rad) rotateZ(${this.matrix[0][2]}rad) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
        console.log(div.style.transform);
      }
    }
  }
}
