import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { ContactPageService } from '../service/contact-page.service'
import { CreateMail } from '../types/mail'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  showSuccessMessage = false
  showErrorMessage = false
  errorMessage = ''
  successMessage = ''
  constructor(private contactPageService: ContactPageService) {}

  createMail: CreateMail = {
    name: '',
    email: '',
    address: '',
    postalCode: '',
    telephoneNumber: '',
    message: '',
  }

  createMailForm = new FormGroup({
    name: new FormControl(this.createMail.name, [Validators.required]),
    email: new FormControl(this.createMail.email, [
      Validators.required,
      Validators.email,
    ]),
    address: new FormControl(this.createMail.address, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z .'-]+\s\d+[\w\d\s]*$/),
    ]),
    postalCode: new FormControl(this.createMail.postalCode, [
      Validators.required,
      Validators.pattern('^[1-9][0-9]{3}\\s?([a-zA-Z]{2})$'),
    ]),
    telephoneNumber: new FormControl(this.createMail.telephoneNumber, [
      Validators.pattern(/^((\+|00)31\s?|0(6\s?)?)[1-9]\d{7}$/),
    ]),
    message: new FormControl(this.createMail.message, [
      Validators.required,
      Validators.minLength(10),
    ]),
  })

  onSubmit() {
    if (this.createMailForm.valid) {
      const createMail: CreateMail =
        this.createMailForm.getRawValue() as CreateMail
      this.contactPageService.sendMail(createMail).subscribe({
        next: response => {
          console.log('HERE', response)
          this.showSuccessMessage = true
          this.showErrorMessage = false
          this.errorMessage = ''
          this.successMessage = response
        },

        error: error => {
          console.log('HIERARAEWA')
          this.showErrorMessage = true
          this.showSuccessMessage = false
          this.errorMessage = error.error.message
        },
      })
    }
  }
}
