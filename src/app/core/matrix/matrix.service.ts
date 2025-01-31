import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  matrix: number[][] = [];

  multiplyMatrices(matrixOne: number[][], matrixTwo: number[][]): number[][] {
    invoke<[]>("get_multiplied_matrix", { first_factor: matrixOne, second_factor: matrixTwo }).then((answer) => {
      this.matrix = answer;
    });
    return this.matrix;
  }

  addMatrices(matrixOne: number[][], matrixTwo: number[][]): number[][] {
    invoke<[]>("get_added_matrix", { first_summand: matrixOne, second_summand: matrixTwo }).then((answer) => {
      this.matrix = answer;
    });
    return this.matrix;
  }
}
