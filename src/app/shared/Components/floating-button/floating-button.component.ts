import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
  standalone: false
})
export class FloatingButtonComponent implements OnInit {
 
  @Input() vertical: 'top' | 'bottom' = 'bottom';
  @Input() horizontal: 'start' | 'end' | 'center' = 'end';
  @Input() edge = false; 

  @Input() side: 'top' | 'bottom' | 'start' | 'end' = 'top';


  @Input() icon = 'add';
  @Input() color: string = 'primary';      
  @Input() secondaryColor?: string;       
  @Input() dangerColor?: string;           
  @Input() disabled = false;


  @Input() showEdit = true;
  @Input() showAdd = true;
  @Input() showLogout = true;

 
  @Output() edit = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  ngOnInit(): void {}
}
