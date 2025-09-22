import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, startWith } from 'rxjs';
import { PixabayWallApiService } from 'src/app/core/data/pixabay-wall-api.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { NativeToast } from 'src/app/core/providers/nativeToast/native-toast';
import { Wallpaper } from 'src/capacitor/wallpaper';
import { WallpaperType } from '../home/home.page';
import { PixabayType } from 'src/app/core/models/pixabay.type';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ExplorePage {
  private route = inject(ActivatedRoute);
  private api = inject(PixabayWallApiService);
  private actionSheetCtrl = inject(ActionSheetController);
  private platform = inject(Platform);
  private toast = inject(NativeToast);
  private i18n = inject(TranslateService);

  category$ = this.route.paramMap.pipe(
    map(p => p.get('category') || 'nature')
  );

  items$ = this.category$.pipe(
    switchMap(cat => this.api.search$(cat, 30, 1, 'vertical').pipe(startWith([] as PixabayType[])))
  );

  async doRefresh(ev: any) {
    const cat = await this.category$.pipe(map(c => c)).toPromise();
    this.items$ = this.api.search$(cat!, 30, 1, 'vertical').pipe(
      startWith([] as PixabayType[])
    );
    ev.target.complete();
  }

  trackById = (_: number, item: PixabayType) => item.id;

  async onImageTap(item: PixabayType) {
    await this.showWallpaperOptions(item.largeImageURL);
  }

  private async showWallpaperOptions(imgUrl: string) {
    const t = (k: string) => this.i18n.instant(k);
    const actionSheet = await this.actionSheetCtrl.create({
      header: t('ACTIONSHEET.TITLE'),
      buttons: [
        { text: t('ACTIONSHEET.HOME'), icon: 'image-outline', handler: () => this.setMyWallpaper(WallpaperType.HOME, imgUrl) },
        { text: t('ACTIONSHEET.LOCK'), icon: 'lock-closed-outline', handler: () => this.setMyWallpaper(WallpaperType.LOCK, imgUrl) },
        { text: t('ACTIONSHEET.BOTH'), icon: 'apps-outline', handler: () => this.setMyWallpaper(WallpaperType.BOTH, imgUrl) },
        { text: t('ACTIONSHEET.CANCEL'), icon: 'close-outline', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }

  private async setMyWallpaper(type: WallpaperType, imgUrl: string) {
    const t = (k: string) => this.i18n.instant(k);
    const url = imgUrl?.trim();
    if (!url) {
      this.toast.show(t('ACTIONSHEET.ERR_NOT_FOUND'), 'danger', 'bottom', 3000);
      return;
    }

    if (this.platform.is('android')) {
      const native = (window as any).Capacitor?.Plugins?.WallpaperPlugin;
      try {
        const r = await native?.setWallpaper?.({ imageUrl: url, type });
        if (r?.success) this.toast.show(t('ACTIONSHEET.SUCCESS'), 'success', 'middle', 3000);
        else this.toast.show(`Error: ${r?.message ?? t('ACTIONSHEET.ERR_UNKNOWN')}`, 'danger', 'bottom', 3000);
      } catch (e: any) {
        this.toast.show(`Error nativo: ${e?.message ?? t('ACTIONSHEET.ERR_UNKNOWN')}`, 'danger', 'bottom', 3000);
      }
      return;
    }

    try {
      const res = await Wallpaper.setWallpaper({ imageUrl: url, type });
      if (res?.success) this.toast.show(t('ACTIONSHEET.SUCCESS'), 'success', 'middle', 3000);
      else this.toast.show(`Error: ${res?.message ?? t('ACTIONSHEET.ERR_UNKNOWN')}`, 'danger', 'bottom', 3000);
    } catch (e: any) {
      this.toast.show(`No disponible: ${e?.message ?? t('ACTIONSHEET.ERR_UNKNOWN')}`, 'danger', 'bottom', 3000);
    }
  }
}
