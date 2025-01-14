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
  quaternion: number[] = [];

  addQuaternion(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_added_quaternion", { first_summand: this.inputArray, second_summand: this.inputArray }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    })
    return this.quaternion;
  }

  multiplyQuaternions(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_multiplied_quaternion", { first_factor: this.inputQuaternion, second_factor: this.inputQuaternion }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    });
    return this.quaternion;
  }

  newQuaternion(event: SubmitEvent): number[] {
    event.preventDefault();
    invoke<[]>("get_new_quaternion", { vector: this.inputQuaternion }).then((answer) => {
      this.quaternion = answer;
      console.debug(this.quaternion);
    });
    return this.quaternion;
  }
}
