import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Auth } from 'src/app/core/providers/auth/auth';
import { Language } from 'src/app/core/services/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
    lang!: string;
    langs!: string[];

 public email = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  public password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(5)],
  });

  public loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });


  constructor(
    private navCtrl: NavController,
    private readonly authSrv: Auth,
    private langSvc: Language
  ) {}
   ngOnInit(): void {
    this.lang = this.langSvc.current();
    this.langs = this.langSvc.supported();
  }

  async doLogin(){
     if (this.loginForm.invalid) return;
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
  changeLang(l: string): void {
    this.langSvc.use(l); 
    this.lang = l;      
  }
}
