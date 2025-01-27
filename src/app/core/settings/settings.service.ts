import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { Settings } from './settings.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  settings!: Settings;
  hasChanged: boolean = true;

  private currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
  public currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  private currentSavelocationSubject: BehaviorSubject<string> = new BehaviorSubject<string>('../output');
  public currentSavelocation$: Observable<string> = this.currentSavelocationSubject.asObservable();

  private currentExitSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public currentExit$: Observable<boolean> = this.currentExitSubject.asObservable();

  setCurrentTheme(value: string): void {
    this.currentThemeSubject.next(value);
  }

  setCurrentSavelocation(value: string): void {
    this.currentSavelocationSubject.next(value);
  }

  setCurrentExit(value: boolean): void {
    this.currentExitSubject.next(value);
  }

  getSettingsFromFile(): void {
    invoke<Settings>('get_settings').then((settings: Settings) => {
      this.settings = settings;
    }).then(() => {
      this.setCurrentSavelocation(this.settings.savelocation);
      this.setCurrentExit(this.settings.saveonexit);
      this.checkForTheme();
    });
  }

  private checkForTheme() {
    if (this.hasChanged) {
      let theme = this.settings.theme;
      if (this.settings.theme == 'system' || this.settings.theme == 'dark') {
        if (this.settings.theme == 'system') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else { 
          theme = 'dark';
        }
      } else {
        theme = 'light';
      }
      if (theme == 'dark' && !document.querySelector('html')?.classList.contains('dark')) {
        document.querySelector('html')?.classList.toggle('dark');
      } else if (theme == 'light') {
        document.querySelector('html')?.classList.remove('dark');
      }
    }
    this.setCurrentTheme(this.settings.theme);
  }

  saveSettings(settings: Settings): void {
    this.hasChanged = (this.settings.theme != settings.theme);
    this.settings = settings;
    this.checkForTheme();
    invoke<void>('post_settings', { settings: settings });
  }
}
