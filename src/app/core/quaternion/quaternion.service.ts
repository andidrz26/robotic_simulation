import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Quaternion } from './quaternion.model';

@Injectable({
  providedIn: 'root'
})
export class QuaternionService {

  constructor() { }

  quaternion: Quaternion = {} as Quaternion;

  async newQuaternion(matrix: number[]): Promise<Quaternion> {
    this.quaternion = await invoke<Quaternion>("get_new_quaternion", { vector: matrix });
    return this.quaternion;
  }

  addQuaternion(quaternionOne: Quaternion, quaternionTwo: Quaternion): Quaternion {
    invoke<Quaternion>("get_added_quaternion", { first_summand: quaternionOne, second_summand: quaternionTwo }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    })
    return this.quaternion;
  }

  multiplyQuaternions(quaternionOne: Quaternion, quaternionTwo: Quaternion): Quaternion {
    invoke<Quaternion>("get_multiplied_quaternion", { first_factor: quaternionOne, second_factor: quaternionTwo }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    });
    return this.quaternion;
  }
}
