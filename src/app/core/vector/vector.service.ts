import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root'
})
export class VectorService {

  constructor() { }

  input: number[] = [1, 2, 3];
  vector: number[] = [];

  addVector(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_added_vector", { first_summand: this.input, second_summand: this.input }).then((answer) => {
      this.vector = answer;
      console.debug(this.vector);
    })
    return this.vector;
  }

  crossProduct(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_cross_product", { first_vector: this.input, second_vector: this.input }).then((answer) => {
      this.vector = answer;
      console.debug(this.vector);
    })
    return this.vector;
  }

  scalarProduct(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_scalar_product", { first_vector: this.input, second_vector: this.input }).then((answer) => {
      this.vector = answer;
      console.debug(this.vector);
    })
    return this.vector;
  }
}
