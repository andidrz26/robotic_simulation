import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { NavbarControllService } from '../../core/navbar-controll.service';
import { SettingsService } from '../../core/settings/settings.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule, RippleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private navbarControll: NavbarControllService, private settings: SettingsService, private router: Router) { }

  items: MenuItem[] | undefined;

  ngOnInit() {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });

    this.settings.getSettingsFromFile();

    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Project',
        icon: PrimeIcons.SEARCH,
        items: [
          {
            label: 'Create',
            icon: PrimeIcons.PLUS,
            shortcut: 'Ctrl + N',
            command: () => {
              this.router.navigate(['/create']);
            }
          },
          {
            label: 'Change',
            icon: PrimeIcons.PENCIL,
            command: () => {
              this.router.navigate(['/create']);
            }
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
      },
      {
        label: 'Simulation',
        icon: PrimeIcons.PLAY,
        command: () => {
          this.router.navigate(['/simulation']);
        }
      }
    ];
  }

  showSettings() {
    this.navbarControll.setCurrentValue(true);
    console.log('Settings clicked');
  }
}
