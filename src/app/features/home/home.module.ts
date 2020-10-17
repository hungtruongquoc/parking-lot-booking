// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home/home.page';


// @ts-ignore
@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
