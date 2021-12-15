import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { ControlComponent } from "../control/control.component";
import { LogComponent } from "./log/log.component";

const appChild: Routes = [
  {
    path: 'login',
    component: LogComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
  ],

  declarations: [
    LogComponent,
    RegisterComponent,
    ControlComponent
  ],
  providers: [],
  exports: [
    ControlComponent
  ]
})
export class ClientModule {}
