import { Component, OnInit } from '@angular/core';
import { SalarySlipService } from '../../../service/salary-slip.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-salary-retrive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './salary-retrive.component.html',
  styleUrls: ['./salary-retrive.component.css']
})
export class SalaryRetriveComponent implements OnInit {
  salarySlips: any[] = [];
  loading = true;

  constructor(private salaryService: SalarySlipService) {}

  ngOnInit(): void {
    this.loadSalarySlips();
  }

  loadSalarySlips() {
    this.salaryService.getSalarySlips().subscribe({
      next: (data) => {
        this.salarySlips = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching salary slips:', err);
        this.loading = false;
      },
    });
  }

  deleteSlip(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.salaryService.deleteSalarySlip(id).subscribe(() => {
        this.loadSalarySlips();
      });
    }
  }

  downloadPDF(slip: any) {
  const doc = new jsPDF();

  // Add Company Logo
  const logo = new Image();
  logo.src = 'assets/image.png'; // put your logo in assets folder
  doc.addImage(logo, 'PNG', 15, 10, 30, 30);

  // Company Info
  doc.setFontSize(12);
  doc.text('PRANA CONSTRUCTION', 50, 15);
  doc.setFontSize(10);
  doc.text('Karanje Peth, Satara', 50, 22);
  doc.text('+91 96658 58844', 50, 28);
  doc.text('pranaconstruction@gmail.com', 50, 34);

  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Salary Slip', 90, 50);

  // Employee Info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const employeeInfo = [
    ['Employee Name:', slip.labour_name],
    ['Employee ID:', slip.emp_id || 'EMP' + slip.id],
    ['Role:', 'Labour'],
    ['Month:', slip.month + ' ' + slip.year]
  ];

  let y = 60;
  employeeInfo.forEach(row => {
    doc.text(row[0], 50, y);
    doc.text(row[1], 90, y);
    y += 7;
  });

  // Salary Components Table
  const salaryData = [
    ['Basic Pay', slip.basic_pay],
    ['Allowances', slip.allowances],
    ['Deductions', slip.deductions],
    ['Net Salary', slip.net_salary]
  ];

  autoTable(doc, {
    startY: y + 5,
    head: [['Component', 'Amount']],
    body: salaryData,
    styles: { halign: 'right' },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' }
    }
  });

  // Signature
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.text('Signature: ____________________', 20, finalY);

  // Save PDF
  doc.save(`SalarySlip_${slip.labour_name}_${slip.month}.pdf`);
}

}
