import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateObjectComponent } from './shared/create-object/create-object.component';
import { HeaderComponent } from './shared/header/header.component';
import { SimulationComponent } from './shared/simulation/simulation.component';

@NgModule({
    declarations: [
        AppComponent, 
        CreateObjectComponent, 
        HeaderComponent, 
        SimulationComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
