import { Injectable } from '@angular/core';
import { supabase } from 'src/app/database/supabase'; 
@Injectable({
  providedIn: 'root'
})
export class Uploader {
  async upload(bucket: string, name: string, type: string, d: string){
    const {data, error} = await supabase.storage
    .from(bucket)
    .upload(`/image/${name}`, 
      Uint8Array.from(atob(d), (c)=>c.charCodeAt(0)), 
      {
      contentType: type,
      cacheControl: '3600',
      upsert: true
    });
    console.log(error);
    console.log(data);
    return data?.path || '';
  }

  async getUrl(bucket: string, path: string): Promise<string>{
  const {data, error} =  await supabase.storage.from(bucket)
  .createSignedUrl(path, 3600);
  return data?.signedUrl || '';
  }



}
