import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { EulerAngles } from './euler_angles.model';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class EulerService {

  async newEuler(inputVector: number[]): Promise<EulerAngles> {
    return await invoke<EulerAngles>("get_new_euler", { vector: inputVector });
  }

  async fromRotationMatrix(rotationMatrix: number[][]): Promise<EulerAngles> {
    return await invoke<EulerAngles>("get_euler_from_rotation_matrix", { matrix: rotationMatrix });
  }

  async toRotationMatrix(eulerAngles: EulerAngles): Promise<number[][]> {
    return await invoke<[]>("get_rotation_matrix_from_euler", { vector: eulerAngles });
  }
}
