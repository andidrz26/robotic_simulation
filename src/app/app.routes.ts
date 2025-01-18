import { Routes } from '@angular/router';
import { CreateObjectComponent } from './shared/create-object/create-object.component';
import { SimulationComponent } from './shared/simulation/simulation.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'create', component: CreateObjectComponent },
    { path: 'change/:id', component: CreateObjectComponent},
    { path: 'simulation/:id', component: SimulationComponent}
];
