import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/core/services/language';

@Component({
  selector: 'app-toggle-translate',
  templateUrl: './toggle-translate.component.html',
  styleUrls: ['./toggle-translate.component.scss'],
  standalone: false
})
export class ToggleTranslateComponent  implements OnInit {
lang!: string;

  constructor(private langSvc: Language) {}

  ngOnInit() {
    this.lang = this.langSvc.current();
  }

  change(l: string) {
    this.langSvc.use(l); 
    this.lang = l;
  }
}
