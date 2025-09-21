import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { getAuth, updateProfile } from 'firebase/auth';
import { NativeToast } from 'src/app/core/providers/nativeToast/native-toast';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.page.html',
  styleUrls: ['./update-user-info.page.scss'],
  standalone: false
})
export class UpdateUserInfoPage implements OnInit {
  form!: FormGroup;

  name     = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] });
  lastname = new FormControl<string>('', { nonNullable: true, validators: [Validators.minLength(2)] });
  email    = new FormControl<string>({ value: '', disabled: true }, { nonNullable: true });

  constructor(
    private nav: NavController,
    private t: TranslateService,
    private toast: NativeToast,
    private router: Router
  ) {}

  async ngOnInit() {
    this.form = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email
    });

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      this.nav.navigateRoot('/login');
      return;
    }

    const displayName = user.displayName || '';
    const [first, ...rest] = displayName.split(' ').filter(Boolean);

    this.name.setValue(first ?? '');
    this.lastname.setValue(rest.join(' ') ?? '');
    this.email.setValue(user.email ?? '');
  }

  private get displayName(): string {
    const n = (this.name.value || '').trim();
    const l = (this.lastname.value || '').trim();
    return [n, l].filter(Boolean).join(' ');
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show(this.t.instant('update.errors.incomplete'), 'danger', 'bottom');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      this.toast.show(this.t.instant('update.errors.session'), 'danger', 'bottom');
      this.nav.navigateRoot('/login');
      return;
    }

    try {
      
      await updateProfile(user, { displayName: this.displayName || undefined });

      this.toast.show(this.t.instant('update.saved'), 'success', 'bottom');
      this.nav.navigateBack('/home');
    } catch (e: any) {
      this.toast.show(this.t.instant('update.errors.save', { err: e?.message ?? 'Unknown' }), 'danger', 'bottom');
    }
  }

  cancel() {
    this.nav.navigateBack('/home');
  }
   goToHome() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
