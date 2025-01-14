import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  input: number[][] = [
    [5, 3, 4],
    [4, 5, 8],
    [1, 3, 5]
  ]
  matrix: number[][] = [];

  multiplyMatrices(event: SubmitEvent): void {
    event.preventDefault();
    invoke<[]>("get_multiplied_matrix", { first_factor: this.input, second_factor: this.input }).then((answer) => {
      this.matrix = answer;
      console.debug(this.matrix);
    });
  }

  addMatrices(event: SubmitEvent): void {
    event.preventDefault();
    invoke<[]>("get_added_matrix", { first_summand: this.input, second_summand: this.input }).then((answer) => {
      this.matrix = answer;
      console.debug(this.matrix);
    })
  }
}
