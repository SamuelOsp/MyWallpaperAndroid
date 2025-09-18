import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Auth } from 'src/app/core/providers/auth/auth';
import { File } from 'src/app/core/providers/file/file';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/interface/image.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {
public image: IImage | null = null;
  public imageUrl = '';

  constructor(
    private navCtrl: NavController,
    private readonly fileSrv: File,
    private readonly uploaderSrv: Uploader,
    private readonly authSrv: Auth
  ) {}


  public async addImage() {
    const res = await this.fileSrv.pickImage();
    this.image = res;

    if (!this.image?.data) return;

    const path = await this.uploaderSrv.upload(
      'images',
      `${Date.now()}-${this.image.name}`,
      this.image.mimeType,
      this.image.data
    );

    this.imageUrl = await this.uploaderSrv.getUrl('images', path);
  }

  public editProfile() {
    this.navCtrl.navigateForward('/update-user-info');
  }

  public async logout() {
    await this.authSrv.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
