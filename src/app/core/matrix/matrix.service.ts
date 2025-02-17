import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class MatrixService implements OnInit{

  constructor(private projectService: ProjectsService) { }

  matrix: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

  ngOnInit(): void {
    this.projectService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
      console.log(this.matrix);
    });
  }

  multiplyMatrices(matrix: number[][]): Promise<number[][]> {
    return invoke<[]>("get_multiplied_matrix", { first_factor: this.matrix, second_factor: matrix });
  }

  addMatrices(matrix: number[][]): Promise<number[][]> {
    return invoke<[]>("get_added_matrix", { first_summand: this.matrix, second_summand: matrix });
  }

  transposeMatrix(matrix: number[][]): Promise<number[][]> {
    return invoke<[]>("get_transposed_matrix", { matrix: matrix });
  }
}
