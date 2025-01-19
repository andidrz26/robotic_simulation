import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NavbarControllService } from '../../core/navbar-controll.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, SelectModule, FormsModule, RadioButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  constructor(private navbarControll: NavbarControllService) { }

  visible: boolean = false;

  ngOnInit(): void {
    this.navbarControll.currentValue$.subscribe(value => {
      this.visible = value;
    });
  }

  backendFolder: string = '';
  saveOnLeaving: boolean = false;
  themes: string[] = ['dark', 'light'];
  selectedTheme: string = 'dark';

  saveSettings() {
  }

  showDialog() {
    this.visible = false;
  }
}
