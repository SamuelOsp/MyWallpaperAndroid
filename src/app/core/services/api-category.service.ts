import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  
  private categorySource = new BehaviorSubject<string>('nature');
  currentCategory$ = this.categorySource.asObservable();

  setCategory(cat: string) {
    this.categorySource.next(cat);
  }
}
