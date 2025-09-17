import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing-module';

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { Auth } from './providers/auth/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Query } from './providers/query/query';


const providers =[Auth, Query]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  providers:[
    provideFirebaseApp(() => initializeApp( environment.FIREBASE_CONFIG)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ...providers
  ]
})
export class CoreModule { }
