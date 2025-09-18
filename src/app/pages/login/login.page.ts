import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Auth } from 'src/app/core/providers/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
 public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(
    private navCtrl: NavController,
    private readonly authSrv: Auth
  ) {}

  async doLogin(){
    try {
      const { email, password } = this.loginForm.value;
      await this.authSrv.login(email!, password!);
      this.navCtrl.navigateRoot('/home'); 
    } catch (error) {
      console.log(error);
    }
  }

  goToRegister(){
    this.navCtrl.navigateRoot('/register');
  }
}
