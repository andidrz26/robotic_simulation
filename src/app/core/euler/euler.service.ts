import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { EulerAngles } from './euler_angles.model';

@Injectable({
  providedIn: 'root'
})
export class EulerService {

  constructor() { }

  eulerAngles: EulerAngles[] = [];
  rotationMatrix: number[][] = [];

  newEuler(inputVector: number[]): EulerAngles[] {
    invoke<[]>("get_new_euler", { vector: inputVector }).then((answer) => {
      this.eulerAngles = answer;
      console.debug(this.eulerAngles);
    });
    return this.eulerAngles;
  }

  fromRotationMatrix(rotationMatrix: number[][]): EulerAngles[] {
    invoke<[]>("get_euler_from_rotation_matrix", { matrix: rotationMatrix }).then((answer) => {
      this.eulerAngles = answer;
      console.debug(this.eulerAngles);
    });
    return this.eulerAngles;
  }

  toRotationMatrix(eulerAngles: EulerAngles): number[][] {
    invoke<[]>("get_rotation_matrix_from_euler", { vector: eulerAngles }).then((answer) => {
      this.rotationMatrix = answer;
      console.debug(this.rotationMatrix);
    });
    return this.rotationMatrix;
  }
}
