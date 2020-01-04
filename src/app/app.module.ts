import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArkanoidComponent } from './arkanoid/arkanoid.component';

@NgModule({
  declarations: [
    AppComponent,
    ArkanoidComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
