import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiCategoryService } from 'src/app/core/services/api-category.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent {
  
  categories = [
  { key: 'nature', label: 'CATEGORIES.nature' },
  { key: 'animals', label: 'CATEGORIES.animals' },
  { key: 'abstract', label: 'CATEGORIES.abstract' },
  { key: 'space', label: 'CATEGORIES.space' },
  { key: 'city', label: 'CATEGORIES.city' },
  { key: 'cars', label: 'CATEGORIES.cars' },
  { key: 'landscape', label: 'CATEGORIES.landscape' },
];


  constructor(
    private apiCatSrv: ApiCategoryService,
    private menuCtrl: MenuController,
    private nav: NavController
  ) {}

trackByKey = (_: number, c: { key: string }) => c.key;

  selectCategory(key: string) {
    this.apiCatSrv.setCategory(key);
    this.menuCtrl.close();
    this.nav.navigateForward(['/explore', key]); 
  }
}
