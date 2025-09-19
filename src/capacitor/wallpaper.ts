// src/capacitor/wallpaper.ts
import { registerPlugin, WebPlugin } from '@capacitor/core';

export interface WallpaperOptions {
  imageUrl: string;
  type: number; // 1=HOME, 2=LOCK, 3=BOTH
}

export interface WallpaperResult {
  success: boolean;
  message?: string;
}

class WallpaperWeb extends WebPlugin {
  async setWallpaper(_opts: WallpaperOptions): Promise<WallpaperResult> {
    return {
      success: false,
      message: 'WallpaperPlugin no está disponible en web; prueba en Android.',
    };
  }
  async echo(options: { value: string }): Promise<{ value: string }> {
    return { value: options.value };
  }
}

export const Wallpaper = registerPlugin<{
  setWallpaper(options: WallpaperOptions): Promise<WallpaperResult>;
  echo(options: { value: string }): Promise<{ value: string }>;
}>('WallpaperPlugin', {
  web: () => new WallpaperWeb(),
});
