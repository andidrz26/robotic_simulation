import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Quaternion } from '../../core/quaternion/quaternion.model';
import { ProjectsService } from '../../core/project/projects.service';
import { MatrixService } from '../../core/matrix/matrix.service';
import { QuaternionService } from '../../core/quaternion/quaternion.service';
import { EulerService } from '../../core/euler/euler.service';
import { Project } from '../../core/project/project.model';
import { ButtonModule } from 'primeng/button';
import { EulerAngles } from '../../core/euler/euler_angles.model';

@Component({
  selector: 'app-command-input',
  imports: [CommonModule, SelectModule, InputNumberModule, InputTextModule, FormsModule, CardModule, DividerModule, ButtonModule],
  templateUrl: './command-input.component.html',
  styleUrl: './command-input.component.scss'
})
export class CommandInputComponent implements OnInit {

  constructor(private projectService: ProjectsService, private matrixService: MatrixService,
    private quaternionService: QuaternionService, private eulerService: EulerService) { }

  project: Project = {} as Project;

  ngOnInit(): void {
    this.projectService.currentProject$.subscribe((project) => {
      this.project = project;
    });
  }

  methods: String[] = ['matrix', 'quaternion', 'euler'];
  selectedMethod: String = 'quaternion';
  matrix: number[][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  quaternionInput: number[] = [];
  quaternion: Quaternion = {} as Quaternion;
  eulerAnglesInput: number[] = [];
  vector: number[] = [];
  eulerAngles: EulerAngles = {} as EulerAngles;
  solution: boolean = false;

  async calculate() {
    switch (this.selectedMethod) {
      case 'matrix':
        if (this.project.object.dimension == '2D') {
          this.vector[2] = 0;
        }
        this.matrix[0][3] = this.vector[0];
        this.matrix[1][3] = this.vector[1];
        this.matrix[2][3] = this.vector[2];
        this.matrix[3] = [0, 0, 0, 1];
        this.matrix = await this.matrixService.addMatrices(this.matrix);
        console.log(this.matrix);
        this.projectService.setMatrix(this.matrix);
        break;
      case 'quaternion':
        if (this.project.object.dimension == '2D') {
          this.quaternionInput[3] = 0;
        }
        let x = this.quaternionInput[1];
        let y = this.quaternionInput[2];
        let z = this.quaternionInput[3];
        this.quaternion = await this.quaternionService.newQuaternion(this.quaternionInput);
        // unsure if this is needed for this project but needed for a game engine
        // this.quaternion = await this.quaternionService.slerpQuaternions(this.quaternion, 1); 
        this.projectService.setQuaternion(this.quaternion);
        this.matrix = await this.quaternionService.toRotationMatrix(this.quaternion);
        this.matrix = await this.matrixService.transposeMatrix(this.matrix);
        this.matrix[0][3] = x;
        this.matrix[1][3] = y;
        if (this.project.object.dimension == '3D') {
          this.matrix[2][3] = z;
        } else {
          this.matrix[2][3] = 0;
        }
        this.matrix[3] = [0, 0, 0, 1];
        this.matrix = await this.matrixService.addMatrices(this.matrix);
        console.log(this.matrix);
        this.projectService.setMatrix(this.matrix);
        break;
      case 'euler':
        await this.eulerService.newEuler(this.eulerAnglesInput);
        this.projectService.setEuler(this.eulerAngles);
        this.matrix = await this.eulerService.toRotationMatrix(this.eulerAngles);
        this.projectService.setMatrix(this.matrix);
        break;
      default:
        console.error('Invalid method');
        break;
    }
    this.solution = true;
  }
}
