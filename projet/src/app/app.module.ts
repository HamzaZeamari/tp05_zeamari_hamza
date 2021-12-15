import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiensComponent } from './composantes/liens/liens.component';
import {Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: 'client',
    loadChildren: () =>
      import('./composantes/client/client.module').then((m) => m.ClientModule),
  },
];

@NgModule({
  declarations: [AppComponent, LiensComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
