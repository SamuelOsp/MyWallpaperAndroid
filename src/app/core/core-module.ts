import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing-module';

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { Auth } from './providers/auth/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Query } from './providers/query/query';
import { NativeToast } from './providers/nativeToast/native-toast';
import { File } from './providers/file/file';
import { Capacitor } from '@capacitor/core';
import { Uploader } from './providers/uploader/uploader';


const providers =[Auth, Query, NativeToast, File, Uploader];

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
export class CoreModule implements OnInit{ 
  constructor(private readonly fileSrv: File){
    if (Capacitor.isNativePlatform()) {
      this.fileSrv.requestPermission();
    }
  }

  async ngOnInit(){
      await this.fileSrv.requestPermission();
  }

}
