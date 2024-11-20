import { Injectable } from '@angular/core';
import { invoke } from "@tauri-apps/api/core";

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  constructor() { }

  factor: number[][] = [
    [5, 3, 4],
    [4, 5, 8],
    [1, 3, 5]
  ]
  matrix: number[][] = [];

  multiplyMatrices(event: SubmitEvent): void {
    event.preventDefault();
    invoke<[]>("get_multiplied_matrix", { first_factor: this.factor, second_factor: this.factor }).then((answer) => {
      this.matrix = answer;
      console.info(this.matrix);
    });
  }
}
