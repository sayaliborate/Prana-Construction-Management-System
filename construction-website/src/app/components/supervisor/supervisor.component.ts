import { Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../../service/supervisor.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-supervisor',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './supervisor.component.html',
  styleUrl: './supervisor.component.css'
})
export class SupervisorComponent implements OnInit {
  // Form fields
  name = '';
  email = '';
  phone = '';
  address = '';
  designation = '';
  experience_years = 0;
  salary = 0;

  supervisors: any[] = [];

  constructor(private supervisorService: SupervisorService) {}

  ngOnInit() {
    this.loadSupervisors();
  }

  addSupervisor() {
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      designation: this.designation,
      experience_years: this.experience_years,
      salary: this.salary
    };

    this.supervisorService.addSupervisor(data).subscribe({
      next: () => {
        alert('Supervisor added successfully!');
        this.clearForm();
        this.loadSupervisors();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add supervisor.');
      }
    });
  }

  loadSupervisors() {
    this.supervisorService.getSupervisors().subscribe({
      next: (res) => {
        this.supervisors = res;
        console.log("retrieved data", res);
      },
      error: (err) => console.error(err)
    });
  }

  clearForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.designation = '';
    this.experience_years = 0;
    this.salary = 0;
  }

  // ---------------- PDF FUNCTION ----------------
  async downloadPDF() {
    const element = document.getElementById('pdfContent');

    if (!element) {
      alert('Content not found!');
      return;
    }

    // allow DOM to update fully
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = await html2canvas(element, { scale: 2 });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('supervisor_list.pdf');
  }
}