import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { Object } from '../../core/project/object.model';
import { ProjectsService } from '../../core/project/projects.service';

@Component({
  selector: 'app-create-object',
  standalone: true,
  imports: [ButtonModule, SelectModule, InputTextModule, FormsModule, RadioButtonModule, CommonModule, ToastModule],
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.scss']
})
export class CreateObjectComponent implements OnInit{

  constructor(private messageService: MessageService, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    if(window.location.pathname.includes('change'))
    this.projectsService.currentProject$.subscribe((project) => {
      this.object = project.object;
      this.name = project.name;
      this.selectedType = project.object.types;
      this.dimension = project.object.dimension;
      this.height = project.object.height;
      this.width = project.object.width;
      this.depth = project.object.depth;
    });
  }

  object: Object = {} as Object;
  header: string = 'Object Creation';

  // List of implemented object types
  types = ['Cube', 'Sphere', 'Pyramid'];

  // Only 2D and 3D are implemented
  dimension: string = '2D';

  selectedType: string = 'Cube';
  height: number | undefined;
  width: number | undefined;
  depth: number | undefined;
  name: string = '';

  clear() {
    this.height = undefined;
    this.width = undefined;
    this.depth = undefined;
    this.name = '';
  }

  save() {
    let severity = 'info';
    let summary = 'Info';
    let detail = this.selectedType + ' was successfully created!';

    if (!this.height || !this.width || !this.name) {
      severity = 'error';
      summary = 'Error';
      detail = 'Please fill out all fields!';
    } else if (!this.depth && this.dimension === '3D') {
      severity = 'error';
      summary = 'Error';
      detail = 'Please fill out all fields!';
    } else {
      this.object = {
        types: this.selectedType,
        dimension: this.dimension,
        height: this.height!,
        width: this.width!,
        depth: this.depth ? this.depth : 0
      }

      this.projectsService.addObject(this.object, this.name);
      this.clear();
    }
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }

}
