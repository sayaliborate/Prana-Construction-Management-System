import { Component, OnInit } from '@angular/core';
import { ContactMessageService } from '../../../service/contact-message.service';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-contact-ret',
  imports: [CommonModule],
  templateUrl: './contact-ret.component.html',
  styleUrl: './contact-ret.component.css'
})
export class ContactRetComponent implements OnInit {
  messages: any[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private contactService: ContactMessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages = Array.isArray(data) ? data : data.results;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = '❌ Failed to load messages';
        console.error(err);
        this.loading = false;
      }
    });
  }

  markAsRead(message: any) {
    const newStatus = !message.is_read;
    this.contactService.markAsRead(message.id, newStatus).subscribe({
      next: () => {
        message.is_read = newStatus;
        this.successMessage = newStatus
          ? '✅ Marked as Read'
          : '🔁 Marked as Unread';

        setTimeout(() => (this.successMessage = ''), 2000);
      },
      error: (err) => {
        console.error('Error updating message status:', err);
        this.errorMessage = '❌ Failed to update status';
      }
    });
  }

  // **********************
  // PDF DOWNLOAD FUNCTION
  // **********************
 downloadPDF() {
  const element = document.getElementById('pdfContent');

  if (!element) {
    console.error('PDF content not found!');
    return;
  }

  html2canvas(element, { scale: 2 }).then((canvas: HTMLCanvasElement) => {

    const imgWidth = 210; 
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 25;   // shift down to leave space for header

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    // ⭐ Add header "Prana Construction"
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("Prana Construction", pdf.internal.pageSize.getWidth() / 2, 12, {
      align: "center"
    });

    // Add image below header
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      // Add header on every page
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("Prana Construction", pdf.internal.pageSize.getWidth() / 2, 12, {
        align: "center"
      });

      pdf.addImage(imgData, 'PNG', 0, 25, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('contact_messages.pdf');
  });
}
}