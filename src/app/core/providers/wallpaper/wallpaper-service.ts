import { Injectable } from '@angular/core';
import { Wallpaper, WallpaperOptions, WallpaperResult } from 'src/capacitor/wallpaper';

@Injectable({ providedIn: 'root' })
export class WallpaperService {
  setWallpaper(options: WallpaperOptions): Promise<WallpaperResult> {
    return Wallpaper.setWallpaper(options);
  }
  echo(value: string) {
    return (Wallpaper as any).echo?.({ value });
  }
}
