import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { SettingsComponent } from '../settings/settings.component';
import { NavbarControllService } from '../../core/navbar-controll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private navbarControll: NavbarControllService) { }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
      },
      {
        label: 'Project',
        icon: PrimeIcons.SEARCH,
        items: [
          {
            label: 'Create',
            icon: PrimeIcons.PLUS,
            shortcut: 'Ctrl + N'
          },
          {
            label: 'Change',
            icon: PrimeIcons.PENCIL
          },
          {
            label: 'Upload',
            icon: PrimeIcons.UPLOAD,
          },
          {
            label: 'Download',
            icon: PrimeIcons.DOWNLOAD,
          },
          {
            label: 'Save',
            icon: PrimeIcons.SAVE,
            shortcut: 'Ctrl + S'
          },
          {
            label: 'Reload',
            icon: PrimeIcons.REFRESH,
          }
        ],
      }
    ];
  }

  showSettings() {
    this.navbarControll.setCurrentValue(true);
    console.log('Settings clicked');
  }
}
