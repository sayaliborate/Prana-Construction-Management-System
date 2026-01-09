import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMessageService } from '../../../service/contact-message.service';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
contactForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactMessageService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          this.successMessage = '✅ Message sent successfully!';
          this.contactForm.reset();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = '❌ Failed to send message.';
          setTimeout(() => (this.errorMessage = ''), 3000);
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields.';
    }
  }
}