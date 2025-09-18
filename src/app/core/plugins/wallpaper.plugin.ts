import { registerPlugin } from '@capacitor/core';


export interface WallpaperOptions {
  imageUrl: string;
  type: number; 
}


export interface WallpaperResult {
  success: boolean;
  message?: string;
}


export const WallpaperPlugin = registerPlugin<{
  setWallpaper(options: WallpaperOptions): Promise<WallpaperResult>;
}>('WallpaperPlugin');
