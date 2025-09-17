import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './Components/button/button.component';
import { CardComponent } from './Components/card/card.component';
import { InputComponent } from './Components/input/input.component';
import { LinkComponent } from './Components/link/link.component';
import { FloatingButtonComponent } from './Components/floating-button/floating-button.component';
import { ToggleTranslateComponent } from './Components/toggle-translate/toggle-translate.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './services/user/user';

const components = [ButtonComponent, CardComponent,InputComponent, 
  LinkComponent,FloatingButtonComponent, ToggleTranslateComponent
];
const providers = [User];

const modules = [CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule];

@NgModule({
  declarations: [...components],
  imports: [ ...modules],
  providers: [...providers],
  exports: [...components],
})
export class SharedModule { }
