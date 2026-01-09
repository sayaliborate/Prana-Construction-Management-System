import { Component, OnInit } from '@angular/core';
import { LabourService } from '../../../service/labour.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-labour',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './labour.component.html',
  styleUrl: './labour.component.css'
})
export class LabourComponent implements OnInit {
  labours: any[] = [];
  loading = true;

  constructor(private labourService: LabourService) {}

  ngOnInit(): void {
    this.loadLabours();
  }

  loadLabours() {
    this.labourService.getLabours().subscribe({
      next: (data) => {
        this.labours = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching labours:', err);
        this.loading = false;
      },
    });
  }

  deleteLabour(id: number) {
    if (confirm('Are you sure you want to delete this labour?')) {
      this.labourService.deleteLabour(id).subscribe(() => {
        this.loadLabours();
      });
    }
  }
}
