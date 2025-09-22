import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, shareReplay, catchError, of } from 'rxjs';
import { PixabayResponse, PixabayType } from '../models/pixabay.type';

@Injectable({ providedIn: 'root' })
export class PixabayWallApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.PIXABAY_BASE_URL;
  private key = environment.PIXABAY_API_KEY;

  private cache = new Map<string, Observable<PixabayType[]>>();

  
  clearCache() { this.cache.clear(); }

  search$(
    q: string,
    perPage = 30,
    page = 1,
    orientation: 'all' | 'horizontal' | 'vertical' = 'vertical'
  ): Observable<PixabayType[]> {

    const query = (q && q.trim().length) ? q.trim() : 'wallpaper';

    const cacheKey = `${query}|${page}|${orientation}|${perPage}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    let params = new HttpParams()
      .set('key', this.key)
      .set('q', query)
      .set('image_type', 'photo')
      .set('per_page', String(perPage))
      .set('page', String(page))
      .set('safesearch', 'true')       
      .set('order', 'popular')          
      .set('lang', 'es');              

    if (orientation !== 'all') params = params.set('orientation', orientation);

    const req$ = this.http.get<PixabayResponse>(this.baseUrl, { params }).pipe(
      map(r => r.hits ?? []),
      catchError(() => of<PixabayType[]>([])), 
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.cache.set(cacheKey, req$);
    return req$;
  }
}
