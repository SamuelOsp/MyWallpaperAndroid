// home.page.ts
import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  NavController,
  ToastController,
  Platform,
} from '@ionic/angular';
import {Wallpaper} from 'src/capacitor/wallpaper'; 
import { Auth } from 'src/app/core/providers/auth/auth';
import { File } from 'src/app/core/providers/file/file';
import { Uploader } from 'src/app/core/providers/uploader/uploader';
import { IImage } from 'src/interface/image.interface';
import { supabase } from 'src/app/database/supabase';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { NativeToast } from 'src/app/core/providers/nativeToast/native-toast';

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
  public imageUrl$ = new BehaviorSubject<string>('');
  public images$ = new BehaviorSubject<string[]>([]);
  private firebaseUid = '';

  constructor(
    private navCtrl: NavController,
    private readonly fileSrv: File,
    private readonly uploaderSrv: Uploader,
    private readonly authSrv: Auth,
    private actionSheetCtrl: ActionSheetController,
    private toast: NativeToast,
    private platform: Platform
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
      .select('path, created_at')
      .eq('user_id', this.firebaseUid)
      .not('path', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando imágenes', error.message);
      return;
    }

    const rawUrls: string[] = await Promise.all(
      (rows || []).map((row: any) => this.uploaderSrv.getUrl('images', row.path))
    );

    
    const urls = Array.from(
      new Set(rawUrls.filter((u): u is string => !!u && !!u.trim()))
    );

    this.images$.next(urls);
    if (urls.length > 0) this.imageUrl$.next(urls[0]); 
  }

  trackByUrl = (_: number, url: string) => url;

  public async addImage() {
    const res = await this.fileSrv.pickImage();
    this.image = res;
    if (!this.image?.data) return;

    const path = `${Date.now()}-${this.image.name}`;
    await this.uploaderSrv.upload('images', path, this.image.mimeType, this.image.data);
    await supabase.from('user_images').insert([{ user_id: this.firebaseUid, path }]);

    const url = await this.uploaderSrv.getUrl('images', path);
    if (!url || !url.trim()) return;

    const current = this.images$.getValue();
    const next = Array.from(new Set([url, ...current]));
    this.images$.next(next);
    this.imageUrl$.next(url);
  }

  public editProfile() {
    this.navCtrl.navigateForward('/update-user-info');
  }

  public async logout() {
    await this.authSrv.logout();
    this.navCtrl.navigateRoot('/login');
  }

  public async showWallpaperOptions(imgUrl?: string) {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Establecer como fondo de pantalla',
    buttons: [
      { text: 'Pantalla principal', icon: 'image-outline', handler: () => this.setMyWallpaper(WallpaperType.HOME, imgUrl) },
      { text: 'Pantalla de bloqueo', icon: 'lock-closed-outline', handler: () => this.setMyWallpaper(WallpaperType.LOCK, imgUrl) },
      { text: 'Ambas', icon: 'apps-outline', handler: () => this.setMyWallpaper(WallpaperType.BOTH, imgUrl) },
      { text: 'Cancelar', icon: 'close-outline', role: 'cancel' },
    ],
  });
  await actionSheet.present();
}
async onImageTap(img: string) {
  await this.showWallpaperOptions(img);
}

  public async setMyWallpaper(type: WallpaperType, imgUrl?: string) {
    const url = imgUrl || this.imageUrl$.getValue();
    if (!url) {
      this.toast.show('the image does not exist', 'danger', 'bottom', 3000);
      return;
    }

    
    if (this.platform.is('android')) {
      const native = (window as any).Capacitor?.Plugins?.WallpaperPlugin;
      try {
        const r = await native.setWallpaper({ imageUrl: url, type });
        if (r?.success) this.toast.show('Wallpaper successfully set.', 'successfully', 'middle', 3000);
        else this.toast.show(`Error: ${r?.message ?? 'Desconocido'}`, 'danger');
      } catch (e: any) {
        this.toast.show(`Error nativo: ${e?.message ?? 'Desconocido'}`, 'danger');
      }
      return;
    }

  
    try {
      const res = await Wallpaper.setWallpaper({ imageUrl: url, type });
      if (res?.success) this.toast.show('Wallpaper successfully set.');
      else this.toast.show(`Error: ${res?.message ?? 'Desconocido'}`, 'danger');
    } catch (e: any) {
      this.toast.show(`No disponible: ${e?.message ?? 'Desconocido'}`, 'danger');
    }
  }

  
}
