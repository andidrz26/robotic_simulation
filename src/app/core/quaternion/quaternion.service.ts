import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Quaternion } from './quaternion.model';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class QuaternionService {

  constructor(private projectService: ProjectsService) { }

  quaternion: Quaternion = {} as Quaternion;

  async newQuaternion(vector: number[]): Promise<Quaternion> {
    const SCALAR = vector[0];
    vector[1] *= SCALAR;
    vector[2] *= SCALAR;
    vector[3] *= SCALAR;
    
    return await invoke<Quaternion>("get_new_quaternion", { vector: vector });
  }

  async addQuaternion(quaternion: Quaternion): Promise<Quaternion> {
    return await invoke<Quaternion>("get_added_quaternion", { first_summand: this.quaternion, second_summand: quaternion });
  }

  async multiplyQuaternions(quaternion: Quaternion): Promise<Quaternion> {
    return await invoke<Quaternion>("get_multiplied_quaternion", { first_factor: this.quaternion, second_factor: quaternion });
  }

  async toRotationMatrix(quaternion: Quaternion): Promise<number[][]> {
    const SCALAR = quaternion.scalar;
    quaternion.vector_x *= SCALAR;
    quaternion.vector_y *= SCALAR;
    quaternion.vector_z *= SCALAR;

    return await invoke<number[][]>("get_rotation_matrix_from_quaternion", { quaternion: quaternion });
  }

  async slerpQuaternions(quaternion: Quaternion, t: number): Promise<Quaternion> {
    this.projectService.currentQuaternion$.subscribe((quaternion) => {
      this.quaternion = quaternion;
    });
    return await invoke<Quaternion>("get_slerp_quaternion", { first_factor: this.quaternion, second_factor: quaternion, t: t });
  }
}
