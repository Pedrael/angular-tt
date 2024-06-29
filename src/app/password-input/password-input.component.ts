import { Component } from '@angular/core'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

enum passwordProperties {
  Empty = 'Empty',
  TooShort = 'TooShort',
  Easy = 'Easy',
  Medium = 'Medium',
  Strong = 'Strong',
}

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PasswordInputComponent {
  passwordControl = new FormControl<string>('', [
    Validators.required,
    this.passwordStrengthValidator.bind(this),
  ])

  passwordStrength: string = passwordProperties.Empty

  passwordStrengthValidator(
    control: FormControl,
  ): { [key: string]: boolean } | null {
    const value = control.value

    const hasLetters = /[a-zA-Z]/.test(value)
    const hasDigits = /[0-9]/.test(value)
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value)

    const checks = new Map<boolean, string>([
      [!value, passwordProperties.Empty],
      [value && value.length < 8, passwordProperties.TooShort],
      [
        (hasLetters && !hasDigits && !hasSymbols && value.length >= 8) ||
          (!hasLetters && hasDigits && !hasSymbols && value.length >= 8) ||
          (!hasLetters && !hasDigits && hasSymbols && value.length >= 8),
        passwordProperties.Easy,
      ],
      [
        (hasLetters && hasSymbols && !hasDigits && value.length >= 8) ||
          (hasLetters && hasDigits && !hasSymbols && value.length >= 8) ||
          (hasDigits && hasSymbols && !hasLetters && value.length >= 8),
        passwordProperties.Medium,
      ],
      [
        hasLetters && hasDigits && hasSymbols && value.length >= 8,
        passwordProperties.Strong,
      ],
    ])
    this.passwordStrength = checks.get(true) as string
    return null
  }

  getStrengthClass(section: number): string {
    const checks = {
      [passwordProperties.TooShort]: 'red',
      [passwordProperties.Empty]: 'gray',
      [passwordProperties.Easy]: section === 1 ? 'red' : 'gray',
      [passwordProperties.Medium]: section <= 2 ? 'yellow' : 'gray',
      [passwordProperties.Strong]: 'green',
    }
    return checks[this.passwordStrength as passwordProperties]
  }

  onPasswordInput(): void {
    this.passwordStrengthValidator(this.passwordControl)
  }
}
