import { Injectable } from '@angular/core';
import { Auth as AuthFirebase, createUserWithEmailAndPassword } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private readonly authFirebase: AuthFirebase){}


  async register(email: string, password: string){
    const resp = await createUserWithEmailAndPassword(this.authFirebase, email, password);
    return resp.user.uid;
  }
async login(){
  
}



}
