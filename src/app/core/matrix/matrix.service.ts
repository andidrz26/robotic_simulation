import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class MatrixService implements OnInit{

  constructor(private projectService: ProjectsService) { }

  matrix: number[][] = [];

  ngOnInit(): void {
    this.projectService.currentMatrix$.subscribe((matrix) => {
      this.matrix = matrix;
    });
  }

  async multiplyMatrices(matrix: number[][]): Promise<number[][]> {
    this.matrix = await invoke<[]>("get_multiplied_matrix", { first_factor: this.matrix, second_factor: matrix });
    return this.matrix;
  }

  async addMatrices(matrix: number[][]): Promise<number[][]> {
    this.matrix = await invoke<[]>("get_added_matrix", { first_summand: this.matrix, second_summand: matrix });
    return this.matrix;
  }
}
