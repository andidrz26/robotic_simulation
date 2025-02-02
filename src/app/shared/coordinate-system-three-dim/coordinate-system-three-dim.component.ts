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
  type: String = 'Pyramid';
  selectedProject: Project = {} as Project;

  ngOnInit(): void {
    let first: boolean = true;
    this.projectsService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
      if(!first) {
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
    const SCALEX = 0.5;
    const SCALEY = 0.5;
    const SCALEZ = 0.5;
    let elementName = this.type.toLowerCase();
    const div = document.getElementById(elementName);
    if (div) {
      // Remove scaling factors from the matrix
      this.matrix[0][0] = 1;
      this.matrix[1][1] = 1;
      this.matrix[2][2] = 1;
      const matrixString = this.matrix.flat().slice(0, 16).join(',');
      div.style.transform = `matrix3d(${matrixString})`;
    }
  }
}
