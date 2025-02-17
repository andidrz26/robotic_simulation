import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { EulerAngles } from './euler_angles.model';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class EulerService {

  newEuler(inputVector: number[]): Promise<EulerAngles> {
    return invoke<EulerAngles>("get_new_euler", { vector: inputVector });
  }

  fromRotationMatrix(rotationMatrix: number[][]): Promise<EulerAngles> {
    return invoke<EulerAngles>("get_euler_from_rotation_matrix", { matrix: rotationMatrix });
  }

  toRotationMatrix(eulerAngles: EulerAngles): Promise<number[][]> {
    return invoke<[]>("get_rotation_matrix_from_euler", { vector: eulerAngles });
  }
}
