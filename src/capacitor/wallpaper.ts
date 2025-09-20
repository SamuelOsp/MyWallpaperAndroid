// src/capacitor/wallpaper.ts
import { registerPlugin } from '@capacitor/core';

export interface WallpaperOptions {
  imageUrl: string;
  type: number; // 1=HOME, 2=LOCK, 3=BOTH
}

export interface WallpaperResult {
  success: boolean;
  message?: string;
}

export const Wallpaper = registerPlugin<{
  setWallpaper(options: WallpaperOptions): Promise<WallpaperResult>;
  echo(options: { value: string }): Promise<{ value: string }>;
}>('WallpaperPlugin');
