import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { File } from 'src/app/core/providers/file/file';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/interface/image.interface';
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
  public image: IImage | null = null;
  public imageUrl = '';
  constructor(
    private navCtrl: NavController,
    private readonly userSrv: User,
    private readonly fileSrv: File,
    private readonly uploaderSrv: Uploader
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
    console.log(this.registerForm.value);
    await this.userSrv.create(this.registerForm.value as any);
  }

  public async pickImage(){
    const res = await this.fileSrv.pickImage();
    this.image = res;

     if (!this.image?.data) {
    return;
  }

    const path = await this.uploaderSrv.upload(
      'images',
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType, 
      this.image.data
    );
    console.log(path);
    this.imageUrl = await this.uploaderSrv.getUrl('images', path );
  }


    public goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
