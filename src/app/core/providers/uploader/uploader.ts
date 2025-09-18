import { Injectable } from '@angular/core';
import { supabase } from 'src/app/database/supabase'; 
@Injectable({
  providedIn: 'root'
})
export class Uploader {
  async upload(bucket: string, name: string, type: string, d: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(name, Uint8Array.from(atob(d), (c)=>c.charCodeAt(0)), {
        contentType: type,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error.message);
    }
    return data?.path || '';
  }

  async getUrl(bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600);

    if (error) {
      console.error('Signed URL error:', error.message);
    }
    return data?.signedUrl || '';
  }
}