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
  selectedMethod: String = 'matrix';
  matrix: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  quaternionInput!: number[];
  quaternion: Quaternion = {} as Quaternion;
  eulerAnglesInput!: number[];
  eulerAngles: EulerAngles = {} as EulerAngles;

  async calculate() {
    switch (this.selectedMethod) {
      case 'matrix':
        this.projectService.setMatrix(this.matrix);
        break;
      case 'quaternion':
        await this.quaternionService.newQuaternion(this.quaternionInput);
        this.projectService.setQuaternion(this.quaternion);
        break;
      case 'euler':
        await this.eulerService.newEuler(this.eulerAnglesInput);
        this.projectService.setEuler(this.eulerAngles);
        break;
    }
  }
}
