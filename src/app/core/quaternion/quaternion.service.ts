import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Quaternion } from './quaternion.model';

@Injectable({
  providedIn: 'root'
})
export class QuaternionService {

  constructor() { }

  inputArray: number[] = [1, 2, 3, 4];
  inputQuaternion: Quaternion = { 
    scalar: 1, 
    vectorX: 2, 
    vectorY: 3, 
    vectorZ: 4 
  };
  quaternion: Quaternion = {} as Quaternion;

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

  newQuaternion(matrix: number[]): Quaternion {
    invoke<Quaternion>("get_new_quaternion", { vector: matrix }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    });
    return this.quaternion;
  }
}
