import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalarySlipService } from '../../../service/salary-slip.service';
import { LabourService } from '../../../service/labour.service';

@Component({
  selector: 'app-salary-slip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salary-slip.component.html',
  styleUrl: './salary-slip.component.css'
})
export class SalarySlipComponent implements OnInit{
 salaryForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  labours: any[] = [];

  constructor(
    private fb: FormBuilder,
    private salaryService: SalarySlipService,
    private labourService: LabourService
  ) {
    this.salaryForm = this.fb.group({
      labour: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      basic_salary: ['', Validators.required],
      overtime_hours: [0],
      overtime_amount: [0],
      allowance: [0],
      deduction: [0],
      gross_salary: ['', Validators.required],
      net_salary: ['', Validators.required],
      is_paid: [false],
      paid_date: [null]
    });
  }

  ngOnInit(): void {
    this.loadLabours();

    // ✅ Auto-set paid_date when salary is marked as paid
    this.salaryForm.get('is_paid')?.valueChanges.subscribe((isPaid) => {
      if (isPaid) {
        const currentDateTime = new Date().toISOString().slice(0, 16); // format: yyyy-MM-ddTHH:mm
        this.salaryForm.get('paid_date')?.setValue(currentDateTime);
      } else {
        this.salaryForm.get('paid_date')?.setValue(null);
      }
    });
  }

  loadLabours() {
    this.labourService.getLabours().subscribe({
      next: (data) => {
        console.log('Labour API Response:', data);
        this.labours = Array.isArray(data) ? data : data.results;
      },
      error: (err) => {
        console.error('Error fetching labours:', err);
      },
    });
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      this.salaryService.addSalarySlip(this.salaryForm.value).subscribe({
        next: () => {
          this.successMessage = '✅ Salary Slip Added Successfully!';
          this.salaryForm.reset();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = '❌ Failed to add salary slip.';
        },
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}