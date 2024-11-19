import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { invoke } from "@tauri-apps/api/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  factor: number[][] = [
    [5, 3, 4],
    [4, 5, 8],
    [1, 3, 5]
  ]
  matrix: number[][] = [];

  multiplyMatrices(event: SubmitEvent): void {
    event.preventDefault();
    invoke<[]>("get_multiplied_matrix", { first_factor: this.factor, second_factor: this.factor }).then((answer) => {
      this.matrix = answer;
      console.info(this.matrix);
    });
  }
}
