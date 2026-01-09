import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../service/site.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
interface Site {
  id: number;
  title: string;
  region: string;
  category: string;
  description: string;
  team_leader: number;
  created_at: string;
  team_leader_name?: string; // optional, will be added dynamically
}

interface TeamLeader {
  id: number;
  name: string;
}
@Component({
  selector: 'app-site-retrive',
  imports: [CommonModule],
  templateUrl: './site-retrive.component.html',
  styleUrl: './site-retrive.component.css'
})
export class SiteRetriveComponent implements OnInit {
   sites: Site[] = [];
  teamLeaders: TeamLeader[] = [];
  errorMsg = '';

  constructor(private siteService: SiteService) {}

  ngOnInit(): void {
    this.loadTeamLeaders();
  }

  loadTeamLeaders(): void {
    this.siteService.getTeamLeaders().subscribe({
      next: (leaders: TeamLeader[]) => {
        this.teamLeaders = leaders;
        this.loadSites();
      },
      error: () => this.errorMsg = 'Failed to load team leaders.'
    });
  }

  loadSites(): void {
    this.siteService.getSites().subscribe({
      next: (data: Site[]) => {
        this.sites = data.map((site: Site) => {
          const leader = this.teamLeaders.find(t => t.id === site.team_leader);
          return { ...site, team_leader_name: leader ? leader.name : 'N/A' };
        });
      },
      error: () => this.errorMsg = 'Failed to load site details.'
    });
  }

  // ---------------- PDF FUNCTION ----------------
  async downloadPDF() {
    const element = document.getElementById('pdfContent');

    if (!element) {
      console.error('PDF content not found!');
      return;
    }

    // Force fresh rendering
    await new Promise(resolve => setTimeout(resolve, 200));

    // Create fresh canvas
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

    pdf.save('site_details.pdf');
  }
}