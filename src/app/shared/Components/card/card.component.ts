import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {
  @Input() color?: string;            
  @Input() header?: string;        
  @Input() subheader?: string;       
  @Input() footer?: string;           
  @Input() clickable = false;  
}
