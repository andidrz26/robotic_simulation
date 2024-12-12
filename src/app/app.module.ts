import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
