import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  public name!: FormControl;
  public lastname!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;

  constructor(private navCtrl: NavController) { 
    this.initForm();
  }

  ngOnInit() {}

    private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.registerForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    
    });
  }
  public doRegister(){
    console.log(this.registerForm.value);

  }


}
