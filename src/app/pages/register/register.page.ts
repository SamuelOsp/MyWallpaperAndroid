import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    private toast: NativeToast,
    private t: TranslateService,
    private loadingCtrl: LoadingController
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
    });

    loading.present();
  }
  public async doRegister() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched(); 
    this.toast.show(this.t.instant('register.messages.incomplete'), 'danger', 'bottom');
    return;
  }
  try {
    await this.userSrv.create(this.registerForm.value as any);
    this.toast.show(this.t.instant('register.messages.success'), 'success', 'bottom');
    this.navCtrl.navigateRoot('/login');
  } catch (e: any) {
    const msg = this.t.instant('register.messages.fail', {
      error: e?.message ?? this.t.instant('register.messages.tryAgain')
    });
    this.toast.show(msg, 'danger', 'bottom');
  }
}



    public goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
