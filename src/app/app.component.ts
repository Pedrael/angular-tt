import { Component } from '@angular/core'
import { PasswordInputComponent } from './password-input/password-input.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, PasswordInputComponent],
})
export class AppComponent {}
