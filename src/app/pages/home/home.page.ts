import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { WallpaperPlugin } from 'src/app/core/plugins/wallpaper.plugin';
import { Auth } from 'src/app/core/providers/auth/auth';
import { File } from 'src/app/core/providers/file/file';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/interface/image.interface';
import { supabase } from 'src/app/database/supabase';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

enum WallpaperType {
  HOME = 1,
  LOCK = 2,
  BOTH = 3,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public image!: IImage;

  // 🔹 Subjects para trabajar con async pipe
  public imageUrl$ = new BehaviorSubject<string>('');       // última imagen seleccionada
  public images$ = new BehaviorSubject<string[]>([]);       // lista de imágenes

  private firebaseUid = '';

  constructor(
    private navCtrl: NavController,
    private readonly fileSrv: File,
    private readonly uploaderSrv: Uploader,
    private readonly authSrv: Auth,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    const auth = getAuth();
    this.firebaseUid = auth.currentUser?.uid || '';

    if (!this.firebaseUid) {
      console.error('Usuario no autenticado en Firebase');
      return;
    }

    
    const { data: rows, error } = await supabase
      .from('user_images')
      .select('path')
      .eq('user_id', this.firebaseUid);

    if (error) {
      console.error('Error cargando imágenes', error.message);
      return;
    }

 
    const urls = await Promise.all(
      rows.map((row: any) => this.uploaderSrv.getUrl('images', row.path))
    );

    
    this.images$.next(urls);

    if (urls.length > 0) {
      this.imageUrl$.next(urls[urls.length - 1]);
    }
  }

  public async addImage() {
    const res = await this.fileSrv.pickImage();
    this.image = res;

    if (!this.image?.data) return;

    const path = `${Date.now()}-${this.image.name}`;

    
    await this.uploaderSrv.upload('images', path, this.image.mimeType, this.image.data);

   
    await supabase.from('user_images').insert([
      { user_id: this.firebaseUid, path }
    ]);

  
    const url = await this.uploaderSrv.getUrl('images', path);

  
    const currentImages = this.images$.getValue();
    this.images$.next([...currentImages, url]);
    this.imageUrl$.next(url); 
  }

  public editProfile() {
    this.navCtrl.navigateForward('/update-user-info');
  }

  public async logout() {
    await this.authSrv.logout();
    this.navCtrl.navigateRoot('/login');
  }

  public async showWallpaperOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Establecer como fondo de pantalla',
      buttons: [
        {
          text: 'Pantalla principal',
          icon: 'image-outline',
          handler: () => this.setMyWallpaper(WallpaperType.HOME),
        },
        {
          text: 'Pantalla de bloqueo',
          icon: 'lock-closed-outline',
          handler: () => this.setMyWallpaper(WallpaperType.LOCK),
        },
        {
          text: 'Ambas',
          icon: 'apps-outline',
          handler: () => this.setMyWallpaper(WallpaperType.BOTH),
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  public async setMyWallpaper(type: WallpaperType, imgUrl?: string) {
    try {
     
      const url = imgUrl || this.imageUrl$.getValue();

      const result = await WallpaperPlugin.setWallpaper({
        imageUrl: url,
        type,
      });

      if (result.success) {
        this.presentToast('Fondo de pantalla establecido con éxito.');
      } else {
        this.presentToast(`Error: ${result.message}`, 'danger');
      }
    } catch (e: any) {
      this.presentToast(`Error al establecer fondo: ${e.message || 'Error desconocido.'}`, 'danger');
    }
  }

  private async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
