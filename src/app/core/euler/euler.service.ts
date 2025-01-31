import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { EulerAngles } from './euler_angles.model';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class EulerService {

  eulerAngles: EulerAngles = {} as EulerAngles;

  rotationMatrix: number[][] = [];

  async newEuler(inputVector: number[]): Promise<EulerAngles> {
    this.eulerAngles = await invoke<EulerAngles>("get_new_euler", { vector: inputVector });
    console.debug(this.eulerAngles);
    return this.eulerAngles;
  }

  fromRotationMatrix(rotationMatrix: number[][]): EulerAngles {
    invoke<EulerAngles>("get_euler_from_rotation_matrix", { matrix: rotationMatrix }).then((answer) => {
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
