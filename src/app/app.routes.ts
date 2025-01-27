import { Routes } from '@angular/router';
import { CreateObjectComponent } from './shared/create-object/create-object.component';
import { HomeComponent } from './shared/home/home.component';
import { CoordinateSystemTwoDimComponent } from './shared/coordinate-system-two-dim/coordinate-system-two-dim.component';
import { CoordinateSystemThreeDimComponent } from './shared/coordinate-system-three-dim/coordinate-system-three-dim.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreateObjectComponent },
    { path: 'change/:id', component: CreateObjectComponent},
    { path: 'simulation', component: CoordinateSystemTwoDimComponent},
    { path: 'simulation2d/:id', component: CoordinateSystemTwoDimComponent},
    { path: 'simulation3d/:id', component: CoordinateSystemThreeDimComponent}
];
