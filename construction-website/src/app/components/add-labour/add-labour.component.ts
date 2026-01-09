import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabourService } from '../../../service/labour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-labour',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-labour.component.html',
  styleUrl: './add-labour.component.css'
})
export class AddLabourComponent {
 labourForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  workTypes = [
    { value: 'skilled', label: 'Skilled' },
    { value: 'semi_skilled', label: 'Semi-Skilled' },
    { value: 'unskilled', label: 'Unskilled' },
  ];

  constructor(private fb: FormBuilder, private labourService: LabourService) {
    this.labourForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      work_type: ['', Validators.required],
      daily_wage: [0, Validators.required],
      monthly_salary: [0],
      bank_account: [''],
      ifsc_code: [''],
      pan_number: [''],
      aadhar_number: [''],
      is_active: [true],
    });
  }

  onSubmit() {
    if (this.labourForm.valid) {
      this.labourService.addLabour(this.labourForm.value).subscribe({
        next: () => {
          this.successMessage = '✅ Labour added successfully!';
          this.errorMessage = '';
          this.labourForm.reset({ is_active: true }); // ✅ reset with default
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = '❌ Failed to add labour.';
          this.successMessage = '';
          setTimeout(() => (this.errorMessage = ''), 3000);
        },
      });
    } else {
      this.errorMessage = '⚠️ Please fill all required fields correctly.';
      setTimeout(() => (this.errorMessage = ''), 3000);
    }
  }
}