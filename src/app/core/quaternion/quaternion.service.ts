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
    this.quaternion = await invoke<Quaternion>("get_new_quaternion", { vector: matrix });
    return this.quaternion;
  }

  async addQuaternion(quaternion: Quaternion): Promise<Quaternion> {
    this.quaternion = await invoke<Quaternion>("get_added_quaternion", { first_summand: this.quaternion, second_summand: quaternion });
    return this.quaternion;
  }

  async multiplyQuaternions(quaternion: Quaternion): Promise<Quaternion> {
    this.quaternion = await invoke<Quaternion>("get_multiplied_quaternion", { first_factor: this.quaternion, second_factor: quaternion });
    return this.quaternion;
  }
}
