import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockTransactionService } from '../../../service/stock-transaction.service';
import { MaterialService } from '../../../service/material.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-tran',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './stock-tran.component.html',
  styleUrl: './stock-tran.component.css'
})
export class StockTranComponent implements OnInit {
  transactionForm!: FormGroup;
  materials: any[] = [];
  transactionTypes = [
    { value: 'in', label: 'Stock In' },
    { value: 'out', label: 'Stock Out' },
    { value: 'adjustment', label: 'Adjustment' }
  ];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private stockService: StockTransactionService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      material: ['', Validators.required],
      transaction_type: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0.01)]],
      unit_price: ['', [Validators.required, Validators.min(0)]],
      reference_number: [''],
      notes: ['']
    });

    this.loadMaterials();
  }

  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (res: any) => {
        this.materials = res;
      },
      error: (err) => console.error(err)
    });
  }

  submit() {
    if (this.transactionForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }
    this.loading = true;

    // calculate total_value
    const formValue = { ...this.transactionForm.value };
    formValue.total_value = formValue.quantity * formValue.unit_price;

    this.stockService.addTransaction(formValue).subscribe({
      next: (res) => {
        alert('Stock transaction added successfully!');
        this.transactionForm.reset();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error adding transaction');
        this.loading = false;
      }
    });
  }
}
