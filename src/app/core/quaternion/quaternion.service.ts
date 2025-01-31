import { Injectable, OnInit } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Quaternion } from './quaternion.model';
import { ProjectsService } from '../project/projects.service';

@Injectable({
  providedIn: 'root'
})
export class QuaternionService implements OnInit{

  constructor(private projectService: ProjectsService) { }

  quaternion: Quaternion = {} as Quaternion;

  ngOnInit(): void {
    this.projectService.currentQuaternion$.subscribe((quaternion) => {
      this.quaternion = quaternion;
    });
  }

  async newQuaternion(matrix: number[]): Promise<Quaternion> {
    console.error(matrix);
    const SCALAR = matrix[0];
    matrix[1] *= SCALAR;
    matrix[2] *= SCALAR;
    matrix[3] *= SCALAR;
    
    return await invoke<Quaternion>("get_new_quaternion", { vector: matrix });
  }

  async addQuaternion(quaternion: Quaternion): Promise<Quaternion> {
    return await invoke<Quaternion>("get_added_quaternion", { first_summand: this.quaternion, second_summand: quaternion });
  }

  async multiplyQuaternions(quaternion: Quaternion): Promise<Quaternion> {
    return await invoke<Quaternion>("get_multiplied_quaternion", { first_factor: this.quaternion, second_factor: quaternion });
  }

  async toRotationMatrix(quaternion: Quaternion): Promise<number[][]> {
    const SCALAR = quaternion.scalar;
    quaternion.vectorX *= SCALAR;
    quaternion.vectorY *= SCALAR;
    quaternion.vectorZ *= SCALAR;

    return await invoke<number[][]>("get_rotation_matrix", { quaternion: quaternion });
  }

  async slerpQuaternions(quaternion: Quaternion, t: number): Promise<Quaternion> {
    const SCALAR = quaternion.scalar;
    quaternion.vectorX *= SCALAR;
    quaternion.vectorY *= SCALAR;
    quaternion.vectorZ *= SCALAR;

    return await invoke<Quaternion>("get_slerp_quaternion", { first_factor: this.quaternion, second_factor: quaternion, t: t });
  }
}
