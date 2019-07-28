import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule }   from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTreeModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule} from '@angular/material'

@NgModule({
    imports:
        [
            HttpClientModule,
            BrowserModule,
            FormsModule,
            BrowserAnimationsModule,
            MatTreeModule, 
            MatIconModule,
            MatButtonModule,
            MatToolbarModule,
            MatSidenavModule
        ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }