import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NavbarControllService } from '../../core/navbar-controll.service';
import { PrimeNG } from 'primeng/config';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonModule, DialogModule, InputTextModule, SelectModule, FormsModule, RadioButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  constructor(private navbarControll: NavbarControllService, private settings: SettingsService, private primeng: PrimeNG) { }

  visible: boolean = false;
  backendFolder: string = '';
  saveOnLeaving: boolean = false;
  themes: string[] = ['dark', 'light', 'system'];
  selectedTheme: string = 'system';

  ngOnInit(): void {
    this.settings.currentTheme$.subscribe(value => {
      this.selectedTheme = value;
    });
    this.navbarControll.currentValue$.subscribe(value => {
      this.visible = value;
    });
  }

  saveSettings() {
    this.settings.saveSettings({
      savelocation: this.backendFolder,
      saveonexit: this.saveOnLeaving,
      theme: this.selectedTheme
    });
  }

  showDialog() {
    this.visible = false;
  }
}
