import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker'
import { NativeToast } from '../nativeToast/native-toast';
import { Capacitor } from '@capacitor/core';
import { IImage } from 'src/interface/image.interface';
@Injectable({
  providedIn: 'root'
})
export class File {
  constructor(private readonly toast: NativeToast){}
  async requestPermission(){
    try {
      await FilePicker.requestPermissions();
      await this.toast.show("Permission granted");
    } catch (error) {
      await this.toast.show("Permission denied, you must turn on manually");
    }
  }

  async pickImage(): Promise<IImage>{
    // if(!Capacitor.isNativePlatform()) throw new Error();
    try {
      const image = await FilePicker.pickImages({
        limit: 1,
        readData: true,
      });

      if (!image.files || image.files.length === 0) {
      throw new Error("No image selected");
      }

      const img = image.files[0];

      return {
      data: img.data || '',
      mimeType: img.mimeType || '',
      name: img.name || ''
      };
    } catch (error) {
      await this.toast.show("Error picking image");
      throw error;
    }
  }



}
