import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../../../service/team-member.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-retrive',
  imports: [CommonModule,RouterModule],
  templateUrl: './team-retrive.component.html',
  styleUrl: './team-retrive.component.css'
})
export class TeamRetriveComponent  implements OnInit {

  clients: any[] = [];

  constructor(private clientService: TeamMemberService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log("retrived data",data);
        
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }
}