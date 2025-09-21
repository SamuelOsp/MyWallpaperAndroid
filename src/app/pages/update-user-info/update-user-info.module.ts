import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserInfoPageRoutingModule } from './update-user-info-routing.module';

import { UpdateUserInfoPage } from './update-user-info.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserInfoPageRoutingModule,
    SharedModule,
    ReactiveFormsModule, 
    FormsModule          
  ],
  declarations: [UpdateUserInfoPage]
})
export class UpdateUserInfoPageModule {}
