import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { EulerAngles } from './euler_angles.model';

@Injectable({
  providedIn: 'root'
})
export class EulerService {

  constructor() { }

  inputVector: number[] = [1, 2, 3];
  inputEulerAngles: EulerAngles = { yaw: 1, pitch: 2, roll: 3 };
  inputRotationMatrix: number[][] = [
    [5, 3, 4],
    [4, 5, 8],
    [1, 3, 5]
  ];
  eulerAngles: EulerAngles[] = []; //Placeholder for the result
  rotationMatrix: number[][] = [];

  newEuler(event: SubmitEvent): EulerAngles[] {
    event.preventDefault();
    invoke<[]>("get_new_euler", { vector: this.inputVector }).then((answer) => {
      this.eulerAngles = answer;
      console.debug(this.eulerAngles);
    });
    return this.eulerAngles;
  }

  fromRotationMatrix(event: SubmitEvent): EulerAngles[] {
    event.preventDefault();
    invoke<[]>("get_euler_from_rotation_matrix", { matrix: this.inputRotationMatrix }).then((answer) => {
      this.eulerAngles = answer;
      console.debug(this.eulerAngles);
    });
    return this.eulerAngles;
  }

  toRotationMatrix(event: SubmitEvent): number[][] {
    event.preventDefault();
    invoke<[]>("get_rotation_matrix_from_euler", { vector: this.inputEulerAngles }).then((answer) => {
      this.rotationMatrix = answer;
      console.debug(this.rotationMatrix);
    });
    return this.rotationMatrix;
  }
}
