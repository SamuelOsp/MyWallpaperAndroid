import { Injectable } from '@angular/core';
import { Auth as AuthFirebase, createUserWithEmailAndPassword } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private readonly authFirebase: AuthFirebase){}


  async register(email: string, password: string){
    await createUserWithEmailAndPassword(this.authFirebase, email, password);
  }
async login(){
  
}



}
