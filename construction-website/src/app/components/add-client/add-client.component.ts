import { Component } from '@angular/core';
import { AddClientService } from '../../../service/add-client.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {
client = {
    name: '',
    client_type: 'individual',
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    gst_number: '',
    pan_number: '',
    credit_limit: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(private clientService: AddClientService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.clientService.addClient(this.client).subscribe({
        next: (res) => {
          this.successMessage = 'Client added successfully!';
          this.errorMessage = '';
          form.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to add client. Please try again.';
        }
      });
    }
  }
}
