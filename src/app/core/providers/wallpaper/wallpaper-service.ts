import { Injectable } from '@angular/core';
import { WallpaperPlugin, WallpaperOptions, WallpaperResult } from '../../plugins/wallpaper.plugin';
@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  async setWallpaper(options: WallpaperOptions): Promise<WallpaperResult> {
    return WallpaperPlugin.setWallpaper(options);
  }
}
