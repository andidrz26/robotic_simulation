import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StyleClassModule } from 'primeng/styleclass';
import { ToolbarModule } from 'primeng/toolbar';
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
        ToolbarModule,
        ButtonModule,
        SplitButtonModule,
        InputTextModule,
        BrowserAnimationsModule,
        StyleClassModule,
        SplitterModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
