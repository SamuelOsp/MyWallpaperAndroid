import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NativeToast } from 'src/app/core/providers/nativeToast/native-toast';
import { User } from 'src/app/shared/services/user/user';

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
  
  constructor(
    private navCtrl: NavController,
    private readonly userSrv: User,
    private toast: NativeToast
  ) {
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
  public async doRegister(){
    
    if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched(); 
    this.toast.show('Please complete all required fields.', 'danger', 'bottom');
    return;
  }
    try {
      console.log(this.registerForm.value);
      await this.userSrv.create(this.registerForm.value as any);
      this.toast.show('Registration successful. Welcome!', 'success', 'bottom');

      this.navCtrl.navigateRoot('/login');
    } catch (e: any) {
      this.toast.show(`Registration failed: ${e?.message ?? 'Please try again.'}`, 'danger', 'bottom');
    }
  }


    public goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
