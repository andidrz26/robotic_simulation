import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-object',
  standalone: true,
  imports: [ ButtonModule, SelectModule, InputTextModule, FormsModule ],
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.scss']
})
export class CreateObjectComponent {
  // List of implemented object types
  types = ['Cube', 'Sphere', 'Cylinder', 'Pyramid'];

  selectedType: string = '';
  height: number = 0;
  width: number = 0;
  depth: number = 0;
  name: string = '';

}
