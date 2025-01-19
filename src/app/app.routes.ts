import { Routes } from '@angular/router';
import { CreateObjectComponent } from './shared/create-object/create-object.component';
import { SimulationComponent } from './shared/simulation/simulation.component';
import { HomeComponent } from './shared/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', component: CreateObjectComponent },
    { path: 'change/:id', component: CreateObjectComponent},
    { path: 'simulation', component: SimulationComponent}
];
