import { Component } from '@angular/core'
import { ContactsService } from './services/contacts.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr/public_api'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formulario!: FormGroup
  public messageError!: string
  constructor(
    private contactService: ContactsService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  sendMessage() {
    this.contactService
      .addContact({
        Name: this.formulario.get('name')?.value,
        Email: this.formulario.get('email')?.value,
        Subject: this.formulario.get('subject')?.value,
        Message: this.formulario.get('message')?.value,
      })
      .subscribe({
        next: () => {
          this.formulario.setValue({
            name: '',
            email: '',
            subject: '',
            message: '',
          })
        },
        error: (e) => (this.messageError = e),
      })
  }
}
